package controllers

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
	"bytes"
	"fmt"
	"io"
	"mime/multipart"

	"github.com/bhojpur/congress/pkg/service"
)

func getFileBytes(file *multipart.File) []byte {
	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, *file); err != nil {
		panic(err)
	}

	return buf.Bytes()
}

func (c *ApiController) UploadSubmissionFile() {
	var resp Response

	owner := c.GetSessionUsername()

	file, header, err := c.Ctx.Request.FormFile("file")
	if err != nil {
		panic(err)
	}
	filename := header.Filename

	fileBytes := getFileBytes(&file)

	fileUrl, objectKey := service.UploadFileToStorage(owner, "file", "UploadSubmissionFile", fmt.Sprintf("congress/file/%s/%s/%s", owner, "submissions", filename), fileBytes)
	resp = Response{Status: "ok", Msg: fileUrl, Data: len(fileBytes), Data2: objectKey}

	c.Data["json"] = resp
	c.ServeJSON()
}
