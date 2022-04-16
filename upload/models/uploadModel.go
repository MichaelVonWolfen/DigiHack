package models

type UploadModel struct {
	Owner       string `json:"owner"`
	Image       string `json:"image"`
	Description string `json:"description"`
	Location    struct {
		Lat float64 `json:"lat"`
		Lon float64 `json:"lon"`
	} `json:"location"`
	Name            string   `json:"name"`
	Species         string   `json:"species"`
	Rase            string   `json:"rase"`
	Characteristics []string `json:"characteristics"`
	DateLost        string   `json:"dateLost"`
	DateAnunt       string   `json:"dateAnunt"`
}
