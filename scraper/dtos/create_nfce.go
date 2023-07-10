package dtos

type CreateNFCE struct {
	URL string `json:"url" validate:"required,url,contains=gov.br"`
}
