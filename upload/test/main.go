package main

import (
	// "context"
	"bytes"
	"encoding/json"
	"fmt"
	"os"

	shell "github.com/ipfs/go-ipfs-api"
)

// TimeSeriesDatum is the structure used to store a single time series data
type TimeSeriesDatum struct {
	Id      uint64 `json:"id"`
	Value   uint64 `json:"value"`
	Value7  int
	Value1  int
	Id2     int
	Id3     int
	Value9  int
	Id4     int
	Value66 int
	Value3  int
	Id5     int
}

func main() {
	//
	// Connect to your local IPFS deamon running in the background.
	//

	// Where your local node is running on localhost:5001
	sh := shell.NewShell("https://ipfs.infura.io:5001")

	//
	// Add the file to IPFS
	//

	tsd := &TimeSeriesDatum{
		Id:      1,
		Value1:  123,
		Id2:     1,
		Value7:  123,
		Id3:     1,
		Value9:  123,
		Id4:     1,
		Value66: 123,
		Id5:     1,
		Value3:  123,
	}
	tsdBin, _ := json.Marshal(tsd)
	reader := bytes.NewReader(tsdBin)

	cid, err := sh.Add(reader)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %s", err)
		os.Exit(1)
	}
	fmt.Printf("added %s\n", cid)

	//
	// Get the data from IPFS and output the contents into `struct` format.
	//

	data, err := sh.Cat(cid)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %s", err)
		os.Exit(1)
	}

	// ...so we convert it to a string by passing it through
	// a buffer first. A 'costly' but useful process.
	// https://golangcode.com/convert-io-readcloser-to-a-string/
	buf := new(bytes.Buffer)
	buf.ReadFrom(data)
	newStr := buf.String()

	res := &TimeSeriesDatum{}
	json.Unmarshal([]byte(newStr), &res)
	fmt.Println(res)
}

{
"phone":"

"publicKey": "063a552e3e4548df1870b7fbc548065018b89652c31f81d514f2edc8c14b6eb1c69edc9f1a64caf1986bbbb56ef95fca307474520e5cee51288dbbd7152fbd58",
"privateKey": "bfc9504a1cd7104cdd0277f87a1316d9739946dbc401399a3c6d57bb8295a5f7cbb91836c8609ca30c537e3749845b69333790ce05b2086941418a154a974170",
"prevHash": "QmbDvgpwVGMv9sQqbJZiUZXYSSiu1cnppUyb27isCXEkRa",
"currentHash": "QmQXHejvtQF1p5X1NogXnfGHHmGe8upxicTodK1dknaRLq",
"secretKey": "bfc9504a1cd7104cdd0277f87a"
}
