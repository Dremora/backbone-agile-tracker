define(['underscore', 'backbone'], function(_, Backbone) {
  var Task = Backbone.Model.extend({

    // Default attributes for the task.
    defaults: {
      content: "empty task...",
      status: 'new'
    },

    // Ensure that each task created has `content`.
    initialize: function() {
      if (!this.get("content")) {
        this.set({"content": this.defaults.content});
      }
    },

    // Remove this Task from *localStorage*.
    clear: function() {
      this.destroy();
    }

  });
  return Task;
});
