var express = require('express');

var app = module.exports = express.createServer();

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/public');
  app.set("view options", {layout: false});

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);

  app.register('.html', {
    compile: function(str, options) {
      return function(locals) {
        return str;
      };
    }
  });
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

// Routes
app.get(/.*/, function(req, res) {
  res.render('index.html');
});

// Start server
app.listen(3000, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
