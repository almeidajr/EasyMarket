package models

type Purchase struct {
	ID          string  `json:"id" gorm:"default:uuid_generate_v4()"`
	NfceId      string  `json:"nfceId" gorm:"column:nfceId"`
	Code        int     `json:"code" gorm:"column:code"`
	Description string  `json:"description" gorm:"column:description"`
	Quantity    float64 `json:"quantity" gorm:"column:quantity"`
	Unit        string  `json:"unit" gorm:"column:unit"`
	Price       float64 `json:"totalPrice" gorm:"column:totalPrice"`
}

type PurchaseList []*Purchase

func (*Purchase) TableName() string {
	return "purchases"
}
