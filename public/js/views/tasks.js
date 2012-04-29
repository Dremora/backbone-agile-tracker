define([
  'underscore',
  'backbone',
  'views/task',
  'text!templates/tasks.html'
  ], function(_, Backbone, TaskView, tasksTemplate) {

  var TasksView = Backbone.View.extend({

    tagName: 'ul',
    className: 'task-list',
    template: _.template(tasksTemplate),

    initialize: function(options) {
      _.bindAll(this, 'addOne');
      this.collection.on('add', this.addOne);
      this.collection.on('remove', this.render, this);
      this.collection.on('reset', this.render, this);
      this.status = options.status;
      this.name = options.name;

      this.collection.on('change:status', this.render, this);

      this.collection.fetch();
      this.render();
    },

    render: function() {
      this.$el.html(this.template({name: this.name}));
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
