package controller

import (
	"encoding/json"
	"net/http"
	"upload-digihack/models"
	"upload-digihack/services"
)

func GelastHashes(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)

	var hashes models.HashesRet
	hashes.LastBlock = services.ReadLastFileHash()
	hashes.LastWallet = services.ReadFileLastWallet()
	hashes.LastFinded = services.ReadFindedAnimalLastHash()

	json.NewEncoder(w).Encode(hashes)

}
