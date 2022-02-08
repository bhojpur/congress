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

type TreeItem struct {
	Key       string      `orm:"varchar(100)" json:"key"`
	Title     string      `orm:"varchar(100)" json:"title"`
	Content   string      `orm:"mediumtext" json:"content"`
	TitleEn   string      `orm:"varchar(100)" json:"titleEn"`
	ContentEn string      `orm:"mediumtext" json:"contentEn"`
	Children  []*TreeItem `orm:"varchar(1000)" json:"children"`
}

type Conference struct {
	Owner       string `orm:"varchar(100) notnull pk" json:"owner"`
	Name        string `orm:"varchar(100) notnull pk" json:"name"`
	CreatedTime string `orm:"varchar(100)" json:"createdTime"`

	StartDate string `orm:"varchar(100)" json:"startDate"`
	EndDate   string `orm:"varchar(100)" json:"endDate"`
	FullName  string `orm:"varchar(100)" json:"fullName"`
	Organizer string `orm:"varchar(100)" json:"organizer"`
	Location  string `orm:"varchar(100)" json:"location"`
	Address   string `orm:"varchar(100)" json:"address"`
	Status    string `orm:"varchar(100)" json:"status"`
	Language  string `orm:"varchar(100)" json:"language"`

	Carousels   []string    `orm:"mediumtext" json:"carousels"`
	IntroText   string      `orm:"mediumtext" json:"introText"`
	DefaultItem string      `orm:"mediumtext" json:"defaultItem"`
	TreeItems   []*TreeItem `orm:"mediumtext" json:"treeItems"`
}

func GetGlobalConferences() []*Conference {
	conferences := []*Conference{}
	err := adapter.engine.Asc("owner").Desc("created_time").Find(&conferences)
	if err != nil {
		panic(err)
	}

	return conferences
}

func GetConferences(owner string) []*Conference {
	conferences := []*Conference{}
	err := adapter.engine.Desc("created_time").Find(&conferences, &Conference{Owner: owner})
	if err != nil {
		panic(err)
	}

	return conferences
}

func getConference(owner string, name string) *Conference {
	conference := Conference{Owner: owner, Name: name}
	existed, err := adapter.engine.Get(&conference)
	if err != nil {
		panic(err)
	}

	if existed {
		return &conference
	} else {
		return nil
	}
}

func GetConference(id string) *Conference {
	owner, name := utils.GetOwnerAndNameFromId(id)
	return getConference(owner, name)
}

func UpdateConference(id string, conference *Conference) bool {
	owner, name := utils.GetOwnerAndNameFromId(id)
	if getConference(owner, name) == nil {
		return false
	}

	_, err := adapter.engine.ID(core.PK{owner, name}).AllCols().Update(conference)
	if err != nil {
		panic(err)
	}

	//return affected != 0
	return true
}

func AddConference(conference *Conference) bool {
	affected, err := adapter.engine.Insert(conference)
	if err != nil {
		panic(err)
	}

	return affected != 0
}

func DeleteConference(conference *Conference) bool {
	affected, err := adapter.engine.ID(core.PK{conference.Owner, conference.Name}).Delete(&Conference{})
	if err != nil {
		panic(err)
	}

	return affected != 0
}
