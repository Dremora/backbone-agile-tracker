define([
  'underscore',
  'backbone',
  'models/current-sprint',
  'collections/stories',
  'views/stories',
  'text!templates/sprint-planning.html'
  ], function(_, Backbone, CurrentSprint, Stories, StoriesView, sprintPlanningTemplate) {
  var SprintPlanningView = Backbone.View.extend({

    template: _.template(sprintPlanningTemplate),

    initialize: function() {
      _.bindAll(this, 'render');
      CurrentSprint.on('change', this.render);
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.$('.product-backlog').append(new StoriesView({
        collection: Stories,
        editable: false,
        filter: function(story) { return story.get('sprint') == null }
      }).render().$el);

      this.$('.sprint-backlog').append(new StoriesView({
        collection: Stories,
        editable: false,
        filter: function(story) { return story.get('sprint') === CurrentSprint.get('value') }
      }).render().$el);
      return this;
    },

  });
  return SprintPlanningView;
});
