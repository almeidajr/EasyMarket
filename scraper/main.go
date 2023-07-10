package main

import (
	"log"

	"emscraper/database"
	"emscraper/routes"
	"emscraper/tasks"
	"emscraper/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

const (
	appName = "EasyMarket NFCE Data Scraper"

	configErr = "Failed to read environment variables."
	dbErr     = "Failed to connect to database."
)

func main() {
	if err := utils.LoadConfig(); err != nil {
		log.Fatalln(configErr, err)
	}
	if err := database.Connect(); err != nil {
		log.Fatalln(dbErr)
	}

	app := fiber.New(fiber.Config{
		AppName: appName,
	})
	app.Use(cache.New())
	app.Use(recover.New())
	app.Use(cors.New())
	app.Use(logger.New())

	routes.Setup(app)

	tasks.Run()

	log.Fatalln(app.Listen(":" + utils.Config.Port))
}
