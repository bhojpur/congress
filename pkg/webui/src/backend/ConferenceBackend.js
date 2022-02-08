
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

export function getGlobalConferences() {
  return fetch(`${Setting.ServerUrl}/api/get-global-conferences`, {
    method: "GET",
    credentials: "include"
  }).then(res => res.json());
}

export function getConferences(owner) {
  return fetch(`${Setting.ServerUrl}/api/get-conferences?owner=${owner}`, {
    method: "GET",
    credentials: "include"
  }).then(res => res.json());
}

export function getConference(owner, name) {
  return fetch(`${Setting.ServerUrl}/api/get-conference?id=${owner}/${encodeURIComponent(name)}`, {
    method: "GET",
    credentials: "include"
  }).then(res => res.json());
}

export function updateConference(owner, name, conference) {
  let newConference = Setting.deepCopy(conference);
  return fetch(`${Setting.ServerUrl}/api/update-conference?id=${owner}/${encodeURIComponent(name)}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newConference),
  }).then(res => res.json());
}

export function addConference(conference) {
  let newConference = Setting.deepCopy(conference);
  return fetch(`${Setting.ServerUrl}/api/add-conference`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newConference),
  }).then(res => res.json());
}

export function deleteConference(conference) {
  let newConference = Setting.deepCopy(conference);
  return fetch(`${Setting.ServerUrl}/api/delete-conference`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newConference),
  }).then(res => res.json());
}