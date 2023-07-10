package routes

import (
	"emscraper/handlers"
	"emscraper/middlewares"

	"github.com/gofiber/fiber/v2"
)

// Setup creates routes for the application.
func Setup(app *fiber.App) {
	app.Use(middlewares.Protected())

	app.Post("/", handlers.CreateNFCE)
}
