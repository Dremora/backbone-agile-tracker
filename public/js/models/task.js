define(['underscore', 'backbone'], function(_, Backbone) {
  var Task = Backbone.Model.extend({

    // Default attributes for the task.
    defaults: {
      content: "empty task...",
      status: 'new'
    },

    incrementStatus: function() {
      this.save({'status': {
        'new': 'inProgress',
        'inProgress': 'done',
        'done': 'done'
      }[this.get('status')]});
    },

    decrementStatus: function() {
      this.save({'status': {
        'new': 'new',
        'inProgress': 'new',
        'done': 'inProgress'
      }[this.get('status')]});
    }

  });
  return Task;
});
