define(
  ['order!jquery',
   'order!underscore',
   'order!libs/backbone/backbone-min'],
  function() {
    // At this point we don't need global variables anymore
    $.noConflict();
    _.noConflict();
    return Backbone.noConflict();
  }
);
