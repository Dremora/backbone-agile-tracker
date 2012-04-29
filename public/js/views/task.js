define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/task.html'
  ], function($, _, Backbone, tasksTemplate){
  var TaskView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template(tasksTemplate),

    // The DOM events specific to an item.
    events: {
      "dblclick div.task-content" : "edit",
      "click span.task-destroy"   : "clear",
      "keypress .task-input"      : "updateOnEnter",
      "blur .task-input"          : "close",
      'click .increment-status'   : 'incrementStatus',
      'click .decrement-status'   : 'decrementStatus'
    },

    // The TaskView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Task** and a **TaskView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('destroy', this.remove);
    },

    // Re-render the contents of the task item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.input = this.$('.task-input');
      return this;
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the task.
    close: function() {
      this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    incrementStatus: function() {
      this.model.incrementStatus();
    },

    decrementStatus: function() {
      this.model.decrementStatus();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }

  });
  return TaskView;
});
