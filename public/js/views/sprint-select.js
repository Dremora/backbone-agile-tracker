define([
  'underscore',
  'backbone',
  'models/current-sprint',
  'collections/sprints',
  'text!templates/sprint-select.html'
  ], function(_, Backbone, CurrentSprint, Sprints, sprintSelectTemplate) {
  var SprintPlanningView = Backbone.View.extend({

    template: _.template(sprintSelectTemplate),

    events: {
      'change select': 'sprintSelect',
      'click .new-sprint': 'newSprint'
    },

    initialize: function() {
      _.bindAll(this, 'render');
      this.collection = Sprints;
      this.collection.on('reset', this.render);
      this.collection.on('add', this.render);
      CurrentSprint.on('change', this.render);
      this.collection.fetch();
    },

    render: function() {
      this.$el.html(this.template({
        sprints: this.collection,
        current: CurrentSprint.getSprint()
      }));
      return this;
    },

    sprintSelect: function() {
      CurrentSprint.setSprint(this.collection.at(this.$('select').prop("selectedIndex")));
    },

    newSprint: function() {
      var sprint = this.collection.create({name: 'Sprint ' + this.collection.nextOrder()});
      CurrentSprint.setSprint(sprint);
    }

  });
  return SprintPlanningView;
});
