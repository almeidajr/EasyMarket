package services

import (
	"emscraper/database"
	"emscraper/models"
)

func Enqueue(url, userID string) {
	db := database.DB
	t := &models.BGQueue{
		UserID:  userID,
		URL:     url,
		Pending: true,
	}
	if r := db.Where(t).Limit(1).Find(t); r.RowsAffected != 0 {
		return
	}
	db.Create(t)
}

func Dequeue(t *models.BGQueue) {
	db := database.DB
	t.Pending = false
	db.Save(t)
}

func GetQueue() []*models.BGQueue {
	db := database.DB
	var queue []*models.BGQueue

	db.Where("pending = ?", true).Find(&queue)

	return queue
}
