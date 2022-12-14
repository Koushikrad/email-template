import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  model() {
    this._super(...arguments);

    return this.store.createRecord('user', {});
  }
});
