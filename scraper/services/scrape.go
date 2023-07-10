package services

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"time"

	"emscraper/database"
	"emscraper/models"

	"github.com/gocolly/colly/v2"
)

const (
	cacheDir = "./cache"

	purchasesTableQuery    = "#myTable > tr"
	anyCellQuery           = "td"
	generalInfoTableQuery  = "#collapse4 table"
	firstCellQuery         = "tr:nth-child(1) td:nth-child(1)"
	secondCellQuery        = "tr:nth-child(1) td:nth-child(2)"
	thirdCellQuery         = "tr:nth-child(1) td:nth-child(3)"
	fourthCellQuery        = "tr:nth-child(1) td:nth-child(4)"
	addInfoCellQuery       = "#collapse3 > table > tbody > tr > td"
	accessKeyCellQuery     = "#collapseTwo > table > tbody > tr > td"
	paymentMethodCellQuery = ".container > div:nth-child(11) strong div"

	visitingErr   = "failed to visit URL: %s"
	processingErr = "request URL: %s failed with response: %s"
	scrapingErr   = "failed to retrieve and/or parse data"
)

var (
	intRegexp   = regexp.MustCompile(`\d+`)
	floatRegexp = regexp.MustCompile(`\d+.\d+`)
)

// ScrapeAndStore scrapes the nfce.fazenda.mg.gov.br website and store results
// in the database
func ScrapeAndStore(url, userID string) (*models.NFCE, error) {
	is, op, fc, bp, pm, nfce, purchases, err := scrape(url)
	if err != nil {
		return nil, err
	}

	if err = firstOrCreateIssuer(is); err != nil {
		return nil, err
	}
	if err = firstOrCreate(op); err != nil {
		return nil, err
	}
	if err = firstOrCreate(fc); err != nil {
		return nil, err
	}
	if err = firstOrCreate(bp); err != nil {
		return nil, err
	}
	if err = firstOrCreate(pm); err != nil {
		return nil, err
	}

	nfce.UserID = userID
	nfce.IssuerID = is.ID
	nfce.OperationDestinationID = op.ID
	nfce.FinalCostumerID = fc.ID
	nfce.BuyerPresenceID = bp.ID
	nfce.PaymentMethodID = pm.ID

	if result := CreateNFCE(nfce); result.Error != nil {
		return nil, result.Error
	}
	if result := CreatePurchases(purchases, nfce.ID); result.Error != nil {
		return nil, result.Error
	}

	return nfce, nil
}

