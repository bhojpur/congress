package oss

// Copyright (c) 2018 Bhojpur Consulting Private Limited, India. All rights reserved.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import (
	"fmt"
	"os"
	"strings"

	"github.com/bhojpur/congress/pkg/utils"
)

func uploadFolder(folder string) {
	path := fmt.Sprintf("../web/build/static/%s/", folder)
	filenames := utils.ListFiles(path)

	bucket := getBucket()

	for _, filename := range filenames {
		file, err := os.Open(path + filename)
		if err != nil {
			panic(err)
		}

		objectKey := fmt.Sprintf("congress/static/%s/%s", folder, filename)
		err = bucket.PutObject(objectKey, file)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Uploaded [%s] to [%s]\n", path, objectKey)
	}
}

func updateHtml() {
	htmlPath := "../web/build/index.html"
	html := utils.ReadStringFromPath(htmlPath)
	html = strings.Replace(html, "\"/static/", fmt.Sprintf("\"https://%s/congress/static/", domain), -1)
	utils.WriteStringToPath(html, htmlPath)

	fmt.Printf("Updated HTML to [%s]\n", html)
}
