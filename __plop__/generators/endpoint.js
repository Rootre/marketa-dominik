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
        type: 'modify',
        pattern: /\};/g,
        path: 'api/urls.js',
        templateFile: '__plop__/templates/endpoint/urls.js',
    }],
};