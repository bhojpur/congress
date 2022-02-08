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
import {Carousel, Col, Row} from "antd";
import Conference from "./Conference";
import * as ConferenceBackend from "./backend/ConferenceBackend";
import * as Setting from "./Setting";
import * as Conf from "./Conf";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      conferenceName: Conf.DefaultConferenceName,
      conference: null,
    };
  }

  componentWillMount() {
    this.getConference();
  }

  getConference() {
    ConferenceBackend.getConference(Conf.DefaultOwner, this.state.conferenceName)
      .then((conference) => {
        this.setState({
          conference: conference,
        });
      });
  }

  renderCarousel(conference) {
    const contentStyle = {
      // height: '150px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };

    return (
      <Carousel autoplay>
        {
          conference.carousels.map((carousel, i) => {
            return (
              <div>
                <h3 style={contentStyle}>
                  <img alt={`carousel-${i}`} style={{width: '100%', height: '100%'}} src={carousel}/>
                </h3>
              </div>
            )
          })
        }
      </Carousel>
    )
  }

  renderHome() {
    if (this.state.conference === null) {
      return null;
    }

    return (
      <div>
        <div style={{marginBottom: '-8px'}}>
          {
            this.renderCarousel(this.state.conference)
          }
        </div>
        <Conference conference={this.state.conference} language={Setting.getLanguage()} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Row style={{width: "100%"}}>
          <Col span={!Setting.isMobile() ? 3 : 0}>
          </Col>
          <Col span={!Setting.isMobile() ? 18 : 24}>
            {
              this.renderHome()
            }
          </Col>
          <Col span={!Setting.isMobile() ? 3 : 0}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;