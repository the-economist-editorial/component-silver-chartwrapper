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

  // GET INNER BOX
  // Calculates child component's d3 margins. Param is config.dimensions,
  // which currently has outerbox and margins nods. This function appends
  // the innerbox node...
  getInnerBox(dimensions) {
    const margins = dimensions.margins;
    const outerHeight = dimensions.outerbox.height;
    const outerWidth = dimensions.outerbox.width;
    const innerWidth = outerWidth - margins.left - margins.right;
    const innerHeight = outerHeight - margins.top - margins.bottom;
    return {
      'width': innerWidth,
      'height': innerHeight,
    };
  }
  // GET INNER BOX ends

  // RENDER
  render() {
    // Clone config (ESLint errors this)
    const config = { ...this.props.config };
    //  console.log('ChartWrapper height: ' + config.dimensions.outerbox.height);
    // NOTE For now, duration of d3 transitions is defined here
    config.duration = this.props.duration;
    // Append innerbox dimensions to config
    config.dimensions.innerbox = this.getInnerBox(config.dimensions);
    // And set string wrap widths:
    // NOTE Currently hard-coded. Work into lookup...
    config.strings.title.wrapwidth = config.dimensions.innerbox.width;
    config.strings.subtitle.wrapwidth = config.dimensions.innerbox.width;
    config.strings.source.wrapwidth = Math.floor(config.dimensions.innerbox.width * 0.45);
    config.strings.footnote.wrapwidth = Math.floor(config.dimensions.innerbox.width * 0.45);
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
