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
      _.bindAll(this, 'addOne');
      this.collection.on('add', this.addOne);
      this.collection.on('reset', this.render, this);

      this.collection.fetch();
    },

    render: function() {
      this.$el.empty();
      this.collection.each(this.addOne);
      return this;
    },

    addOne: function(story) {
      var view = new StoryView({model: story});
      this.$el.append(view.render().el);
    }

  });
  return StoriesView;
});
