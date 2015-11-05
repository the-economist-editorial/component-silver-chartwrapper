import React from 'react';
import SilverBarChart from '@economist/component-silver-barchart';
export default class SilverChartWrapper extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      duration: React.PropTypes.number,
      config: React.PropTypes.object,
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
      getSvg: false,
    };
  }
  // DEFAULT PROPS ends

  // Deleted here

  // GET BOUNDS
  // Calculates child component's d3 margins
  getBounds(dimensions) {
    const margins = this.props.config.margins;
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
    // Clone config (ESLint errors this)
    const config = { ...this.props.config };
    // For now, duration of d3 transitions is defined here
    config.duration = this.props.duration;
    // D3 bounds are derived from config.
    // *** this is actually a bit self-reflexive... reconsider...? ***
    config.bounds = this.getBounds(config.dimensions);
    // SVG request: flag and callback
    const getSvg = this.props.getSvg;
    const passSvg = this.props.passSvg;
    // Now: what style? Bar chart is default... for now at least...
    let childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={passSvg}/>;
    switch (config.style) {
      case 'bars':
        childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={passSvg}/>;
        break;
      // Other styles to come...
      // Default is redundant, but linter insists upon init'ion AND a default case!
      default:
        childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={passSvg}/>;
    }
    // Render chart outer div and child style-specific component
    return (
      <div className="d3-chart-outer-wrapper">
        {childComponent}
      </div>
    );
  }
  // RENDER ends
}
