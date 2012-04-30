define([
  'underscore',
  'backbone',
  'collections/sprints',
  'text!templates/sprint-select.html'
  ], function(_, Backbone, Sprints, sprintSelectTemplate) {
  var SprintPlanningView = Backbone.View.extend({

    template: _.template(sprintSelectTemplate),

    events: {
      'click .new-sprint': 'newSprint'
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.collection = Sprints;
      this.collection.on('reset', this.render);
      this.collection.on('add', this.render);
      this.collection.fetch();
    },

    render: function() {
      this.$el.html(this.template({sprints: this.collection}));
      return this;
    },

    newSprint: function() {
      this.collection.create({name: 'Sprint ' + this.collection.nextOrder()});
    }

  });
  return SprintPlanningView;
});
