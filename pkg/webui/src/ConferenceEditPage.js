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
import {Button, Card, Col, DatePicker, Input, Row, Select} from 'antd';
import * as ConferenceBackend from "./backend/ConferenceBackend";
import * as Setting from "./Setting";
import moment from "moment";
import Conference from "./Conference";
import ConferenceEdit from "./ConferenceEdit";
import i18next from "i18next";

const { Option } = Select;

class ConferenceEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      conferenceName: props.match.params.conferenceName,
      conference: null,
    };
  }

  componentWillMount() {
    this.getConference();
  }

  getConference() {
    ConferenceBackend.getConference(this.props.account.name, this.state.conferenceName)
      .then((conference) => {
        this.setState({
          conference: conference,
        });
      });
  }

  parseConferenceField(key, value) {
    if (["score"].includes(key)) {
      value = Setting.myParseInt(value);
    }
    return value;
  }

  updateConferenceField(key, value) {
    value = this.parseConferenceField(key, value);

    let conference = this.state.conference;
    conference[key] = value;
    this.setState({
      conference: conference,
    });
  }

  renderConference() {
    return (
      <Card size="small" title={
        <div>
          {i18next.t("token:Edit Conference")}&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={this.submitConferenceEdit.bind(this)}>{i18next.t("general:Save")}</Button>
        </div>
      } style={{marginLeft: '5px'}} type="inner">
        <Row style={{marginTop: '10px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("general:Name")}:
          </Col>
          <Col span={22} >
            <Input value={this.state.conference.name} onChange={e => {
              this.updateConferenceField('name', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Start date")}:
          </Col>
          <Col span={5} >
            <DatePicker defaultValue={moment(this.state.conference.startDate, "YYYY-MM-DD")} onChange={(time, timeString) => {
              this.updateConferenceField('startDate', timeString);
            }} />
          </Col>
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:End date")}:
          </Col>
          <Col span={10} >
            <DatePicker defaultValue={moment(this.state.conference.endDate, "YYYY-MM-DD")} onChange={(time, timeString) => {
              this.updateConferenceField('endDate', timeString);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Full name")}:
          </Col>
          <Col span={22} >
            <Input value={this.state.conference.fullName} onChange={e => {
              this.updateConferenceField('fullName', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Organizer")}:
          </Col>
          <Col span={22} >
            <Input value={this.state.conference.organizer} onChange={e => {
              this.updateConferenceField('organizer', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Location")}:
          </Col>
          <Col span={22} >
            <Input value={this.state.conference.location} onChange={e => {
              this.updateConferenceField('location', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Address")}:
          </Col>
          <Col span={22} >
            <Input value={this.state.conference.address} onChange={e => {
              this.updateConferenceField('address', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("general:Status")}:
          </Col>
          <Col span={22} >
            <Select virtual={false} style={{width: '100%'}} value={this.state.conference.status} onChange={(value => {this.updateConferenceField('status', value);})}>
              {
                [
                  {id: 'Public', name: 'Public (Everyone can see it)'},
                  {id: 'Hidden', name: 'Hidden (Only yourself can see it)'},
                ].map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Carousels")}:
          </Col>
          <Col span={22} >
            <Select virtual={false} mode="tags" style={{width: '100%'}} placeholder="Please input"
                    value={this.state.conference.carousels}
                    onChange={value => {
                      this.updateConferenceField('carousels', value);
                    }}
            >
              {
                this.state.conference.carousels.map((carousel, index) => <Option key={carousel}>{carousel}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Introduction text")}:
          </Col>
          <Col span={22} >
            <Input value={this.state.conference.introText} onChange={e => {
              this.updateConferenceField('introText', e.target.value);
            }} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Default item")}:
          </Col>
          <Col span={22} >
            <Select virtual={false} style={{width: '100%'}} value={this.state.conference.defaultItem} onChange={value => {this.updateConferenceField('defaultItem', value);}}>
              {
                this.state.conference.treeItems.filter(treeItem => treeItem.children.length === 0).map((treeItem, index) => <Option key={treeItem.title}>{`${treeItem.title} | ${treeItem.titleEn}`}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Language")}:
          </Col>
          <Col span={22} >
            <Select virtual={false} style={{width: '100%'}} value={this.state.conference.language} onChange={(value => {this.updateConferenceField('language', value);})}>
              {
                [
                  {id: 'zh', name: 'zh'},
                  {id: 'en', name: 'en'},
                ].map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)
              }
            </Select>
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("conference:Menu")}:
          </Col>
          <Col span={22} >
            <ConferenceEdit conference={this.state.conference} language={this.state.conference.language} onUpdateTreeItems={(value) => { this.updateConferenceField('treeItems', value)}} />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}} >
          <Col style={{marginTop: '5px'}} span={2}>
            {i18next.t("general:Preview")}:
          </Col>
          <Col span={22} >
            <Conference conference={this.state.conference} language={this.state.conference.language} />
          </Col>
        </Row>
      </Card>
    )
  }

  submitConferenceEdit() {
    let conference = Setting.deepCopy(this.state.conference);
    ConferenceBackend.updateConference(this.state.conference.owner, this.state.conferenceName, conference)
      .then((res) => {
        if (res) {
          Setting.showMessage("success", `Successfully saved`);
          this.setState({
            conferenceName: this.state.conference.name,
          });
          this.props.history.push(`/conferences/${this.state.conference.name}`);
        } else {
          Setting.showMessage("error", `failed to save: server side failure`);
          this.updateConferenceField('name', this.state.conferenceName);
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
              this.state.conference !== null ? this.renderConference() : null
            }
          </Col>
          <Col span={1}>
          </Col>
        </Row>
        <Row style={{margin: 10}}>
          <Col span={2}>
          </Col>
          <Col span={18}>
            <Button type="primary" size="large" onClick={this.submitConferenceEdit.bind(this)}>{i18next.t("general:Save")}</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ConferenceEditPage;