package services

import (
	"crypto/cipher"
	"crypto/sha512"
	"encoding/hex"
	"golang.org/x/crypto/blowfish"
)

func GeneratePrivateKey(getData string) string {

	dataToPut := getData
	hash := sha512.New()

	hash.Write([]byte(dataToPut))
	ret := hash.Sum(nil)
	return hex.EncodeToString(ret)
}

func GeneratePubKey(privateKey string) string {

	dataToPut := privateKey
	hash := sha512.New()

	hash.Write([]byte(dataToPut))
	ret := hash.Sum(nil)
	return hex.EncodeToString(ret)
}

func BlowfishChecksizeAndPad(pt []byte) []byte {
	// calculate modulus of plaintext to blowfish's cipher block size
	// if result is not 0, then we need to pad
	modulus := len(pt) % blowfish.BlockSize
	if modulus != 0 {
		// how many bytes do we need to pad to make pt to be a multiple of blowfish's block size?
		padlen := blowfish.BlockSize - modulus
		// let's add the required padding
		for i := 0; i < padlen; i++ {
			// add the pad, one at a time
			pt = append(pt, 0)
		}
	}
	// return the whole-multiple-of-blowfish.BlockSize-sized plaintext to the calling function
	return pt
}

func BlowfishDecrypt(et, key []byte) []byte {
	// create the cipher
	dcipher, err := blowfish.NewCipher(key)
	if err != nil {
		// fix this. its okay for this tester program, but...
		panic(err)
	}
	// make initialisation vector to be the first 8 bytes of ciphertext.
	// see related note in blowfishEncrypt()
	div := et[:blowfish.BlockSize]
	// check last slice of encrypted text, if it's not a modulus of cipher block size, we're in trouble
	decrypted := et[blowfish.BlockSize:]
	if len(decrypted)%blowfish.BlockSize != 0 {
		panic("decrypted is not a multiple of blowfish.BlockSize")
	}
	// ok, we're good... create the decrypter
	dcbc := cipher.NewCBCDecrypter(dcipher, div)
	// decrypt!
	dcbc.CryptBlocks(decrypted, decrypted)
	return decrypted
}

func BlowfishEncrypt(ppt, key []byte) []byte {
	// create the cipher
	ecipher, err := blowfish.NewCipher(key)
	if err != nil {
		// fix this. its okay for this tester program, but ....
		panic(err)
	}
	// make ciphertext big enough to store len(ppt)+blowfish.BlockSize
	ciphertext := make([]byte, blowfish.BlockSize+len(ppt))
	// make initialisation vector to be the first 8 bytes of ciphertext. you
	// wouldn't do this normally/in real code, but this IS example code! :)
	eiv := ciphertext[:blowfish.BlockSize]
	// create the encrypter
	ecbc := cipher.NewCBCEncrypter(ecipher, eiv)
	// encrypt the blocks, because block cipher
	ecbc.CryptBlocks(ciphertext[blowfish.BlockSize:], ppt)
	// return ciphertext to calling function
	return ciphertext
}
