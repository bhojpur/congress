package main

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
	"github.com/bhojpur/congress/pkg/object"
	"github.com/bhojpur/congress/pkg/router"
	"github.com/bhojpur/congress/pkg/utils"
	ctxsvr "github.com/bhojpur/web/pkg/context"
	websvr "github.com/bhojpur/web/pkg/engine"
	"github.com/bhojpur/web/pkg/filter/cors"

	_ "github.com/bhojpur/congress/pkg/router"
)

func main() {
	object.InitAdapter()
	utils.InitIpDb()

	websvr.InsertFilter("*", websvr.BeforeRouter, cors.Allow(&cors.Options{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "X-Requested-With", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// CORS Post method issue
	websvr.InsertFilter("*", websvr.BeforeRouter, func(ctx *ctxsvr.Context) {
		if ctx.Input.Method() == "OPTIONS" {
			ctx.WriteString("ok")
		}
	})

	//websvr.DelStaticPath("/static")
	websvr.SetStaticPath("/static", "pkg/webui/build/static")
	websvr.InsertFilter("/", websvr.BeforeRouter, router.TransparentStatic) // must has this for default page
	websvr.InsertFilter("/*", websvr.BeforeRouter, router.TransparentStatic)

	websvr.BConfig.WebConfig.Session.SessionProvider = "file"
	websvr.BConfig.WebConfig.Session.SessionProviderConfig = "./tmp"
	websvr.BConfig.WebConfig.Session.SessionGCMaxLifetime = 3600 * 24 * 365

	websvr.Run()
}
