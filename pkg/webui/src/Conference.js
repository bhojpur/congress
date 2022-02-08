
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
import {Col, Empty, Menu, Row} from "antd";
import * as Setting from "./Setting";

const { SubMenu } = Menu;

class Conference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      selectedKey: this.props.conference.defaultItem,
    };
  }

  componentWillMount() {
  }

  handleClick = info => {
    const selectedKey = info.key;
    this.setState({
      selectedKey: selectedKey,
    });
  };

  renderMenu(treeItems) {
    let mode;
    if (!Setting.isMobile()) {
      mode = "vertical";
    } else {
      mode = "horizontal";
    }

    const theme = "light";
    // const theme = "dark";

    return (
      <Menu
        // style={{ width: 256 }}
        selectedKeys={[this.state.selectedKey]}
        defaultOpenKeys={['sub1']}
        mode={mode}
        theme={theme}
        className={"conferenceMenu"}
        style={{border: "1px solid rgb(240,240,240)"}}
        onClick={this.handleClick}
      >
        {
          treeItems.map((treeItem, i) => {
            // if (i === 0) {
            //   return null;
            // }

            if (treeItem.children.length === 0) {
              return (
                <Menu.Item key={treeItem.title}>
                  {this.props.language !== "en" ? treeItem.title : treeItem.titleEn}
                </Menu.Item>
              )
            } else {
              return (
                <SubMenu key={treeItem.title} title={this.props.language !== "en" ? treeItem.title : treeItem.titleEn}>
                  {
                    treeItem.children.map((treeItem2, i) => {
                      return (
                        <Menu.Item key={treeItem2.title}>
                          {this.props.language !== "en" ? treeItem2.title : treeItem2.titleEn}
                        </Menu.Item>
                      )
                    })
                  }
                </SubMenu>
              )
            }
          })
        }
        {/*<Menu.Item key="1" icon={<MailOutlined />}>*/}
        {/*  Introduction*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item key="1" icon={<MailOutlined />}>*/}
        {/*  Committees*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item key="1" icon={<MailOutlined />}>*/}
        {/*  Hosting Organizations*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item key="2" icon={<CalendarOutlined />}>*/}
        {/*  Navigation Two*/}
        {/*</Menu.Item>*/}
        {/*<SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">*/}
        {/*  <Menu.Item key="3">Option 3</Menu.Item>*/}
        {/*  <Menu.Item key="4">Option 4</Menu.Item>*/}
        {/*  <SubMenu key="sub1-2" title="Submenu">*/}
        {/*    <Menu.Item key="5">Option 5</Menu.Item>*/}
        {/*    <Menu.Item key="6">Option 6</Menu.Item>*/}
        {/*  </SubMenu>*/}
        {/*</SubMenu>*/}
        {/*<SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">*/}
        {/*  <Menu.Item key="7">Option 7</Menu.Item>*/}
        {/*  <Menu.Item key="8">Option 8</Menu.Item>*/}
        {/*  <Menu.Item key="9">Option 9</Menu.Item>*/}
        {/*  <Menu.Item key="10">Option 10</Menu.Item>*/}
        {/*</SubMenu>*/}
        {/*<Menu.Item key="link" icon={<LinkOutlined />}>*/}
        {/*  <a href="https://ant.design" target="_blank" rel="noopener noreferrer">*/}
        {/*    Ant Design*/}
        {/*  </a>*/}
        {/*</Menu.Item>*/}
      </Menu>
    )
  }

  getSelectedTreeItem(treeItems) {
    if (this.state.selectedKey === null) {
      return null;
    }

    const res = treeItems.map(treeItem => {
      if (treeItem.title === this.state.selectedKey) {
        return treeItem;
      } else {
        return this.getSelectedTreeItem(treeItem.children);
      }
    }).filter(treeItem => treeItem !== null);

    if (res.length > 0) {
      return res[0];
    } else {
      return null;
    }
  }

  renderPage(treeItem) {
    if (treeItem === undefined || treeItem === null) {
      return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )
    }

    return (
      <div>
        {/*<div style={{textAlign: "center", fontSize: "x-large"}}>*/}
        {/*  {*/}
        {/*    treeItem.title*/}
        {/*  }*/}
        {/*</div>*/}
        <div style={{marginTop: "40px"}} dangerouslySetInnerHTML={{ __html: this.props.language !== "en" ? treeItem.content : treeItem.contentEn }} />
      </div>
    )
  }

  render() {
    const conference = this.props.conference;

    if (!Setting.isMobile()) {
      return (
        <Row>
          <Col span={4} >
            {
              this.renderMenu(conference.treeItems)
            }
          </Col>
          <Col span={1} >
          </Col>
          <Col span={19} >
            {
              this.renderPage(this.getSelectedTreeItem(conference.treeItems))
            }
          </Col>
        </Row>
      )
    } else {
      return (
        <div>
          <Row>
            <Col span={24} >
              {
                this.renderMenu(conference.treeItems)
              }
            </Col>
          </Row>
          <Row>
            <Col span={1} />
            <Col span={22} >
              {
                this.renderPage(this.getSelectedTreeItem(conference.treeItems))
              }
            </Col>
            <Col span={1} />
          </Row>
        </div>
      )
    }
  }
}

export default Conference;