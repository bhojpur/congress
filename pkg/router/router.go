package router

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
	websvr "github.com/bhojpur/web/pkg/engine"

	"github.com/bhojpur/congress/pkg/controllers"
)

func init() {
	initAPI()
}

func initAPI() {
	ns :=
		websvr.NewNamespace("/api",
			websvr.NSInclude(
				&controllers.ApiController{},
			),
		)
	websvr.AddNamespace(ns)

	websvr.Router("/api/signin", &controllers.ApiController{}, "POST:Signin")
	websvr.Router("/api/signout", &controllers.ApiController{}, "POST:Signout")
	websvr.Router("/api/get-account", &controllers.ApiController{}, "GET:GetAccount")

	websvr.Router("/api/get-global-conferences", &controllers.ApiController{}, "GET:GetGlobalConferences")
	websvr.Router("/api/get-conferences", &controllers.ApiController{}, "GET:GetConferences")
	websvr.Router("/api/get-conference", &controllers.ApiController{}, "GET:GetConference")
	websvr.Router("/api/update-conference", &controllers.ApiController{}, "POST:UpdateConference")
	websvr.Router("/api/add-conference", &controllers.ApiController{}, "POST:AddConference")
	websvr.Router("/api/delete-conference", &controllers.ApiController{}, "POST:DeleteConference")

	websvr.Router("/api/get-all-submissions", &controllers.ApiController{}, "GET:GetAllSubmissions")
	websvr.Router("/api/get-submissions", &controllers.ApiController{}, "GET:GetSubmissions")
	websvr.Router("/api/get-submission", &controllers.ApiController{}, "GET:GetSubmission")
	websvr.Router("/api/update-submission", &controllers.ApiController{}, "POST:UpdateSubmission")
	websvr.Router("/api/add-submission", &controllers.ApiController{}, "POST:AddSubmission")
	websvr.Router("/api/delete-submission", &controllers.ApiController{}, "POST:DeleteSubmission")
	websvr.Router("/api/upload-submission-file", &controllers.ApiController{}, "POST:UploadSubmissionFile")
}
