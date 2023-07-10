package services

import (
	"regexp"

	"emscraper/database"
	"emscraper/models"

	"gorm.io/gorm"
)

const whereClause = `"userId" = ? AND "sourceUrl" LIKE ?`

var protocolRegexp = regexp.MustCompile(`^https?://`)

// FindNFCE finds and returns a NFCE by user id and source url.
func FindNFCE(url, userID string) (*models.NFCE, *gorm.DB) {
	db := database.DB
	cleanURL := protocolRegexp.ReplaceAllString(url, "")

	nfce := new(models.NFCE)
	result := db.Where(whereClause, userID, "%"+cleanURL).Limit(1).Find(nfce)

	return nfce, result
}

// CreateNFCE saves a NFCE in the database
func CreateNFCE(nfce *models.NFCE) *gorm.DB {
	db := database.DB
	return db.Create(nfce)
}
