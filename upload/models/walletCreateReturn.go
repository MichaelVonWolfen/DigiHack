package models

type WalletCreateReturn struct {
	Phone       string `json:"phone"`
	PublicKey   string `json:"publicKey"`
	PrivateKey  string `json:"privateKey"`
	PrevHash    string `json:"prevHash"`
	CurrentHash string `json:"currentHash"`
	SecretKey   string `json:"secretKey"`
}
