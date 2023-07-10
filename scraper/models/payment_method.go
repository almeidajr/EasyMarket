package models

type PaymentMethod struct {
	ID          string `gorm:"default:uuid_generate_v4()"`
	Code        string
	Description string
}

func (PaymentMethod) TableName() string {
	return "paymentMethods"
}
