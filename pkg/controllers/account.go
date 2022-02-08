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
	_ "embed"

	"github.com/bhojpur/application/pkg/iam"
	websvr "github.com/bhojpur/web/pkg/engine"
)

//go:embed token_jwt_key.pem
var JwtPublicKey string

func init() {
	InitAuthConfig()
}

func InitAuthConfig() {
	bhojpurEndpoint, err := websvr.AppConfig.String("bhojpurEndpoint")
	clientId, err := websvr.AppConfig.String("clientId")
	clientSecret, err := websvr.AppConfig.String("clientSecret")
	bhojpurOrganization, err := websvr.AppConfig.String("bhojpurOrganization")
	bhojpurApplication, err := websvr.AppConfig.String("bhojpurApplication")
	if err != nil {
		panic(err)
	}
	iam.InitConfig(bhojpurEndpoint, clientId, clientSecret, JwtPublicKey, bhojpurOrganization, bhojpurApplication)
}

func (c *ApiController) Signin() {
	webform, _ := c.Input()
	code := webform.Get("code")
	state := webform.Get("state")

	token, err := iam.GetOAuthToken(code, state)
	if err != nil {
		panic(err)
	}

	claims, err := iam.ParseJwtToken(token.AccessToken)
	if err != nil {
		panic(err)
	}

	claims.AccessToken = token.AccessToken
	c.SetSessionClaims(claims)

	c.ResponseOk(claims)
}

func (c *ApiController) Signout() {
	c.SetSessionClaims(nil)

	c.ResponseOk()
}

func (c *ApiController) GetAccount() {
	if c.RequireSignedIn() {
		return
	}

	claims := c.GetSessionClaims()

	c.ResponseOk(claims)
}
