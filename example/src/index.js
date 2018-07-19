'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactTooltip from '../../src'

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: 'top',
      type: 'dark',
      effect: 'float',
      condition: false
    }
  }

  changePlace (place) {
    this.setState({
      place: place
    })
  }

  changeType (type) {
    this.setState({
      type: type
    })
  }

  changeEffect (effect) {
    this.setState({
      effect: effect
    })
  }

  _onClick () {
    this.setState({
      condition: true
    })
  }

  render () {
    let { place, type, effect } = this.state
    return (
      <div>
        <section className='tooltip-example'>
          <h4 className='title'>React Tooltip</h4>
          <div className='demonstration'>
            <a data-for='main' data-tip="Hello<br />multiline<br />tooltip" data-iscapture="true">
               ◕‿‿◕
            </a>
          </div>
          <div className='control-panel'>
            <div className='button-group'>
              <div className='item'>
                <p>Place</p>
                <a className={place === 'top' ? 'active' : ''} onClick={this.changePlace.bind(this, 'top')}>Top<span className='mark'>(default)</span></a>
                <a className={place === 'right' ? 'active' : ''} onClick={this.changePlace.bind(this, 'right')}>Right</a>
                <a className={place === 'bottom' ? 'active' : ''} onClick={this.changePlace.bind(this, 'bottom')}>Bottom</a>
                <a className={place === 'left' ? 'active' : ''} onClick={this.changePlace.bind(this, 'left')}>Left</a>
              </div>
              <div className='item'>
                <p>Type</p>
                <a className={type === 'dark' ? 'active' : ''} onClick={this.changeType.bind(this, 'dark')}>Dark<span className='mark'>(default)</span></a>
                <a className={type === 'success' ? 'active' : ''} onClick={this.changeType.bind(this, 'success')}>Success</a>
                <a className={type === 'warning' ? 'active' : ''} onClick={this.changeType.bind(this, 'warning')}>Warning</a>
                <a className={type === 'error' ? 'active' : ''} onClick={this.changeType.bind(this, 'error')}>Error</a>
                <a className={type === 'info' ? 'active' : ''} onClick={this.changeType.bind(this, 'info')}>Info</a>
                <a className={type === 'light' ? 'active' : ''} onClick={this.changeType.bind(this, 'light')}>Light</a>
              </div>
              <div className='item'>
                <p>Effect</p>
                <a className={effect === 'float' ? 'active' : ''} onClick={this.changeEffect.bind(this, 'float')}>Float<span className='mark'>(default)</span></a>
                <a className={effect === 'solid' ? 'active' : ''} onClick={this.changeEffect.bind(this, 'solid')}>Solid</a>
              </div>
            </div>
            <pre>
              <div>
                <p className='label'>Code</p>
                <hr></hr>
                <p>{'<a data-tip="React-tooltip"> ◕‿‿◕ </a>'}</p>
                <p>{'<ReactTooltip place="' + place + '" type="' + type + '" effect="' + effect + '"/>'}</p>
              </div>
            </pre>
          </div>
          <ReactTooltip id='main' place={place} type={type} effect={effect} multiline={true}/>
        </section>
        <section className="advance">
          <div className="section">
            <h4 className='title'>Advance features</h4>
            <p className="sub-title">Use everything as tooltip</p>

            <div className="example-jsx">
              <div className="side"  style={{ transform: 'translate3d(5px, 5px, 5px)' }}>
                <a data-tip data-for='happyFace'> d(`･∀･)b </a>
                <ReactTooltip id='happyFace' type="error"><span>Show happy face</span></ReactTooltip>
              </div>
              <div className="side">
                <a data-tip data-for='sadFace'> இдஇ </a>
                <ReactTooltip id='sadFace' type="warning" effect="solid"><span>Show sad face</span></ReactTooltip>
              </div>
            </div>
            <br />
            <pre className='example-pre'>
              <div>
                <p>{"<a data-tip data-for='happyFace'> d(`･∀･)b </a>\n" +
                "<ReactTooltip id='happyFace' type='error'>\n" +
                  " " + " " + "<span>Show happy face</span>\n" +
                "</ReactTooltip>\n" +
                "<a data-tip data-for='sadFace'> இдஇ </a>\n" +
                "<ReactTooltip id='sadFace' type='warning' effect='solid'>\n" +
                  " " + " " + "<span>Show sad face</span>\n" +
                "</ReactTooltip>"}</p>
              </div>
            </pre>
            <div className="example-jsx">
              <div className="side"><a data-tip data-for='global'> σ`∀´)σ </a></div>
              <div className="side"><a data-tip data-for='global'> (〃∀〃) </a></div>
              <ReactTooltip id='global' aria-haspopup="true" role="example">
                <p>This is a global react component tooltip</p>
                <p>You can put every thing here</p>
                <ul>
                  <li>Word</li>
                  <li>Chart</li>
                  <li>Else</li>
                </ul>
              </ReactTooltip>
            </div>
            <pre className='example-pre'>
              <div>
                <p>{"<a data-tip data-for='global'> σ`∀´)σ </a>\n" +
                  "<a data-tip data-for='global'> (〃∀〃) </a>\n" +
                  "<ReactTooltip id='global' aria-haspopup='true' role='example'>\n" +
                    " <p>This is a global react component tooltip</p>\n" +
                    " <p>You can put every thing here</p>\n" +
                    " <ul>\n" +
                      " " + " " + " <li>Word</li>\n" +
                      " " + " " + " <li>Chart</li>\n" +
                      " " + " " + " <li>Else</li>\n" +
                    " </ul>\n" +
                  "</ReactTooltip>"}</p>
              </div>
            </pre>
          </div>
        </section>
        <section className="advance">
          <div className="section">
            <h4 className='title'>Custom event</h4>
            <p className="sub-title"></p>
            <div className="example-jsx">
              <div className="side">
                <a data-for='custom-event' data-tip='custom show' data-event='click focus'>( •̀д•́)</a>
                <ReactTooltip id='custom-event' globalEventOff='click' />
              </div>
              <div className="side">
                <a data-for='custom-off-event' ref='target' data-tip='custom show and hide' data-event='click' data-event-off='dblclick'>( •̀д•́)</a>
                <ReactTooltip id='custom-off-event'/>
                {/*
                  <div>
                    <button onClick={() => { ReactTooltip.show(ReactDOM.findDOMNode(this.refs.target)) }}>Show toolip</button>
                    <button onClick={() => { ReactTooltip.hide(ReactDOM.findDOMNode(this.refs.target)) }}>Hide toolip</button>
                  </div>
                */}
              </div>
            </div>
            <br />
            <pre className='example-pre'>
              <div>
                <p>{"<a data-tip='custom show' data-event='click focus'>( •̀д•́)</a>\n" +
                "<ReactTooltip globalEventOff='click' />"}</p>
              </div>
              <div>
                <p>{"<a data-tip='custom show and hide' data-event='click' data-event-off='dblclick'>( •̀д•́)</a>\n" +
                "<ReactTooltip/>"}</p>
              </div>
            </pre>
          </div>
          <div className="section">
            <h4 className='title'>Theme and delay</h4>
            <p className="sub-title"></p>
            <div className="example-jsx">
              <div className="side">
                <a data-for='custom-class' data-tip='hover on me will keep the tooltip'>(･ω´･ )</a>
                {/* <a data-for='custom-class' data-tip='' data-tip-disable='true'>empty testing</a> */}
                <ReactTooltip id='custom-class' className='extraClass' delayHide={1000} effect='solid'/>
              </div>
              <div className="side">
                <a data-for='custom-theme' data-tip='custom theme'>(･ω´･ )</a>
                <ReactTooltip id='custom-theme' className='customeTheme'/>
              </div>
            </div>
            <br />
            <pre className='example-pre'>
              <div>
                <p>{"<a data-tip='hover on me will keep the tooltip'>(･ω´･ )́)</a>\n" +
                "<ReactTooltip className='extraClass' delayHide={1000} effect='solid'/>\n" +
                ".extraClass {\n" +
                  " font-size: 20px !important;\n" +
                  " pointer-events: auto !important;\n" +
                  " &:hover {\n" +
                    "visibility: visible !important;\n" +
                    "opacity: 1 !important;\n" +
                  " }\n" +
                "}"}</p>
              </div>
              <div>
                <p>{"<a data-tip='custom theme'>(･ω´･ )́)</a>\n" +
                "<ReactTooltip className='customeTheme'/>\n" +
                " .customeTheme {\n" +
                  " color: #ff6e00 !important;\n" +
                  " background-color: orange !important;\n" +
                  " &.place-top {\n" +
                    " &:after {\n" +
                      " border-top-color: orange !important;\n" +
                      " border-top-style: solid !important;\n" +
                      " border-top-width: 6px !important;\n" +
                    " }\n" +
                  " }\n" +
                "}"}</p>
              </div>
            </pre>
          </div>
          <div className="section">
            <h4 className='title'>Update tip content over time</h4>
            <p className="sub-title"></p>
            <div className="example-jsx">
              <div className="side">
                <a data-for='getContent' data-tip>=( •̀д•́)</a>
                <ReactTooltip id='getContent' getContent={() => Math.floor(Math.random() * 100)}/>
              </div>
              <div className="side">
                <a data-for='overTime' data-tip>=( •̀д•́)</a>
                <ReactTooltip id='overTime'
                  getContent={[() => {return 'Random length content'.slice(0, Math.floor(Math.random() * 21) + 1)}, 1000]}/>
              </div>
            </div>
            <br />
            <pre className='example-pre'>
              <div>
                <p>{"<a data-for='getContent' data-tip>=( •̀д•́)</a>\n" +
                "<ReactTooltip id='getContent' getContent={() => Math.floor(Math.random() * 100)} />"}</p>
              </div>
              <div>
                <p>{"<a data-for='overTime' data-tip>=( •̀д•́)</a>\naaaa" +
                "<ReactTooltip id='overTime' getContent={[() => {\n" +
                " return 'Random length content'.slice(0, Math.floor(Math.random() * 21) + 1)\n" +
                "}, 1000]}/>"}</p>
              </div>
            </pre>
          </div>
          <div className="section">
            <h4 className='title'>Compute or enrich tip content</h4>
            <p className="sub-title"></p>
            <div className="example-jsx">
              <div className="side">
                <a data-for='enrich' data-tip='sooooo cute'>(❂‿❂)</a>
              </div>
              <div className="side">
                <a data-for='enrich' data-tip='really high'>(❂‿❂)</a>
              </div>
              <ReactTooltip id='enrich' getContent={(dataTip) => `This little buddy is ${dataTip}`}/>
            </div>
            <br />
            <pre className='example-pre'>
              <div>
                <p>{"<a data-for='enrich' data-tip='sooooo cute'>(❂‿❂)</a>\n" +
                "<a data-for='enrich' data-tip='really high'>(❂‿❂)</a>\n" + 
                "<ReactTooltip id='enrich' getContent={(dataTip) => `This little buddy is ${dataTip}`}/>"}</p>
              </div>
            </pre>
          </div>
          <div className="section">
            <h4 className='title'>Test Scrolling</h4>
            <p className="sub-title"></p>
            <div className="example-jsx"  style={{ height: '200px' }}>
              <div className="side" style={{ overflow: 'auto', height: '200px' }}>
                <div data-for='scrollContent' data-tip data-iscapture='true' style={{ width: '5000px', height: '5000px' }}>
                  Scroll me with the mouse wheel.<br/>
                  The tooltip will hide.<br/>
                  Make sure you set data-iscapture="true"
                </div>
                <ReactTooltip id='scrollContent' getContent={() => Math.floor(Math.random() * 100)}/>
              </div>
              <div className="side" style={{ overflow: 'auto', height: '200px' }}>
                <div data-for='scrollTime' data-tip data-iscapture='true' data-scroll-hide='false' style={{ width: '5000px', height: '5000px' }}>
                  Scroll me with the mouse wheel.<br/>
                  The tooltip will stay visible.
                </div>
                <ReactTooltip id='scrollTime'
                  getContent={[() => {return new Date().toISOString()}, 1000]}/>
              </div>
            </div>
            <br />
            <pre className='example-pre'>
              <div>
                <p>{"<div data-for='scrollContent' data-tip data-iscapture='true'\n style={{ width: '5000px', height: '5000px' }}>...</div>\n" +
                "<ReactTooltip id='scrollContent' getContent={() => Math.floor(Math.random() * 100)}/>"}</p>
              </div>
              <div>
                <p>{"<div data-for='scrollTime' data-tip data-iscapture='true' data-scroll-hide='false'\n style={{ width: '5000px', height: '5000px' }}>...</div>\n" +
                "<ReactTooltip id='scrollTime' getContent={[() => {return new Date().toISOString()}, 1000]}/>"}</p>
              </div>
            </pre>
          </div>
          <div className="section">
            <h4 className='title'>Test SVG</h4>
            <p className="sub-title"></p>
            <div className="example-jsx">
              <div className="side">
                <svg data-tip="=( •̀д•́)" data-for="svgTooltip" width="50" height="50">
                  <circle cx="25" cy="25" r="22" fill="#fff" stroke="#000" strokeWidth="4"/>
                </svg>
                <ReactTooltip id='svgTooltip'/>
              </div>
            </div>
            <br/>
            <pre className='example-pre'>
               <div>
                 <p>{"<svg data-tip='=( •̀д•́)' data-for='svgTooltip' width='50' height='50'>\n" +
                 "  <circle cx='25' cy='25' r='22' fill='#fff' stroke='#000' strokeWidth='8'/>\n" +
                 "</svg>\n" +
                 "<ReactTooltip id='svgTooltip' />"}</p>
               </div>
             </pre>
          </div>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('main'))
