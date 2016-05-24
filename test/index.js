import 'babel-polyfill';
import SilverChartwrapper from '../src';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
chai.use(chaiEnzyme()).should();
describe('SilverChartwrapper', () => {

  it('renders a React element', () => {
    React.isValidElement(<SilverChartwrapper />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let silverChartwrapper = null;
    beforeEach(() => {
      rendered = mount(<SilverChartwrapper />);
      silverChartwrapper = rendered.find('.silver-chartwrapper');
    });

    it('renders a top level div.silver-chartwrapper', () => {
      silverChartwrapper.should.have.tagName('div');
      silverChartwrapper.should.have.className('silver-chartwrapper');
    });

    xit('renders a top level div.silver-chartwrapper', () => {
      silverChartwrapper.should.have.exactly(1).descendants('.the-descendent-class');
      silverChartwrapper.find('.the-descendent-class').should.have.tagName('TAG');
    });

  });

});
