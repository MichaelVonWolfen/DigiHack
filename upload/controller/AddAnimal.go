package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"upload-digihack/models"
	"upload-digihack/services"
)

func AddAnimal(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)

	var userWallet models.WalletCreate
	var blockWallet models.BlockWallet
	//var responseReturn models.UploadModelResponse

	userWalletCreate := json.NewDecoder(req.Body)
	userWalletCreate.Decode(&userWallet)

	if len(userWallet.Phone) > 0 {
		if len(userWallet.Pass) > 0 {

			privateKey := services.GeneratePrivateKey(userWallet.Phone + userWallet.Pass)
			publicKey := services.GeneratePubKey(privateKey)
			plaintext := []byte(userWallet.Phone)
			secretkey := []byte(privateKey[0:26])

			paddedplaintext := services.BlowfishChecksizeAndPad(plaintext)
			// lets encrypt
			encryptedPhoneNumber := services.BlowfishEncrypt(paddedplaintext, secretkey)
			blockWallet.PublicKey = publicKey
			blockWallet.Phone = string(encryptedPhoneNumber)
			lastSaveHash := services.ReadFileLastWallet()
			if services.VerifyPublicKey(publicKey, lastSaveHash) == 0 {
				blockWallet.PrevHash = lastSaveHash
				getData := services.PutDataIpfsWallet(blockWallet)
				services.CreateFileWallet(getData)
				fmt.Println(getData)
				fmt.Println(string(services.BlowfishDecrypt([]byte(blockWallet.Phone), secretkey)))
				json.NewEncoder(w).Encode(blockWallet)
			} else {
				retError := models.UploadModelResponse{}
				retError.Error = 200
				retError.Message = "Already created"
				json.NewEncoder(w).Encode(retError)
			}
		}
	}
}
