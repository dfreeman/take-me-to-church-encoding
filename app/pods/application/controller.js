import EmberObject from '@ember/object';
import Controller from '@ember/controller';
import { next } from '@ember/runloop';
import { computed } from 'ember-decorators/object';
import $ from 'jquery';

export default class ApplicationController extends Controller {
  preamble = `
    function tag(strings, ...vars) {
      return f => Object.assign(f, {
        toString() {
          let result = strings[0];
          for (let i = 0; i < vars.length; i++) {
            result += vars[i] + strings[i + 1];
          }
          return result;
        }
      });
    }
  `;

  @computed
  blocks() {
    return [new Block({ preamble: this.get('preamble') })]
  }

  addBlock(index) {
    let blocks = this.get('blocks');
    blocks.replace(index + 1, 0, [new Block({ blocks })]);
    this._focusTextArea(index + 1);
  }

  clearBlock(index) {
    if (index > 0) {
      this.get('blocks').replace(index, 1, []);
    }
  }

  _focusTextArea(index) {
    next(() => $('textarea').get(index * 2).focus());
  }
}

class Block extends EmberObject {
  @computed('previous.preamble', 'previous.value')
  preamble(previousPreamble, previousValue) {
    return `${previousPreamble}; ${previousValue}; undefined`;
  }

  @computed('blocks.[]')
  previous(blocks) {
    let index = blocks.indexOf(this);
    return blocks[index - 1];
  }
}
