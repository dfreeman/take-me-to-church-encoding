import Route from '@ember/routing/route';
import { on } from 'ember-decorators/object/evented';
import { EKMixin, keyUp } from 'ember-keyboard';

export default class ApplicationRoute extends Route.extend(EKMixin, {
  // @on doesn't work with class syntax, so throw these in old-style
  @on(keyUp('ArrowLeft'), keyUp('ArrowRight'))
  goPrevious(event) {
    if (!event.target.closest('textarea')) {
      // Do stuff later
    }
  }
}) {
  keyboardActivated = true;
}
