package models

type BGQueue struct {
	ID      string `gorm:"default:uuid_generate_v4()"`
	UserID  string `json:"userId" gorm:"column:userId"`
	URL     string `gorm:"column:url"`
	Pending bool   `gorm:"default:true"`
}

func (BGQueue) TableName() string {
	return "bgqueue"
}
