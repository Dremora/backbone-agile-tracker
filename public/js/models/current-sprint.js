define([
  'underscore',
  'backbone',
  'libs/backbone/localstorage',
  'collections/sprints'
  ], function(_, Backbone, Store, Sprints) {
  var CurrentSprint = Backbone.Model.extend({

    localStorage: new Store('current-sprint-backbone-require'),

    defaults: {
      id: 1,
      value: null,
    },

    getSprint: function() {
      return Sprints.get(this.get('value'));
    },

    setSprint: function(sprint) {
      this.set('value', sprint.id);
      this.save();
    }

  });
  var sprint = new CurrentSprint;
  sprint.fetch();
  return sprint;
});
