package main

import (
	"fmt"
	"upload-digihack/server"
)

func main() {
	fmt.Println("Server started on port: 8080")

	server.ServerStart()

}
