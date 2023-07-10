package models

type FinalCostumer struct {
	ID          string `gorm:"default:uuid_generate_v4()"`
	Code        string
	Description string
}

func (FinalCostumer) TableName() string {
	return "finalCostumers"
}
