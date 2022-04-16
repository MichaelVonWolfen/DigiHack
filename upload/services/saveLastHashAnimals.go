package services

import (
	"fmt"
	"log"
	"os"
)

func CreateFileAnimals(data string) {

	// fmt package implements formatted
	// I/O and has functions like Printf
	// and Scanf
	fmt.Printf("Writing to a file in Go lang\n")

	// in case an error is thrown it is received
	// by the err variable and Fatalf method of
	// log prints the error message and stops
	// program execution
	file, err := os.Create("hashblocksanimals.txt")

	if err != nil {
		log.Fatalf("failed creating file: %s", err)
	}

	// Defer is used for purposes of cleanup like
	// closing a running file after the file has
	// been written and main //function has
	// completed execution
	defer file.Close()

	// len variable captures the length
	// of the string written to the file.
	_, err = file.WriteString(data)

	if err != nil {
		log.Fatalf("failed writing to file: %s", err)
	}

	// Name() method returns the name of the
	// file as presented to Create() method.
	//fmt.Printf("\nFile Name: %s", file.Name())
	//fmt.Printf("\nLength: %d bytes", len)
}
