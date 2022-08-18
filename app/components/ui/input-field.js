import Component from '@ember/component';
import { computed, defineProperty } from '@ember/object';
import { reads, and } from '@ember/object/computed';

export default Component.extend({
  init() {
    this._super(...arguments);

    if (this.property) {
      defineProperty(this, 'validation', reads(`model.validations.attrs.${this.property}`));
    }
  },

  classNames: ['form-field'],

  classNameBindings: ['showErrorMessage:invalid'],

  model: computed('_target', {
    get() {
      return this._target;
    },
    set(key, value) {
      return value;
    }
  }),

  isInvalid: reads('validation.isInvalid'),

  showErrorMessage: and('isInvalid', 'didValidate')
});