func scrape(url string) (
	is *models.Issuer,
	od *models.OperationDestination,
	fc *models.FinalCostumer,
	bp *models.BuyerPresence,
	pm *models.PaymentMethod,
	nfce *models.NFCE,
	purchases models.PurchaseList,
	fatal error,
) {
	url = strings.Replace(url, "https", "http", 1)
	c := colly.NewCollector()

	c.Async = true
	c.CacheDir = cacheDir

	nfce = &models.NFCE{
		SourceURL: url,
	}
	purchases = make(models.PurchaseList, 0, 32)

	// Find purchases data in first table.
	c.OnHTML(purchasesTableQuery, func(e *colly.HTMLElement) {
		rows := e.ChildTexts(anyCellQuery)

		p := &models.Purchase{
			Code:        getCode(rows[0]),
			Description: getDescription(rows[0]),
			Quantity:    getQuantity(rows[1]),
			Unit:        getUnit(rows[2]),
			Price:       getPrice(rows[3]),
		}

		purchases = append(purchases, p)
	})

	// Find general information in second table.
	var r int
	c.OnHTML(generalInfoTableQuery, func(e *colly.HTMLElement) {
		r++

		if strings.TrimSpace(e.ChildText(firstCellQuery)) == "" {
			return
		}

		switch r {
		case 1:
			is = &models.Issuer{
				Name:         e.ChildText(firstCellQuery),
				CNPJ:         e.ChildText(secondCellQuery),
				Registration: e.ChildText(thirdCellQuery),
				State:        e.ChildText(fourthCellQuery),
			}
		case 2:
			od = &models.OperationDestination{
				Code:        getInfoCode(e.ChildText(firstCellQuery)),
				Description: getInfoDescription(e.ChildText(firstCellQuery)),
			}

			fc = &models.FinalCostumer{
				Code:        getInfoCode(e.ChildText(secondCellQuery)),
				Description: getInfoDescription(e.ChildText(secondCellQuery)),
			}

			bp = &models.BuyerPresence{
				Code:        getInfoCode(e.ChildText(thirdCellQuery)),
				Description: getInfoDescription(e.ChildText(thirdCellQuery)),
			}
		case 3:
			nfce.Modeling = getInfoInt(e.ChildText(firstCellQuery))
			nfce.Series = getInfoInt(e.ChildText(secondCellQuery))
			nfce.Number = getInfoInt(e.ChildText(thirdCellQuery))
			nfce.EmissionDate = getDateTime(e.ChildText(fourthCellQuery))
		case 4:
			nfce.Amount = getPrice(e.ChildText(firstCellQuery))
			nfce.ICMSBasis = getPrice(e.ChildText(secondCellQuery))
			nfce.ICMSValue = getPrice(e.ChildText(thirdCellQuery))
		case 5:
			nfce.Protocol = getInfoInt(e.ChildText(firstCellQuery))
		}
	})

	c.OnHTML(addInfoCellQuery, func(e *colly.HTMLElement) {
		nfce.AdditionalInformation = e.Text
	})

	c.OnHTML(accessKeyCellQuery, func(e *colly.HTMLElement) {
		nfce.AccessKey = e.Text
	})

	c.OnHTML(paymentMethodCellQuery, func(e *colly.HTMLElement) {
		pm = &models.PaymentMethod{
			Code:        getInfoCode(e.Text),
			Description: getInfoDescription(e.Text),
		}
	})

	c.OnError(func(r *colly.Response, err error) {
		fatal = fmt.Errorf(processingErr, r.Request.URL.Hostname(), err)
	})

	if err := c.Visit(url); err != nil {
		fatal = fmt.Errorf(visitingErr, err)
		return
	}
	c.Wait()

	switch {
	case is == nil, od == nil, fc == nil, bp == nil, nfce == nil, pm == nil:
		fatal = fmt.Errorf(scrapingErr)
		return
	}

	return
}

func getCode(s string) int {
	c, _ := strconv.Atoi(intRegexp.FindString(s[strings.Index(s, "("):]))
	return c
}

func getDescription(s string) string {
	return strings.TrimSpace(s[:strings.Index(s, "(")])
}

func getQuantity(s string) float64 {
	s = strings.TrimSpace(s[strings.Index(s, ":")+1:])
	c, _ := strconv.ParseFloat(s, 64)
	return c
}

func getUnit(s string) string {
	return strings.TrimSpace(s[strings.Index(s, ":")+1:])
}

func getPrice(s string) float64 {
	s = strings.Replace(s, ".", "", -1)
	s = strings.Replace(s, ",", ".", 1)
	c, _ := strconv.ParseFloat(floatRegexp.FindString(s), 64)
	return c
}

func getInfoCode(s string) string {
	return strings.TrimSpace(s[:strings.Index(s, "-")])
}

func getInfoDescription(s string) string {
	return strings.TrimSpace(s[strings.Index(s, "-")+1:])
}

func getInfoInt(s string) int {
	c, _ := strconv.Atoi(strings.TrimSpace(s))
	return c
}

func getDateTime(s string) time.Time {
	t, _ := time.Parse("02/01/2006 15:04:05", s)
	return t
}

func firstOrCreate(dest interface{}) error {
	tx := database.DB.Where(dest).FirstOrCreate(dest)
	return tx.Error
}

func firstOrCreateIssuer(issuer *models.Issuer) error {
	tx := database.DB.Where(&models.Issuer{CNPJ: issuer.CNPJ}).FirstOrCreate(issuer)
	return tx.Error
}
