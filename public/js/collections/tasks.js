define([
  'underscore',
  'backbone',
  'libs/backbone/localstorage',
  'models/task'
  ], function(_, Backbone, Store, Task) {

	var Tasks = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Task,

    // Save all of the task items under the `"tasks"` namespace.
    localStorage: new Store("tasks-backbone-require"),

    new: function() {
      return this.filterByStatus('new');
    },

    inProgress: function() {
      return this.filterByStatus('inProgress');
    },

    done: function() {
      return this.filterByStatus('done');
    },

    filterByStatus: function(status) {
      return this.filter(function(task) { return task.get('status') === status; });
    },

    // We keep the Tasks in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Tasks are sorted by their original insertion order.
    comparator: function(task) {
      return task.get('order');
    }

  });
  var tasks = new Tasks;
  tasks.fetch();
  return tasks;
});
