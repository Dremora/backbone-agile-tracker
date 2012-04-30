define([
  'jquery',
  'underscore',
  'backbone',
  'views/sprint-select'
  ], function($, _, Backbone, SprintSelect) {
  var AppView = Backbone.View.extend({

    el: $("#taskapp"),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$('.sprint-select').append(new SprintSelect().render().el);
      return this;
    }

  });
  return AppView;
});
