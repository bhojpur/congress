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
import {Link} from "react-router-dom";
import {Button, Col, Popconfirm, Row, Table} from 'antd';
import moment from "moment";
import * as Setting from "./Setting";
import * as ConferenceBackend from "./backend/ConferenceBackend";
import i18next from "i18next";

class ConferenceListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      conferences: null,
    };
  }

  componentWillMount() {
    this.getConferences();
  }

  getConferences() {
    ConferenceBackend.getConferences(this.props.account.name)
      .then((res) => {
        this.setState({
          conferences: res,
        });
      });
  }

  newConference() {
    return {
      owner: this.props.account.name,
      name: `conference_${this.state.conferences.length}`,
      createdTime: moment().format(),
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      fullName: `Conference ${this.state.conferences.length}`,
      organizer: "Bhojpur Consulting",
      location: "Arrah, Bihar, India",
      address: "Nirbhaya Dihra, Basauri, Piro",
      status: "Public",
      language: "en",
      carousels: [],
      introText: "Introduction..",
      defaultItem: "Home",
      treeItems: [{key: "Home", title: "首页", titleEn: "Home", content: "内容", contentEn: "Content", children: []}],
    }
  }

  addConference() {
    const newConference = this.newConference();
    ConferenceBackend.addConference(newConference)
      .then((res) => {
          Setting.showMessage("success", `Conference added successfully`);
          this.setState({
            conferences: Setting.prependRow(this.state.conferences, newConference),
          });
        }
      )
      .catch(error => {
        Setting.showMessage("error", `Conference failed to add: ${error}`);
      });
  }

  deleteConference(i) {
    ConferenceBackend.deleteConference(this.state.conferences[i])
      .then((res) => {
          Setting.showMessage("success", `Conference deleted successfully`);
          this.setState({
            conferences: Setting.deleteRow(this.state.conferences, i),
          });
        }
      )
      .catch(error => {
        Setting.showMessage("error", `Conference failed to delete: ${error}`);
      });
  }

  renderTable(conferences) {
    const columns = [
      {
        title: i18next.t("general:Name"),
        dataIndex: 'name',
        key: 'name',
        width: '120px',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text, record, index) => {
          return (
            <Link to={`/conferences/${text}`}>
              {text}
            </Link>
          )
        }
      },
      {
        title: i18next.t("conference:Start date"),
        dataIndex: 'startDate',
        key: 'startDate',
        width: '70px',
        sorter: (a, b) => a.startDate.localeCompare(b.startDate),
        render: (text, record, index) => {
          return Setting.getFormattedDate(text);
        }
      },
      {
        title: i18next.t("conference:End date"),
        dataIndex: 'endDate',
        key: 'endDate',
        width: '70px',
        sorter: (a, b) => a.endDate.localeCompare(b.endDate),
        render: (text, record, index) => {
          return Setting.getFormattedDate(text);
        }
      },
      {
        title: i18next.t("conference:Full name"),
        dataIndex: 'fullName',
        key: 'fullName',
        width: '200px',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      },
      {
        title: i18next.t("conference:Organizer"),
        dataIndex: 'organizer',
        key: 'organizer',
        width: '120px',
        sorter: (a, b) => a.organizer.localeCompare(b.organizer),
      },
      {
        title: i18next.t("conference:Location"),
        dataIndex: 'location',
        key: 'location',
        width: '120px',
        sorter: (a, b) => a.location.localeCompare(b.location),
      },
      {
        title: i18next.t("conference:Address"),
        dataIndex: 'address',
        key: 'address',
        width: '120px',
        sorter: (a, b) => a.address.localeCompare(b.address),
      },
      {
        title: i18next.t("general:Status"),
        dataIndex: 'status',
        key: 'status',
        width: '80px',
        sorter: (a, b) => a.status.localeCompare(b.status),
      },
      {
        title: i18next.t("general:Action"),
        dataIndex: 'action',
        key: 'action',
        width: '120px',
        render: (text, record, index) => {
          return (
            <div>
              <Button style={{marginTop: '10px', marginBottom: '10px', marginRight: '10px'}} type="primary" onClick={() => this.props.history.push(`/conferences/${record.name}`)}>{i18next.t("general:Edit")}</Button>
              <Popconfirm
                title={`Sure to delete conference: ${record.name} ?`}
                onConfirm={() => this.deleteConference(index)}
                okText="OK"
                cancelText="Cancel"
              >
                <Button style={{marginBottom: '10px'}} type="danger">{i18next.t("general:Delete")}</Button>
              </Popconfirm>
            </div>
          )
        }
      },
    ];

    return (
      <div>
        <Table columns={columns} dataSource={conferences} rowKey="name" size="middle" bordered pagination={{pageSize: 100}}
               title={() => (
                 <div>
                   {i18next.t("general:Conferences")}&nbsp;&nbsp;&nbsp;&nbsp;
                   <Button type="primary" size="small" onClick={this.addConference.bind(this)}>{i18next.t("general:Add")}</Button>
                 </div>
               )}
               loading={conferences === null}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Row style={{width: "100%"}}>
          <Col span={1}>
          </Col>
          <Col span={22}>
            {
              this.renderTable(this.state.conferences)
            }
          </Col>
          <Col span={1}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ConferenceListPage;