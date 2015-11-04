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
      // config: {
      //   strings: {
      //     // (co-ords are text anchor -- bottom left/right)
      //     title: { 'content': 'Title', 'x': 12, 'y': 15, 'class': 'silver-title-string' },
      //     subtitle: { 'content': 'Subtitle', 'x': 12, 'y': 30, 'class': 'silver-subtitle-string' },
      //     source: { 'content': 'Source', 'x': 12, 'y': -5, 'class': 'silver-source-string' },
      //     footnote: { 'content': 'Footnote', 'x': -12, 'y': -5, 'class': 'silver-footnote-string' },
      //   },
      //   dimensions: { 'width': 160, 'height': 155 },
      //   margins: { 'top': 40, 'right': 12, 'bottom': 40, 'left': 40 },
      // },
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
    const config = this.props.config;
    // For now, duration of d3 transitions is defined here
    config.duration = this.props.duration;
    // D3 bounds are derived from config.
    // *** this is actually a bit self-reflexive... reconsider...? ***
    config.bounds = this.getBounds(config.dimensions);
    // SVG request: flag and callback
    const getSvg = this.props.getSvg;
    const passSvg = this.props.passSvg;
    // Now: what style?
    let childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={passSvg}/>;
    switch (config.style) {
      case 'bars':
        childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={passSvg}/>;
        break;
      // Other styles to come...
      // Default is redundant, but linting requires init'ion AND a default case!
      default:
        childComponent = <SilverBarChart config={config} getSvg={getSvg} passSvg={passSvg}/>;
    }
    // const dimensions = config.dimensions;
      // <div className="d3-chart-outer-wrapper" style={dimensions}>


    // ChartWrapper renders chart outer div and child style-specific component
    return (
      <div className="d3-chart-outer-wrapper">
        {childComponent}
      </div>
    );
  }
  // RENDER ends
}
