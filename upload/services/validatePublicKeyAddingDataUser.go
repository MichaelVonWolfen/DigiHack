package services

import "fmt"

func ValidatePublicKeyAddingDataUser(checkIfExistPublicKey string, cid string) int {

	dataWallet := readDataIpfsWallet(cid)
	fmt.Println("data:", dataWallet)

	if len(dataWallet.PrevHash) < 20 {
		fmt.Println("founded")
		return 0
	}
	if dataWallet.PublicKey == checkIfExistPublicKey {
		fmt.Println(dataWallet.PublicKey, checkIfExistPublicKey)
		return 1
	}

	return 0
}
