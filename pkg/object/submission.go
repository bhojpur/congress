package object

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
	"github.com/bhojpur/congress/pkg/utils"
	"github.com/bhojpur/dbm/pkg/core"
)

type AuthorItem struct {
	Name            string `orm:"varchar(100)" json:"name"`
	Affiliation     string `orm:"varchar(100)" json:"affiliation"`
	Email           string `orm:"varchar(100)" json:"email"`
	IsNotified      bool   `json:"isNotified"`
	IsCorresponding bool   `json:"isCorresponding"`
}

type Submission struct {
	Owner       string `orm:"varchar(100) notnull pk" json:"owner"`
	Name        string `orm:"varchar(100) notnull pk" json:"name"`
	CreatedTime string `orm:"varchar(100)" json:"createdTime"`

	Conference  string        `orm:"varchar(100)" json:"conference"`
	Title       string        `orm:"varchar(100)" json:"title"`
	Authors     []*AuthorItem `orm:"varchar(10000)" json:"authors"`
	Type        string        `orm:"varchar(100)" json:"type"`
	SubType     string        `orm:"varchar(100)" json:"subType"`
	WordFileUrl string        `orm:"varchar(100)" json:"wordFileUrl"`
	PdfFileUrl  string        `orm:"varchar(100)" json:"pdfFileUrl"`
	Status      string        `orm:"varchar(100)" json:"status"`
}

func GetAllSubmissions() []*Submission {
	submissions := []*Submission{}
	err := adapter.engine.Desc("created_time").Find(&submissions, &Submission{})
	if err != nil {
		panic(err)
	}

	return submissions
}

func GetSubmissions(owner string) []*Submission {
	submissions := []*Submission{}
	err := adapter.engine.Desc("created_time").Find(&submissions, &Submission{Owner: owner})
	if err != nil {
		panic(err)
	}

	return submissions
}

func getSubmission(owner string, name string) *Submission {
	submission := Submission{Owner: owner, Name: name}
	existed, err := adapter.engine.Get(&submission)
	if err != nil {
		panic(err)
	}

	if existed {
		return &submission
	} else {
		return nil
	}
}

func GetSubmission(id string) *Submission {
	owner, name := utils.GetOwnerAndNameFromId(id)
	return getSubmission(owner, name)
}

func UpdateSubmission(id string, submission *Submission) bool {
	owner, name := utils.GetOwnerAndNameFromId(id)
	if getSubmission(owner, name) == nil {
		return false
	}

	_, err := adapter.engine.ID(core.PK{owner, name}).AllCols().Update(submission)
	if err != nil {
		panic(err)
	}

	//return affected != 0
	return true
}

func AddSubmission(submission *Submission) bool {
	affected, err := adapter.engine.Insert(submission)
	if err != nil {
		panic(err)
	}

	return affected != 0
}

func DeleteSubmission(submission *Submission) bool {
	affected, err := adapter.engine.ID(core.PK{submission.Owner, submission.Name}).Delete(&Submission{})
	if err != nil {
		panic(err)
	}

	return affected != 0
}
