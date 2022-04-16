package controller

import (
	"encoding/json"
	"net/http"
	"upload-digihack/models"
)

func UploadController(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)

	var blockUploadModel models.UploadModel
	var responseReturn models.UploadModelResponse

	blockUploadModelFirst := json.NewDecoder(req.Body)
	blockUploadModelFirst.Decode(&blockUploadModel)

	responseReturn.Error = 100
	responseReturn.Message = "Test message"

	json.NewEncoder(w).Encode(responseReturn)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
