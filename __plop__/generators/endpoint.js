module.exports = {
    description: 'Stateless component generator',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Name',
        },
    ],
    actions: [{
        type: 'add',
        templateFile: '__plop__/templates/endpoint/Prototype.js',
        path: 'prototypes/{{name}}.js',
    }, {
        type: 'add',
        templateFile: '__plop__/templates/endpoint/mongo/Model.js',
        path: 'mongo/models/{{name}}.js',
    }, {
        type: 'add',
        templateFile: '__plop__/templates/endpoint/mongo/Schema.js',
        path: 'mongo/schemas/{{name}}.js',
    }, {
        type: 'addMany',
        base: '__plop__/templates/endpoint/api/',
        destination: 'api/server/{{toLowerCase name}}/',
        templateFiles: '__plop__/templates/endpoint/api/*',
    }, {
        type: 'modify',
        pattern: /(\};)/g,
        path: 'api/urls.js',
        templateFile: '__plop__/templates/endpoint/api_urls.js',
    }, {
        type: 'modify',
        pattern: /(\} = require\('\.\/api\/urls'\);)/g,
        path: 'server.js',
        templateFile: '__plop__/templates/endpoint/server_import_urls.js',
    }, {
        type: 'modify',
        pattern: /(\/\/ API_METHODS_IMPORT)/g,
        path: 'server.js',
        templateFile: '__plop__/templates/endpoint/server_import_api_methods.js',
    }, {
        type: 'modify',
        pattern: /(\/\/ API_HANDLING)/g,
        path: 'server.js',
        templateFile: '__plop__/templates/endpoint/server_api_methods.js',
    }],
};