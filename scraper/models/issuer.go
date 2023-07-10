package models

type Issuer struct {
	ID           string `gorm:"default:uuid_generate_v4()"`
	Name         string
	CNPJ         string
	Registration string `gorm:"column:stateRegistration"`
	State        string
}
