define([
  'underscore',
  'backbone',
  'libs/backbone/localstorage',
  'models/story'
  ], function(_, Backbone, Store, Story) {

  var Stories = Backbone.Collection.extend({

    model: Story,
    localStorage: new Store('stories-backbone-require'),

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(story) {
      return story.get('order');
    }

  });
  return new Stories;
});
