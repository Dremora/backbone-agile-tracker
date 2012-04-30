define(['underscore', 'backbone'], function(_, Backbone) {
  var Sprint = Backbone.Model.extend({

    defaults: {
      name: ""
    }

  });
  return Sprint;
});
