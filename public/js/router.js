define([
  'jquery',
  'underscore',
  'backbone',
  'views/sprint',
  ], function($, _, Backbone, SprintView) {
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
      $('.content').html('In progress');
    },

    sprintPlanning: function() {
      $('.content').html('In progress');
    },

    sprintBacklog: function() {
      var view = new SprintView;
      $(".content").html(view.render().el);
    }

  });

  return Router;
});
