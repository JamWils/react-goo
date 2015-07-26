import React from 'react/addons';
import {Spring} from 'react-motion';

let GooFilter = React.createClass({
    render() {
        return (
            <svg width="10" height="10">
                <defs>
                    <filter id="goo" dangerouslySetInnerHTML={{__html:"<feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"10\" result=\"blur\" /><feColorMatrix in=\"blur\" mode=\"matrix\" values=\"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9\" result=\"goo\" /><feComposite in=\"SourceGraphic\" in2=\"goo\" operator=\"atop\"/>"}}>
                    </filter>
                </defs>
            </svg>
        );
    }
});

let SVGElements = React.createClass({
    getInitialState() {
      return {open: false};
    },

    handleMouseDown() {
      this.setState({open: !this.state.open});
    },

    render() {
        let cx = 50;
        let cy = 50;
        let fillColor = "blue";
        let subRadius = 20;
        let config = [320, 12];

        return (
            <div>
            <button onMouseDown={this.handleMouseDown}>Toggle</button>
            <svg width="500" height="500">
                <g style={{filter: "url(#goo)"}}>
                    <Spring endValue={{
                        orthoginal: {val: this.state.open ? 70 : 0, config: config},
                         diagonal: {val: this.state.open ? 55 : 0, config: config},
                         radius: {val: this.state.open ? .67 : 1, config: config}
                     }}>
                      {interpolated => {
                        return(
                            <g>
                            <circle cx={cx} cy={cy} r="30" fill={fillColor} transform={"scale(" + interpolated.radius.val + ")"}></circle>
                            <circle cx={cx} cy={cy} r={subRadius} fill={fillColor} transform={"translate(" + interpolated.orthoginal.val + ", 0)"}></circle>
                            <circle cx={cx} cy={cy} r={subRadius} fill={fillColor} transform={"translate(" + interpolated.diagonal.val + ", " + interpolated.diagonal.val +")"}></circle>
                            <circle cx={cx} cy={cy} r={subRadius} fill={fillColor} transform={"translate(0, " + interpolated.orthoginal.val + ")"}></circle>
                            </g>
                        );
                    }}
                    </Spring>
                </g>
            </svg>
            </div>
        );
    }
});

export default class App extends React.Component {
  render() {
    console.log("Hello");
    return (
      <div>
        <SVGElements />
        <GooFilter />
      </div>
    );
  }
}
