package server

import (
	"fmt"
	"net/http"
	"upload-digihack/controller"
)

func ServerStart() {
	http.HandleFunc("/upload", controller.UploadController)
	http.HandleFunc("/createWallet", controller.CreateWallet)
	http.HandleFunc("/viewWallet", controller.ViewWallet)
	http.HandleFunc("/findedAnimal", controller.FindedAnimal)

	http.HandleFunc("/getLastHashAnimal", controller.GelastHashes)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println(err)
	}
}
