define([
  'underscore',
  'backbone',
  'collections/tasks',
  'views/task',
  'text!templates/tasks.html'
  ], function(_, Backbone, Tasks, TaskView, tasksTemplate) {

  var TasksView = Backbone.View.extend({

    tagName: 'ul',
    className: 'tasks',
    template: _.template(tasksTemplate),

    initialize: function(options) {
      _.bindAll(this, 'addOne');
      this.status = options.status;
      this.collection = Tasks;
      this.collection.on('add', this.addOne);
      this.collection.on('remove', this.render, this);
      this.collection.on('reset', this.render, this);
      this.collection.on('change:status', this.render, this);
    },

    render: function() {
      this.$el.empty();
      this.collection.each(this.addOne);
      return this;
    },

    // Add a single task item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(task) {
      if (task.get('status') !== this.status) return;
      var view = new TaskView({model: task});
      this.$el.append(view.render().el);
    }

  });
  return TasksView;
});
