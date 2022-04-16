package services

import "fmt"

func VerifyPublicKey(checkIfExistPublicKey string, cid string) int {
	/*resp, err := http.Get("https://ipfs.infura.io/ipfs/" + url)
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()
	*/

	/*
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}
		var wallet models.BlockWallet

		json.Unmarshal(body, wallet)
		fmt.Println()*/
	for {
		dataWallet := readDataIpfsWallet(cid)
		if len(dataWallet.PrevHash) < 20 {
			fmt.Println("founded")
			return 0
		}
		if dataWallet.PublicKey == checkIfExistPublicKey {
			fmt.Println(dataWallet.PublicKey, checkIfExistPublicKey)
			return 1
		}
		cid = dataWallet.PrevHash
	}
	return 0
}
