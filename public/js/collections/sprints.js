define([
  'underscore',
  'backbone',
  'libs/backbone/localstorage',
  'models/sprint'
  ], function(_, Backbone, Store, Sprint) {

  var Sprints = Backbone.Collection.extend({

    model: Sprint,
    localStorage: new Store('sprints-backbone-require'),

    nextOrder: function() {
      return this.length + 1;
    },

    comparator: function(sprint) {
      return sprint.get('name');
    },

  });
  sprints = new Sprints
  sprints.fetch();
  return sprints;
});
