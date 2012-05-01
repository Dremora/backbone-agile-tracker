define([
  'underscore',
  'backbone',
  'collections/tasks',
  'text!templates/new-task.html'
  ], function(_, Backbone, Tasks, newTaskTemplate) {
  var NewTaskView = Backbone.View.extend({

    template: _.template(newTaskTemplate),

    events: {
      "keypress .new-task":  "createOnEnter",
      "keyup .new-task":     "showTooltip"
    },

    initialize: function(options) {
      options = options || {};
      this.filter = options.filter;
    },

    render: function() {
      this.$el.html(this.template());
      this.input = this.$(".new-task");
      return this;
    },

    newAttributes: function() {
      return _.extend({
        content: this.input.val(),
        order:   Tasks.nextOrder()
      }, this.filter);
    },

    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      Tasks.create(this.newAttributes());
      this.input.val('');
    },

    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function() { tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    }

  });
  return NewTaskView;
});
