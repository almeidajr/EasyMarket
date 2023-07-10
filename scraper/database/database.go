package database

import (
	"emscraper/utils"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// Connect initialize pg database connection using gorm.
func Connect() error {
	dsn := utils.Config.DatabaseURL
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		QueryFields: true,
		Logger:      logger.Default.LogMode(logger.Error),
	})
	DB = db

	return err
}
