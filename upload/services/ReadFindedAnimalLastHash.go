package services

import (
	"fmt"
	"io/ioutil"
	"log"
)

func ReadFindedAnimalLastHash() string {

	fmt.Printf("\n\nReading a file in Go lang\n")

	// The ioutil package contains inbuilt
	// methods like ReadFile that reads the
	// filename and returns the contents.
	data, err := ioutil.ReadFile("hashblockfindendsanimals.txt")
	if err != nil {
		log.Panicf("failed reading data from file: %s", err)
	}
	//fmt.Printf("\nFile Name: %s", fileName)
	//fmt.Printf("\nSize: %d bytes", len(data))
	//fmt.Printf("\nData: %s", data)

	return string(data)
}
