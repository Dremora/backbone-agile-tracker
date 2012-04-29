define([
  'underscore',
  'backbone',
  'collections/stories',
  'views/stories',
  'text!templates/product-backlog.html'
  ], function(_, Backbone, Stories, StoriesView, productBacklogTemplate) {
  var ProductBacklogView = Backbone.View.extend({

    template: _.template(productBacklogTemplate),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-task":  "createOnEnter",
      "keyup #new-task":     "showTooltip"
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.input = this.$("#new-task");
      this.$el.append(new StoriesView({collection: Stories}).render().$el);
      return this;
    },

    newAttributes: function() {
      return {
        content: this.input.val(),
        order:   Stories.nextOrder()
      };
    },

    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      Stories.create(this.newAttributes());
      this.input.val('');
    },

    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function() { tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    }

  });
  return ProductBacklogView;
});
