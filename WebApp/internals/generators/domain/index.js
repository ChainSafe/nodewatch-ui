/**
 * Domain Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a domain component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/reducer tuple for this container?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantTypes',
      default: true,
      message: 'Do you want to have types.d.ts file',
    },
  ],
  actions: data => {
    const actions = [];

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/actions.ts',
        templateFile: './domain/actions.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/tests/actions.test.ts',
        templateFile: './domain/actions.test.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/constants.ts',
        templateFile: './domain/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/selectors.ts',
        templateFile: './domain/selectors.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path:
          '../../app/domain/{{properCase name}}/tests/selectors.test.ts',
        templateFile: './domain/selectors.test.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/reducer.ts',
        templateFile: './domain/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/tests/reducer.test.ts',
        templateFile: './domain/reducer.test.js.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/saga.ts',
        templateFile: './domain/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/tests/saga.test.ts',
        templateFile: './domain/saga.test.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/sagas/defaultSaga.ts',
        templateFile: './domain/subSaga.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantTypes) {
      actions.push({
        type: 'add',
        path: '../../app/domain/{{properCase name}}/types.d.ts',
        templateFile: './domain/types.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/domain/',
    });

    return actions;
  },
};
