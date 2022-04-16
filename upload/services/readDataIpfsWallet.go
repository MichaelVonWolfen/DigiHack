package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	shell "github.com/ipfs/go-ipfs-api"
	"os"
	"upload-digihack/models"
)

func readDataIpfsWallet(cid string) models.BlockWallet {
	sh := shell.NewShell("https://ipfs.infura.io:5001")
	data, err := sh.Cat(cid)
	res := models.BlockWallet{}
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %s", err)
		return res
		//os.Exit(1)
	}

	// ...so we convert it to a string by passing it through
	// a buffer first. A 'costly' but useful process.
	// https://golangcode.com/convert-io-readcloser-to-a-string/
	buf := new(bytes.Buffer)
	buf.ReadFrom(data)
	newStr := buf.String()

	json.Unmarshal([]byte(newStr), &res)
	fmt.Println(res)
	return res
}
