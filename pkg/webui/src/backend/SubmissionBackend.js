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

import * as Setting from "../Setting";

export function getAllSubmissions() {
  return fetch(`${Setting.ServerUrl}/api/get-all-submissions`, {
    method: "GET",
    credentials: "include"
  }).then(res => res.json());
}

export function getSubmissions(owner) {
  return fetch(`${Setting.ServerUrl}/api/get-submissions?owner=${owner}`, {
    method: "GET",
    credentials: "include"
  }).then(res => res.json());
}

export function getSubmission(owner, name) {
  return fetch(`${Setting.ServerUrl}/api/get-submission?id=${owner}/${encodeURIComponent(name)}`, {
    method: "GET",
    credentials: "include"
  }).then(res => res.json());
}

export function updateSubmission(owner, name, submission) {
  let newSubmission = Setting.deepCopy(submission);
  return fetch(`${Setting.ServerUrl}/api/update-submission?id=${owner}/${encodeURIComponent(name)}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newSubmission),
  }).then(res => res.json());
}

export function addSubmission(submission) {
  let newSubmission = Setting.deepCopy(submission);
  return fetch(`${Setting.ServerUrl}/api/add-submission`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newSubmission),
  }).then(res => res.json());
}

export function deleteSubmission(submission) {
  let newSubmission = Setting.deepCopy(submission);
  return fetch(`${Setting.ServerUrl}/api/delete-submission`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newSubmission),
  }).then(res => res.json());
}