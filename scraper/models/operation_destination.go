package models

type OperationDestination struct {
	ID          string `gorm:"default:uuid_generate_v4()"`
	Code        string
	Description string
}

func (OperationDestination) TableName() string {
	return "operationDestinations"
}
