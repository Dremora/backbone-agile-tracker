define([
  'underscore',
  'backbone',
  'collections/tasks',
  'text!templates/stats.html'
  ], function(_, Backbone, Tasks, statsTemplate){
  var StatsView = Backbone.View.extend({

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template(statsTemplate),

    initialize: function() {
      Tasks.bind('all', this.render, this);
    },

    render: function() {
      var done = Tasks.done().length;
      var newTasks = Tasks.new().length;
      var inProgress = Tasks.inProgress().length;
      var total = done + newTasks + inProgress;

      this.$el.html(this.statsTemplate({
        total:      total,
        done:       done,
        newTasks:  newTasks,
        inProgress: inProgress
      }));

      return this;
    }

  });
  return StatsView;
});
