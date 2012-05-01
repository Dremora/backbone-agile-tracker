define([
  'underscore',
  'backbone',
  'libs/backbone/localstorage',
  'models/story'
  ], function(_, Backbone, Store, Story) {

  var Stories = Backbone.Collection.extend({

    model: Story,
    localStorage: new Store('stories-backbone-require'),

    initialize: function() {
      _.bindAll('itemReordered');
      this.on('change:order', this.itemReordered);
    },

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(story) {
      return story.get('order');
    },

    itemReordered: function(changedStory, order, options) {
      if (options.reordering) return;
      var oldOrder = changedStory.previous('order');
      if (order < oldOrder) {
        var otherStory = _.max(this.filter(function(story) {
          return story != changedStory && story.get('order') <= order;
        }), function(story) {
          return story.get('order');
        });
      } else {
        var otherStory = _.min(this.filter(function(story) {
          return story != changedStory && story.get('order') >= order;
        }), function(story) {
          return story.get('order');
        });
      }
      if (otherStory != null) {
        otherStory.save({order: oldOrder}, {reordering: true});
        this.sort();
      }
    }

  });
  var stories = new Stories;
  stories.fetch();
  return stories;
});
