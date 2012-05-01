define([
  'underscore',
  'backbone',
  'collections/tasks',
  'views/tasks',
  'views/stats',
  'text!templates/sprint.html'
  ], function(_, Backbone, Tasks, TasksView, StatsView, sprintTemplate) {
  var SprintView = Backbone.View.extend({

    template: _.template(sprintTemplate),

    render: function() {
      this.$el.html(this.template());
      var tasks = this.$('.task-columns');
      tasks.find('.unstarted').append(new TasksView({
        filter: {status: 'new'}
      }).render().$el);
      tasks.find('.ongoing').append(new TasksView({
        filter: {status: 'inProgress'}
      }).render().$el);
      tasks.find('.completed').append(new TasksView({
        filter: {status: 'done'}
      }).render().$el);
      this.$('.task-stats').html(new StatsView().render().$el);
      return this;
    }

  });
  return SprintView;
});
