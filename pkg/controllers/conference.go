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
	"encoding/json"

	"github.com/bhojpur/congress/pkg/object"
)

func (c *ApiController) GetGlobalConferences() {
	c.Data["json"] = object.GetGlobalConferences()
	c.ServeJSON()
}

func (c *ApiController) GetConferences() {
	webform, _ := c.Input()
	owner := webform.Get("owner")

	c.Data["json"] = object.GetConferences(owner)
	c.ServeJSON()
}

func (c *ApiController) GetConference() {
	webform, _ := c.Input()
	id := webform.Get("id")

	c.Data["json"] = object.GetConference(id)
	c.ServeJSON()
}

func (c *ApiController) UpdateConference() {
	webform, _ := c.Input()
	id := webform.Get("id")

	var conference object.Conference
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &conference)
	if err != nil {
		panic(err)
	}

	c.Data["json"] = object.UpdateConference(id, &conference)
	c.ServeJSON()
}

func (c *ApiController) AddConference() {
	var conference object.Conference
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &conference)
	if err != nil {
		panic(err)
	}

	c.Data["json"] = object.AddConference(&conference)
	c.ServeJSON()
}

func (c *ApiController) DeleteConference() {
	var conference object.Conference
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &conference)
	if err != nil {
		panic(err)
	}

	c.Data["json"] = object.DeleteConference(&conference)
	c.ServeJSON()
}
