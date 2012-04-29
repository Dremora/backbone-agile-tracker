define([
  'jquery',
  'underscore',
  'backbone',
  'views/sprint'
  ], function($, _, Backbone, SprintView) {

  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $(".content"),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(new SprintView().render().$el);
    }

  });

  return AppView;
});
