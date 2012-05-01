define([
  'underscore',
  'backbone',
  'models/current-sprint',
  'collections/stories',
  'collections/tasks',
  'views/tasks',
  'views/stats',
  'text!templates/sprint.html'
  ], function(_, Backbone, CurrentSprint, Stories, Tasks, TasksView, StatsView, sprintTemplate) {
  var SprintView = Backbone.View.extend({

    template: _.template(sprintTemplate),

    initialize: function() {
      _.bindAll(this, 'render');
      CurrentSprint.on('change', this.render);
      this.sprintFilter = function(storyId) {
        return Stories.get(storyId).get('sprint') == CurrentSprint.get('value');
      }
    },

    render: function() {
      this.$el.html(this.template());
      var tasks = this.$('.task-columns');
      tasks.find('.unstarted').append(new TasksView({
        filter: {status: 'new', story: this.sprintFilter}
      }).render().$el);
      tasks.find('.ongoing').append(new TasksView({
        filter: {status: 'inProgress', story: this.sprintFilter}
      }).render().$el);
      tasks.find('.completed').append(new TasksView({
        filter: {status: 'done', story: this.sprintFilter}
      }).render().$el);
      this.$('.task-stats').html(new StatsView().render().$el);
      return this;
    }

  });
  return SprintView;
});
