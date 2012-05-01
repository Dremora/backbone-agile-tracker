define([
  'jquery',
  'underscore',
  'backbone',
  'models/current-sprint',
  'collections/sprints',
  'views/new-task',
  'views/tasks',
  'text!templates/story.html'
  ], function($, _, Backbone, CurrentSprint, Sprints, NewTaskView, TasksView, storyTemplate) {
  var StoryView = Backbone.View.extend({

    tagName:  "li",
    template: _.template(storyTemplate),

    events: {
      "dblclick div.task-content" : "edit",
      "click span.destroy"        : "destroy",
      "keypress .task-input"      : "updateOnEnter",
      "blur .task-input"          : "close",
      'click .move-up'            : 'moveUp',
      'click .move-down'          : 'moveDown',
      'click .add-to-sprint'      : 'addToSprint',
      'click .remove-from-sprint' : 'removeFromSprint'
    },

    initialize: function(options) {
      _.bindAll(this, 'render', 'close', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('destroy', this.remove);
      this.editable = options.editable === undefined ? true : options.editable;
    },

    render: function() {
      var sprint = Sprints.get(this.model.get('sprint'));
      this.$el.html(this.template(_.extend(this.model.toJSON(), {
        sprintName: sprint != null ? sprint.get('name') : null
      })));
      if (this.editable) {
        this.$el.addClass('editable');
      }
      if (!this.editable && sprint != null) {
        this.$el.append(new NewTaskView({
          filter: {story: this.model.id}
        }).render().el);
        this.$el.append(new TasksView({
          filter: {story: this.model.id}
        }).render().el);
      }
      this.input = this.$('.task-input');
      return this;
    },

    edit: function() {
      if (!this.editable) return;
      $(this.el).addClass("editing");
      this.input.focus();
    },

    close: function() {
      this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
    },

    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    moveUp: function() {
      this.model.save({order: this.model.get('order') - 1});
    },

    moveDown: function() {
      this.model.save({order: this.model.get('order') + 1});
    },

    addToSprint: function() {
      var sprint = CurrentSprint.get('value');
      if (sprint != null) {
        this.model.save({sprint: sprint});
      }
    },

    removeFromSprint: function() {
      this.model.save({sprint: null});
    },

    destroy: function() {
      this.model.destroy();
    }

  });
  return StoryView;
});
