package middlewares

import (
	"emscraper/utils"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
)

// Protected ensures user is authenticated.
func Protected() fiber.Handler {
	return jwtware.New(jwtware.Config{
		SigningKey:   []byte(utils.Config.AppSecret),
		ErrorHandler: jwtError,
	})
}

func jwtError(c *fiber.Ctx, err error) error {
	return c.Status(fiber.StatusUnauthorized).
		JSON(fiber.Map{
			"status":  "error",
			"message": err.Error(),
		})
}
