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
import * as Setting from "./Setting";
import { Menu} from "antd";
import { createFromIconfontCN } from '@ant-design/icons';
import './App.less';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2680620_ffij16fkwdg.js',
});

class SelectLanguageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Menu.Item key="en" style={{float: 'right', marginRight: '20px'}} icon={<IconFont type="icon-en" />}>
          <Link style={{color: "black"}} onClick={() => {
            Setting.changeLanguage("en");
          }}>
            English
          </Link>
        </Menu.Item>
        <Menu.Item key="zh" style={{float: 'right', marginRight: '20px'}} icon={<IconFont type="icon-zh" />}>
          <Link style={{color: "black"}} onClick={() => {
            Setting.changeLanguage("zh");
          }}>
            中文
          </Link>
        </Menu.Item>
      </React.Fragment>
    );
  }
}

export default SelectLanguageBox;