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

import 'braft-editor/dist/index.css'
import React from "react";
import BraftEditor from "braft-editor";
import i18next from "i18next";

const fontFamilies = [
  { name: '宋体', family: 'SimSun' },
  { name: '黑体', family: 'SimHei' },
  { name: '微软雅黑', family: 'Microsoft YaHei , Helvetica, sans-serif' },
  { name: '楷体', family: 'KaiTi' },
  { name: '仿宋', family: 'FangSong' },
  { name: 'Arial', family: 'Arial, Helvetica, sans-serif' },
  { name: 'Times New Roman', family: 'Times-New-Roman' },
  { name: 'Georgia', family: 'Georgia, serif' },
  { name: 'Impact', family: 'Impact, serif' },
  { name: 'Monospace', family: '"Courier New", Courier, monospace' },
  { name: 'Tahoma', family: "tahoma, arial, 'Hiragino Sans GB', 宋体, sans-serif" },
];

class HtmlEditorBraft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      // font-family style lost:
      editorState: BraftEditor.createEditorState(this.props.text, { fontFamilies: fontFamilies }),
    };
  }

  updateText(text) {
    this.props.onUpdateText(text);
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
    });

    let text = editorState.toHTML();
    if (text.startsWith("<p>") && text.endsWith("</p>")) {
      text = text.slice(3, -4);
    }

    this.updateText(text);
  }

  render() {
    const controls = [
      'undo', 'redo', 'separator',
      'remove-styles', 'hr', 'separator',
      'bold', 'italic', 'underline', 'strike-through', 'superscript', 'subscript', 'separator',
      'headings', 'blockquote', 'code', 'list_ul', 'list_ol', 'separator',
      'link', 'text-color', 'line-height', 'letter-spacing', 'text-indent', 'separator',
      'font-size', 'font-family', 'text-align', 'separator',
      'media', 'emoji', 'clear', 'fullscreen',
    ];

    return (
      <div>
        <BraftEditor
          controls={controls}
          fontFamilies={fontFamilies}
          letterSpacings={[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 30, 40, 50]}
          value={this.state.editorState}
          media={{
            validateFn: (file) => {
              alert(i18next.t("conference:Local image upload is disallowed. Please go to \"Resources\" to upload images and paste the image URL to the text editor. You can choose \"Media\" -> left-bottom corner \"+Add network resource\", then paste the image URL into the box"));
              return false;
            }
          }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default HtmlEditorBraft;