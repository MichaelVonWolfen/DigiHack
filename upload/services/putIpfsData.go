package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"upload-digihack/models"

	shell "github.com/ipfs/go-ipfs-api"
)

func PutDataIpfsAnimal(animal models.BlockAnimal) string {
	sh := shell.NewShell("https://ipfs.infura.io:5001")

	tsdBin, _ := json.Marshal(animal)
	reader := bytes.NewReader(tsdBin)
	cid, err := sh.Add(reader)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %s", err)
		os.Exit(1)
	}

	fmt.Printf("added %s", cid)

	return cid
}

func PutDataIpfsWallet(wallet models.BlockWallet) string {
	sh := shell.NewShell("https://ipfs.infura.io:5001")

	tsdBin, _ := json.Marshal(wallet)
	reader := bytes.NewReader(tsdBin)
	cid, err := sh.Add(reader)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %s", err)
		os.Exit(1)
	}

	fmt.Printf("added %s\n", cid)

	return cid
}
