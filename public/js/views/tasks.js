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
      options = options || {};
      _.bindAll(this, 'addOne');
      this.filter = options.filter || {};
      this.collection = Tasks;
      this.collection.on('add', this.addOne);
      this.collection.on('remove', this.render, this);
      this.collection.on('reset', this.render, this);
      _.each(this.filter, function(value, name) {
        this.collection.on('change:' + name, this.render, this);
      }, this);
    },

    render: function() {
      this.$el.empty();
      this.collection.each(this.addOne);
      return this;
    },

    // Add a single task item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(task) {
      var ok = true;
      _.each(this.filter, function(value, name) {
        if (task.get(name) !== value) ok = false;
      });
      if (!ok) return;
      var view = new TaskView({model: task});
      this.$el.append(view.render().el);
    }

  });
  return TasksView;
});
