package controller

import (
    "fmt"
	"encoding/json"
	"net/http"
	"upload-digihack/models"
	"upload-digihack/services"
)

func ViewWallet(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)

	var userWallet models.WalletCreate
	var blockWallet models.BlockWallet
	var blockReturn models.WalletCreateReturn
	//var responseReturn models.UploadModelResponse

	userWalletCreate := json.NewDecoder(req.Body)
	userWalletCreate.Decode(&userWallet)
	lastSaveHash := services.ReadFileLastWallet()
	fmt.Println(userWallet)
	if len(userWallet.Phone) > 0 {
		if len(userWallet.Pass) > 0 {
			privateKey := services.GeneratePrivateKey(userWallet.Pass)
			publicKey := services.GeneratePubKey(privateKey)

			secretkey := []byte(privateKey[0:26])
			cidSave, check := services.VerifyPublicKey(publicKey, lastSaveHash)
			if check == 0 {
				retError := models.UploadModelResponse{}
				retError.Error = 200
				retError.Message = "Already created"
				json.NewEncoder(w).Encode(retError)
			} else {
				blockWallet.PrevHash = lastSaveHash
				getData := services.ReadDataIpfsWallet(cidSave)
				blockReturn.PublicKey = publicKey
				blockReturn.PrivateKey = privateKey
				blockReturn.Phone = getData.Phone
				blockReturn.CurrentHash = cidSave
				blockReturn.PrevHash = getData.PrevHash
				blockReturn.SecretKey = string(secretkey)
                fmt.Println(blockReturn)
                fmt.Println("a erjfdn brlka nadoi heio[o niatnbal'terj hoi trtsl hstroo8]")
				json.NewEncoder(w).Encode(blockReturn)

			}
		}
	}
}
