define([
  'underscore',
  'backbone',
  'libs/backbone/localstorage',
  ], function(_, Backbone, Store) {
  var CurrentSprint = Backbone.Model.extend({

    localStorage: new Store('current-sprint-backbone-require'),

    defaults: {
      id: 1,
      value: null,
    }

  });
  var sprint = new CurrentSprint;
  sprint.fetch();
  return sprint;
});
