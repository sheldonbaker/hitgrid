import Ember from 'ember';
const { get, set } = Ember;

export default Ember.Mixin.create({
  queryParams: ['sort'],
  sort: null,

  actions: {
    sortBy(by) {
      if (get(this, 'sort') === by) {
        set(this,'sort', ['-', by].join(''));
      } else if (get(this, 'sort') === ['-', by].join('')) {
        set(this, 'sort', null);
      } else {
        set(this, 'sort', by);
      }
    }
  }
});
