define([
  'underscore',
  'backbone',
  'views/story',
  'text!templates/stories.html'
  ], function(_, Backbone, StoryView, storiesTemplate) {
  var StoriesView = Backbone.View.extend({

    tagName: 'ul',
    className: 'tasks',

    initialize: function(options) {
      _.bindAll(this, 'addOne', 'render');
      this.collection.on('add', this.addOne);
      this.collection.on('reset', this.render);
      this.collection.on('change:sprint', this.render);
      this.editable = options.editable === undefined ? true : options.editable;
      this.filter = options.filter || function() { return true; }

      this.collection.fetch();
    },

    render: function() {
      this.$el.empty();
      _.each(this.collection.filter(this.filter), this.addOne);
      return this;
    },

    addOne: function(story) {
      var view = new StoryView({model: story, editable: this.editable});
      this.$el.append(view.render().el);
    }

  });
  return StoriesView;
});
