import React from 'react';
import SilverBarChart from '@economist/component-silver-barchart';
import SilverChartMargins from '@economist/component-silver-chartmargins';
export default class SilverChartWrapper extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      dimensions: React.PropTypes.object,
      duration: React.PropTypes.number,
      data: React.PropTypes.object,
      test: React.PropTypes.string,
      getSvg: React.PropTypes.bool,
      passSvg: React.PropTypes.func,
    };
  }
  // PROP TYPES ends

  // DEFAULT PROPS
  // *** DURATION must be set somewhere else and inherited... eventually ***
  static get defaultProps() {
    return {
      duration: 1000,
    };
  }
  // DEFAULT PROPS ends

  // GET BOUNDS
  // Calculates child component's d3 margins
  getBounds(dimensions) {
    const margins = this.props.data.margins;
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

  // RENDER
  render() {
    const config = this.props.data;
    // For now, duration of d3 transitions (not that there are any!) is defined here
    config.duration = this.props.duration;
    // D3 bounds are derived from the data.
    // *** this is actually a bit self-reflexive... reconsider...? ***
    config.bounds = this.getBounds(config.dimensions);
    // SVG request:
    const getSvg = this.props.getSvg;
    // Now: what style?
    let childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={this.props.passSvg}/>;
    switch (config.style) {
      case 'bars':
        childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={this.props.passSvg}/>;
        break;
      // Other styles to come...
      // Default is redundant, but linting requires init'ion AND a default case!
      default:
        childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={this.props.passSvg}/>;
    }

    // Embed whichever child component in the outer wrapper:
    return (
      <div className="d3-chart-outer-wrapper" style={config.dimensions}>
        <svg className="svg-wrapper" ref="svgwrapper">
          {childComponent}
          <SilverChartMargins/>
        </svg>
      </div>
    );
  }
  // RENDER ends
}
