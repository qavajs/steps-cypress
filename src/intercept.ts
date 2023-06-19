import { When } from '@badeball/cypress-cucumber-preprocessor';
import { getValue } from './transformers';
import memory from '@qavajs/memory';

/**
 * Create interception for url or matcher function
 * @param {string | function} url - url or matcher function to listen
 * @param {string} key - memory key to save
 * @example I create interception for '**\/api/qavajs' as 'intercept'
 * @example I create interception for '$interceptHandler' as 'intercept' // if you need to pass function as interception handler
 */
When('I create interception for {string} as {string}', function (matcher: string, key: string) {
    const matcherValue = getValue(matcher);
    cy.intercept(matcherValue).as(key);
    memory.setValue(key, key);
});

/**
 * Wait for interception response
 * @param {string} interception - key of saved interception promise
 * @example I wait for '$interception' response
 */
When('I wait for {string} response', function (interception: string) {
    const i = getValue(interception);
    cy.wait('@' + i);
});

/**
 * Save interception response
 * @param {string} interception - key of saved interception promise
 * @example I save '$interception' response as 'response'
 */
When('I save {string} response as {string}', function (interception: string, key: string) {
    const i = getValue(interception);
    cy.wait('@' + i).then((interceptionObject: any) => {
        memory.setValue(key, interceptionObject);
    });
});
