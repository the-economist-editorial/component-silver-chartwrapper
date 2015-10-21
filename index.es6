import React from 'react';
import SilverBarChart from '@economist/component-silver-barchart';
export default class SilverChartWrapper extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      dimensions: React.PropTypes.object,
      duration: React.PropTypes.number,
      data: React.PropTypes.object,
      test: React.PropTypes.string,
      getSvg: React.PropTypes.bool,
    };
  }
  // PROP TYPES ends

  // DEFAULT PROPS
  static get defaultProps() {
    return {
      duration: 1000,
      getSvg: false,
    };
  }
  // DEFAULT PROPS ends

  // CONSTRUCTOR
  //    bind handleResize to this component
  //    set default state
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  // CONSTRUCTOR ends

  // COMPONENT DID MOUNT
  componentDidMount() {
  }
  // COMPONENT DID MOUNT ends

  // GET BOUNDS
  // Calculates child component's d3 margins
  getBounds(dimensions) {
    const margins = this.state.data.margins;
    // console.log(margins);
    const outerHeight = dimensions.height;
    const outerWidth = dimensions.width;
    const innerWidth = outerWidth - margins.left - margins.right;
    const innerHeight = outerHeight - margins.top - margins.bottom;
    return {
      'left': margins.left,
      'top': margins.top,
      'width': innerWidth,
      'height': innerHeight,
    };
  }
  // GET BOUNDS ends

  catchSvg(svgString) {
    console.log('Chartwrapper got ' + svgString + "... and remember to set the flag off again at the top");
  }


  // RENDER
  // While I'm doing the sneaky trick with the counter,
  // assemble the data object and throw it at the component
  render() {
    const config = this.state.data;
    // For now, duration of d3 transitions (not that there are any!) is defined here
    config.duration = this.props.duration;
    // D3 bounds are derived from the data.
    // *** this is actually a bit self-reflexive... reconsider...? ***
    config.bounds = this.getBounds(config.dimensions);
    // SVG request:
    const getSvg = this.props.getSvg;
    // Now: what style?
    let childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={this.catchSvg.bind(this)}/>;
    switch (config.style) {
      case 'bars':
        childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={this.catchSvg.bind(this)}/>;
        break;
      // Other styles to come...
      // Default is redundant, but linting requires init'ion AND a default case!
      default:
        childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={this.catchSvg.bind(this)}/>;
        break;
    }

    // Embed whichever child component in the outer wrapper:
    return (
      <div className="d3-chart-outer-wrapper" style={config.dimensions}>
        {childComponent}
      </div>
    );
  }
  // RENDER ends
}
