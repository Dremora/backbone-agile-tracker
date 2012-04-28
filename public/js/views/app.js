define([
  'jquery',
  'underscore',
  'backbone',
  'collections/tasks',
  'views/task',
  'text!templates/stats.html'
  ], function($, _, Backbone, Tasks, TaskView, statsTemplate){
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#taskapp"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template(statsTemplate),

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
      _.bindAll(this, 'addOne', 'addAll', 'render');

      this.input    = this.$("#new-task");

      Tasks.bind('add',     this.addOne);
      Tasks.bind('reset',   this.addAll);
      Tasks.bind('all',     this.render);

      Tasks.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = Tasks.done().length;
      var remaining = Tasks.remaining().length;

      this.$('#task-stats').html(this.statsTemplate({
        total:      Tasks.length,
        done:       done,
        remaining:  remaining
      }));
    },

    // Add a single task item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(task) {
      var view = new TaskView({model: task});
      this.$("#task-list").append(view.render().el);
    },

    // Add all items in the **Tasks** collection at once.
    addAll: function() {
      Tasks.each(this.addOne);
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
  return AppView;
});
