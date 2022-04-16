package models

type BlockWallet struct {
	Phone     string `json:"phone"`
	PublicKey string `json:"publicKey"`
	PrevHash  string `json:prevHash`
}
