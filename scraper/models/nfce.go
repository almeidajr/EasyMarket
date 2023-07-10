package models

import "time"

type NFCE struct {
	ID                     string    `json:"id" gorm:"default:uuid_generate_v4()"`
	SourceURL              string    `json:"sourceUrl" gorm:"column:sourceUrl"`
	AccessKey              string    `json:"accessKey" gorm:"column:accessKey"`
	AdditionalInformation  string    `json:"additionalInformation" gorm:"column:additionalInformation"`
	Modeling               int       `json:"model" gorm:"column:model"`
	Series                 int       `json:"series" gorm:"column:series"`
	Number                 int       `json:"number" gorm:"column:number"`
	EmissionDate           time.Time `json:"emissionDate" gorm:"column:emissionDate"`
	Amount                 float64   `json:"amount" gorm:"column:amount"`
	ICMSBasis              float64   `json:"icmsBasis" gorm:"column:icmsBasis"`
	ICMSValue              float64   `json:"icmsValue" gorm:"column:icmsValue"`
	Protocol               int       `json:"protocol" gorm:"column:protocol"`
	UserID                 string    `json:"userId" gorm:"column:userId"`
	IssuerID               string    `json:"issuerId" gorm:"column:issuerId"`
	OperationDestinationID string    `json:"operationDestinationId" gorm:"column:operationDestinationId"`
	FinalCostumerID        string    `json:"finalCostumerId" gorm:"column:finalCostumerId"`
	BuyerPresenceID        string    `json:"buyerPresenceId" gorm:"column:buyerPresenceId"`
	PaymentMethodID        string    `json:"paymentMethodId" gorm:"column:paymentMethodId"`
}

func (NFCE) TableName() string {
	return "nfces"
}
