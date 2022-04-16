package controller

import (
	"encoding/json"
	"net/http"
	"upload-digihack/models"
	"upload-digihack/services"
)

func UploadController(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)

	var blockUploadModel models.UploadModel
	//var responseReturn models.UploadModelResponse
	var createdBlock models.BlockAnimal

	blockUploadModelFirst := json.NewDecoder(req.Body)
	blockUploadModelFirst.Decode(&blockUploadModel)

	//lastSaveHash := services.ReadFileLastWallet()
	lastSaveHashBlocks := services.ReadLastFileHash()
	if services.ValidatePublicKeyAddingDataUser(blockUploadModel.Owner, blockUploadModel.Cid) == 1 {
		createdBlock.Owner = blockUploadModel.Owner
		createdBlock.DateAnunt = blockUploadModel.DateAnunt
		createdBlock.Characteristics = blockUploadModel.Characteristics
		createdBlock.Description = blockUploadModel.Description
		createdBlock.DateLost = blockUploadModel.DateLost
		createdBlock.Location.Lon = blockUploadModel.Location.Lon
		createdBlock.Location.Lat = blockUploadModel.Location.Lat
		createdBlock.Name = blockUploadModel.Name
		createdBlock.Rase = blockUploadModel.Rase
		createdBlock.Prevhash = lastSaveHashBlocks
		createdBlock.Image = blockUploadModel.Image
		getData := services.PutDataIpfsAnimal(createdBlock)
		services.CreateFileAnimals(getData)
		json.NewEncoder(w).Encode(createdBlock)
	} else {
		retError := models.UploadModelResponse{}
		retError.Error = 200
		retError.Message = "Error in creation of the block"
		json.NewEncoder(w).Encode(retError)
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
