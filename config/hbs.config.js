const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views', 'partials'));

hbs.registerHelper('activeFilter', function (options) {
  const { query, param } = options.hash;

  if (query[param]) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('activeItemFilter', function (options) {
  const { query, param, value } = options.hash;

  if (query[param] === value) {
    return options.fn(this);
  }
  return options.inverse(this);
});
