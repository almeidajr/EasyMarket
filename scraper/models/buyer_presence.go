package models

type BuyerPresence struct {
	ID          string `gorm:"default:uuid_generate_v4()"`
	Code        string
	Description string
}

func (BuyerPresence) TableName() string {
	return "buyerPresences"
}
