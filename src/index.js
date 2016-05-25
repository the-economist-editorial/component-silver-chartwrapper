// Chartwrapper is now the immediate child of Sibyl
import React from 'react';
// import SilverBarChart from '@economist/component-silver-barchart';
export default class SilverChartWrapper extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      config: React.PropTypes.object,
      test: React.PropTypes.string,
      getSvg: React.PropTypes.bool,
      passSvg: React.PropTypes.func,
    };
  }
  // PROP TYPES ends

  // DEFAULT PROPS
  static get defaultProps() {
    return {
      getSvg: false,
      config: {
        background: {
          outerbox: {
            dimensions: { width: 100, height: 100 },
          },
        },
      },
    };
  }
  // DEFAULT PROPS ends

  // NOTE: this function presumably moves (in some form or other)
  // to the child ChartMargins component...
  // GET INNER BOX
  // Calculates child component's d3 margins. Param is config.dimensions,
  // which currently has outerbox and margins nods. This function appends
  // the innerbox node...
  /*
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
  */
  // GET INNER BOX ends

  // RENDER
  render() {
    const config = this.props.config;
    /* eslint-disable no-console */
    console.log('Verify state of config object in Chartwrapper.render');
    console.log(config);
    /* eslint-enable no-console */
    // Append innerbox dimensions to config
    // config.dimensions.innerbox = this.getInnerBox(config.dimensions);
    // And set string wrap widths:
    // NOTE Currently hard-coded. Work into lookup...
    // config.strings.title.wrapwidth = config.dimensions.innerbox.width;
    // config.strings.subtitle.wrapwidth = config.dimensions.innerbox.width;
    // config.strings.source.wrapwidth = Math.floor(config.dimensions.innerbox.width * 0.45);
    // config.strings.footnote.wrapwidth = Math.floor(config.dimensions.innerbox.width * 0.45);
    // Now: what style? Bar chart is default... for now at least...

    // ====================== comm'd out during re-dev =========================
    /*
    // SVG request: flag and callback
    const getSvg = this.props.getSvg;
    const passSvg = this.props.passSvg;
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
    // Render chart outer div (and child style-specific component
    */
    // During dev:::::::::::::::::::::
    // const childComponent = null;
    // {childComponent}

    // NOTE:
    // This element has hard-set size. Child svg-wrapper is 100%...
    // But the thing is: dimensions set here by the config object
    // should stop here. Elements down the tree should take their dimensions
    // from this element...
    // Or: can I get SilverBullet's 'live' equivalent to override
    // its config file's dims with window dims...?
    // Careful: probably no 'live' equivalent, anyway...
    const divStyle = {
      height: config.background.outerbox.dimensions.height,
      width: config.background.outerbox.dimensions.width,
    };
    return (
      <div className="silver-chartwrapper" style={divStyle} >
        <svg className="svg-wrapper" ref="svgwrapper" />
      </div>
    );
  }
  // RENDER ends
}
