define([
  'jquery',
  'underscore',
  'backbone',
  'views/product-backlog',
  'views/sprint-planning',
  'views/sprint'
  ], function($, _, Backbone, ProductBacklogView, SprintPlanningView, SprintView) {
  var Router = Backbone.Router.extend({

    initialize: function() {
      Backbone.history.start({pushState: true});
      $(document).on("click", "a:not([data-bypass])", function(evt) {
        var href = $(this).attr("href");
        var protocol = this.protocol + "//";
        if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
          evt.preventDefault();
          Backbone.history.navigate(href, true);
        }
      });
    },

    routes: {
      '': 'sprintBacklog',
      'backlog': 'backlog',
      'planning': 'sprintPlanning',
      'backlog/sprint': 'sprintBacklog',
    },

    backlog: function() {
      var view = new ProductBacklogView;
      $(".content").html(view.render().el);
    },

    sprintPlanning: function() {
      var view = new SprintPlanningView;
      $(".content").html(view.render().el);
    },

    sprintBacklog: function() {
      var view = new SprintView;
      $(".content").html(view.render().el);
    }

  });

  return Router;
});
