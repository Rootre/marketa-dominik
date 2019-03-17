module.exports = {
    type: 'checkbox',
    message: 'Select core stores',
    name: 'stores',
    choices: [
        {
            name: 'ABTestStore',
            value: 'abTestStore',
        },
        {
            name: 'FeatureSwitchStore',
            value: 'featureSwitchStore',
        },
        {
            name: 'FormStore',
            value: 'formStore',
        },
        {
            name: 'GeneralStore',
            value: 'generalStore',
        },
        {
            name: 'TranslationStore',
            value: 'translationStore',
        },
        {
            name: 'UrlStore',
            value: 'urlStore',
        },
    ],
    /*
    filter: answers => {
        return answers.map(answer => `'${answer}'`);
    },
    */
    validate: answers => {
        return answers.length > 0 ? true : 'You must choose at least one store!';
    },
};