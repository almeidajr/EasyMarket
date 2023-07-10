package services

import (
	"emscraper/database"
	"emscraper/models"

	"gorm.io/gorm"
)

// CreatePurchases saves the purchase list to the database.
func CreatePurchases(ps models.PurchaseList, nfceId string) *gorm.DB {
	for _, p := range ps {
		p.NfceId = nfceId
	}

	return database.DB.Create(&ps)
}
