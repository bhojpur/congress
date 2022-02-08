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

import React from "react";
import {Button, Card, Col, Input, Row, Select} from 'antd';
import * as SubmissionBackend from "./backend/SubmissionBackend";
import * as ConferenceBackend from "./backend/ConferenceBackend";
import * as Setting from "./Setting";
import UploadFile from "./UploadFile";
import i18next from "i18next";

const { Option } = Select;

class SubmissionEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      submissionName: props.match.params.submissionName,
      submission: null,
      conferences: [],
    };
  }

  componentWillMount() {
    this.getSubmission();
    this.getGlobalConferences();
  }

  getGlobalConferences() {
    ConferenceBackend.getGlobalConferences()
      .then(res => {
        this.setState({
          conferences: res,
        });
      });
  }

  getSubmission() {
    SubmissionBackend.getSubmission(this.props.account.name, this.state.submissionName)
      .then((submission) => {
        this.setState({
          submission: submission,
        });
      });
  }

  parseSubmissionField(key, value) {
    if (["score"].includes(key)) {
      value = Setting.myParseInt(value);
    }
    return value;
  }

  updateSubmissionField(key, value) {
    value = this.parseSubmissionField(key, value);

    let submission = this.state.submission;
    submission[key] = value;
    this.setState({
      submission: submission,
    });
  }

  renderSubmission() {
    return (
      <Card size="small" title={
        <div>
          {i18next.t("token:Edit Submission")}&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.submitSubmissionEdit.bind(this)}>{i18next.t("general:Save")}</Button>
        </div>
      } style={{marginLeft: '5px'}} type="inner">
        <Row style={{marginTop: '10px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("general:Name")}:
          </Col>
          <Col span={22} >
            <Input value={this.state.submission.name} onChange={e => {
              this.updateSubmissionField('name', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("submission:Conference")}:
          </Col>
          <Col span={22} >
            <Select virtual={false} style={{width: '100%'}} value={this.state.submission.conference} onChange={(value => {this.updateSubmissionField('conference', value);})}>
              {
                this.state.conferences.map((conference, index) => <Option key={index} value={conference.name}>{conference.name}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("submission:Title")}:
          </Col>
          <Col span={22} >
            <Input value={this.state.submission.title} onChange={e => {
              this.updateSubmissionField('title', e.target.value);
            }} />
          </Col>
        </Row>
        {/*<Row style={{marginTop: '20px'}} >*/}
        {/*  <Col style={{marginTop: '5px'}} span={2}>*/}
        {/*    Word file:*/}
        {/*  </Col>*/}
        {/*  <Col span={22} >*/}
        {/*    <Input prefix={<LinkOutlined/>} value={this.state.submission.wordFileUrl} onChange={e => {*/}
        {/*      this.updateSubmissionField('wordFileUrl', e.target.value);*/}
        {/*    }} />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*<Row style={{marginTop: '20px'}} >*/}
        {/*  <Col style={{marginTop: '5px'}} span={2}>*/}
        {/*    PDF file:*/}
        {/*  </Col>*/}
        {/*  <Col span={22} >*/}
        {/*    <Input prefix={<LinkOutlined/>} value={this.state.submission.pdfFileUrl} onChange={e => {*/}
        {/*      this.updateSubmissionField('pdfFileUrl', e.target.value);*/}
        {/*    }} />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("submission:Type")}:
          </Col>
          <Col span={22} >
            <Select virtual={false} style={{width: '100%'}} value={this.state.submission.type} onChange={(value => {
              this.updateSubmissionField('type', value);
              if (this.state.submission.type === "Oral") {
                this.updateSubmissionField('subType', "Default");
              } else {
                this.updateSubmissionField('subType', "Default");
              }
            })}>
              {
                [
                  {id: 'Symposium', name: 'Symposium'},
                  {id: 'Workshop', name: 'Workshop'},
                  {id: 'Oral', name: 'Oral'},
                  {id: 'Poster', name: 'Poster'},
                ].map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("submission:Sub type")}:
          </Col>
          <Col span={22} >
            <Select virtual={false} style={{width: '100%'}} value={this.state.submission.subType} onChange={(value => {this.updateSubmissionField('subType', value);})}>
              {
                (this.state.submission.type !== "Oral" ? [
                  {id: 'Default', name: 'Default'},
                ] : [
                  {id: 'Default', name: 'Default'},
                ]).map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("submission:File upload")}:
          </Col>
          <Col style={{marginRight: '10px'}} span={6} >
            <UploadFile fileUrl={this.state.submission.wordFileUrl} urlKey={"wordFileUrl"} label={"Word (.docx)"} accept={".docx"} onUpdateSubmission={(key, value) => { return this.updateSubmissionField(key, value)}} />
          </Col>
          <Col span={6} >
            <UploadFile fileUrl={this.state.submission.pdfFileUrl} urlKey={"pdfFileUrl"}  label={"PDF (.pdf)"} accept={".pdf"} onUpdateSubmission={(key, value) => { return this.updateSubmissionField(key, value)}} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("general:Status")}:
          </Col>
          <Col span={22} >
            <Select virtual={false} style={{width: '100%'}} value={this.state.submission.status} onChange={(value => {this.updateSubmissionField('status', value);})}>
              {
                [
                  {id: 'Draft', name: 'Draft (Only yourself can see it, you can still update the draft later)'},
                  {id: 'ReadyForReview', name: 'Ready for review'},
                ].map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)
              }
            </Select>
          </Col>
        </Row>
      </Card>
    )
  }

  submitSubmissionEdit() {
    let submission = Setting.deepCopy(this.state.submission);
    SubmissionBackend.updateSubmission(this.state.submission.owner, this.state.submissionName, submission)
      .then((res) => {
        if (res) {
          Setting.showMessage("success", `Successfully saved`);
          this.setState({
            submissionName: this.state.submission.name,
          });
          this.props.history.push(`/submissions/${this.state.submission.name}`);
        } else {
          Setting.showMessage("error", `failed to save: server side failure`);
          this.updateSubmissionField('name', this.state.submissionName);
        }
      })
      .catch(error => {
        Setting.showMessage("error", `failed to save: ${error}`);
      });
  }

  render() {
    return (
      <div>
        <Row style={{width: "100%"}}>
          <Col span={1}>
          </Col>
          <Col span={22}>
            {
              this.state.submission !== null ? this.renderSubmission() : null
            }
          </Col>
          <Col span={1}>
          </Col>
        </Row>
        <Row style={{margin: 10}}>
          <Col span={2}>
          </Col>
          <Col span={18}>
            <Button type="primary" size="large" onClick={this.submitSubmissionEdit.bind(this)}>{i18next.t("general:Save")}</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SubmissionEditPage;