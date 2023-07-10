package handlers

import (
	"emscraper/dtos"
	"emscraper/services"
	"emscraper/utils"

	"github.com/gofiber/fiber/v2"
)

// CreateNFCE handles the NFCE Scraping.
func CreateNFCE(c *fiber.Ctx) error {
	dto := new(dtos.CreateNFCE)
	if err := c.BodyParser(dto); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(err)
	}
	if err := utils.ValidateStruct(dto); err != nil {
		return c.Status(fiber.StatusUnprocessableEntity).JSON(err)
	}

	userID := utils.ContextUserID(c)

	nfce, result := services.FindNFCE(dto.URL, userID)
	if result.Error != nil {
		c.Status(fiber.StatusInternalServerError).JSON(result.Error)
	}
	if result.RowsAffected != 0 {
		return c.Status(fiber.StatusAlreadyReported).JSON(nfce)
	}

	nfce, err := services.ScrapeAndStore(dto.URL, userID)
	if err != nil {
		go services.Enqueue(dto.URL, userID)
		return c.Status(fiber.StatusServiceUnavailable).JSON(err)
	}

	return c.Status(fiber.StatusCreated).JSON(nfce)
}
