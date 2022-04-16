package server

import (
	"net/http"
	"upload-digihack/controller"
)

func ServerStart() {
	http.HandleFunc("/upload", controller.UploadController)
	http.HandleFunc("/createWallet", controller.CreateWallet)
	http.HandleFunc("/viewWallet", controller.ViewWallet)

	http.ListenAndServe(":8080", nil)
}
