define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/story.html'
  ], function($, _, Backbone, storyTemplate){
  var StoryView = Backbone.View.extend({

    tagName:  "li",
    template: _.template(storyTemplate),

    events: {
      "dblclick div.task-content" : "edit",
      "click span.task-destroy"   : "destroy",
      "keypress .task-input"      : "updateOnEnter",
      "blur .task-input"          : "close"
    },

    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('destroy', this.remove);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.input = this.$('.task-input');
      return this;
    },

    edit: function() {
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

    destroy: function() {
      this.model.destroy();
    }

  });
  return StoryView;
});
