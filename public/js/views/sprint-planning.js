define([
  'underscore',
  'backbone',
  'collections/stories',
  'views/stories',
  'text!templates/sprint-planning.html'
  ], function(_, Backbone, Stories, StoriesView, sprintPlanningTemplate) {
  var SprintPlanningView = Backbone.View.extend({

    template: _.template(sprintPlanningTemplate),

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.$('.product-backlog').append(new StoriesView({
        collection: Stories,
        editable: false,
        filter: function(story) { return story.get('sprint') === undefined }
      }).render().$el);

      this.$('.sprint-backlog').append(new StoriesView({
        collection: Stories,
        editable: false,
        filter: function(story) { return story.get('sprint') === 1 }
      }).render().$el);
      return this;
    },

  });
  return SprintPlanningView;
});
