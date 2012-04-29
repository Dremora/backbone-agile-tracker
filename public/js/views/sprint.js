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

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-task":  "createOnEnter",
      "keyup #new-task":     "showTooltip",
      "click .task-clear a": "clearCompleted"
    },

    // At initialization we bind to the relevant events on the `Tasks`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting tasks that might be saved in *localStorage*.
    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.input = this.$("#new-task");
      var tasks = this.$('#tasks');
      tasks.append(new TasksView({
        collection: Tasks,
        name: 'Unstarted',
        status: 'new'
      }).render().$el);
      tasks.append(new TasksView({
        collection: Tasks,
        name: 'Ongoing',
        status: 'inProgress'
      }).render().$el);
      tasks.append(new TasksView({
        collection: Tasks,
        name: 'Completed',
        status: 'done'
      }).render().$el);
      this.$('#task-stats').html(new StatsView().render().$el);
      return this;
    },

    // Generate the attributes for a new Task item.
    newAttributes: function() {
      return {
        content: this.input.val(),
        order:   Tasks.nextOrder()
      };
    },

    // If you hit return in the main input field, create new **Task** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      Tasks.create(this.newAttributes());
      this.input.val('');
    },

    // Clear all done task items, destroying their models.
    clearCompleted: function() {
      _.each(Tasks.done(), function(task){ task.clear(); });
      return false;
    },

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new task item, after one second.
    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    }

  });
  return SprintView;
});
