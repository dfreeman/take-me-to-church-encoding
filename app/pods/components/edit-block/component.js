import Component from '@ember/component';
import { run } from '@ember/runloop';
import { computed } from 'ember-decorators/object';

export default class EditBlock extends Component.extend({ tagName: '' }) {
  @computed('preamble', 'value')
  result(preamble, value) {
    try {
      let result = eval.call(null, `${preamble};${value}`);
      if (result && ['object', 'function'].includes(typeof result)) {
        return result.toString();
      } else {
        return JSON.stringify(result) || '';
      }
    } catch (error) {
      return '';
    }
  }

  configureEditor(editor) {
    editor.getSession().setOption('useWorker', false);

    editor.commands.addCommand({
      name: 'remove-block',
      bindKey: 'Backspace',
      exec: (editor) => run(() => {
        if (!editor.getValue()) {
          this.get('clearBlock')();
        } else {
          return false;
        }
      })
    });

    editor.commands.addCommand({
      name: 'add-block',
      bindKey: 'Shift+Enter',
      exec: () => run(() => {
        this.get('addBlock')();
      })
    });
  }

  configureResult(editor) {
    editor.renderer.setShowGutter(false);
  }
}
