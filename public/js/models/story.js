define(['underscore', 'backbone'], function(_, Backbone) {
  var Story = Backbone.Model.extend({

    defaults: {
      content: ""
    }

  });
  return Story;
});
