define([
  'underscore',
  'backbone',
  'views/task'
  ], function(_, Backbone, TaskView) {

  var TasksView = Backbone.View.extend({

    tagName: 'ul',
    className: 'task-list',

    initialize: function(options) {
      _.bindAll(this, 'addOne');
      this.collection.on('add', this.addOne);
      this.collection.on('remove', this.render, this);
      this.collection.on('reset', this.render, this);
      this.status = options.status;

      this.collection.on('change:status', this.render, this);

      this.collection.fetch();
      this.render();
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
