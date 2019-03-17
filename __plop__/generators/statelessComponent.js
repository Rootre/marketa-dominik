module.exports = {
    description: 'Stateless component generator',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'Component name',
        },
    ],
    actions: [{
        type: 'addMany',
        base: '__plop__/templates/component/stateless/',
        destination: 'components/{{name}}/',
        templateFiles: 'frontend/__plop__/templates/component/stateless/*',
    }],
};