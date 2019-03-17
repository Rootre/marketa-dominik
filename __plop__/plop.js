const Handlebars = require('handlebars');

const statelessComponent = require('./generators/statelessComponent');
const endpoint = require('./generators/endpoint');

const componentExport = require('./partials/componentExport');
const componentReturn = require('./partials/componentReturn');
const stylesImport = require('./partials/stylesImport');

module.exports = function (plop) {
    plop.setGenerator('stateless', statelessComponent);
    plop.setGenerator('endpoint', endpoint);

    plop.setHelper('encodeMyString', input => new Handlebars.SafeString(input));
    plop.setHelper('toUpperCase', input => input.toUpperCase());
    plop.setHelper('toLowerCase', input => input.toLowerCase());

    plop.setPartial('componentExport', componentExport);
    plop.setPartial('componentReturn', componentReturn);
    plop.setPartial('stylesImport', stylesImport);
};