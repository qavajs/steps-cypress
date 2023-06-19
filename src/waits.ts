import { When } from '@badeball/cypress-cucumber-preprocessor';
import { getValue, getElement, getConditionWait } from './transformers';
import { getValidation } from '@qavajs/validation';

/**
 * Wait for element condition
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until 'Header' to be visible
 * @example I wait until 'Loading' not to be present
 * @example I wait until 'Search Bar > Submit Button' to be clickable
 */
When(
    'I wait until {string} {cypressConditionWait}',
    function (alias: string, waitType: string) {
        const wait = getConditionWait(waitType);
        const element = getElement(alias);
        wait(element);
    }
);

/**
 * Wait for element text condition
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until text of 'Header' to be equal 'Javascript'
 * @example I wait until text of 'Header' not to be equal 'Python'
 */
When(
    'I wait until text of {string} {cypressValueWait} {string}',
    function (alias: string, waitType: string, value: string) {
        const element = getElement(alias);
        const expectedValue = getValue(value);
        const validation = getValidation(waitType);
        element.should((e: JQuery) => {
            validation(e.text(), expectedValue);
        });
    }
);

/**
 * Wait for collection length condition
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until number of elements in 'Search Results' collection to be equal '50'
 * @example I wait until number of elements in 'Search Results' collection to be above '49'
 * @example I wait until number of elements in 'Search Results' collection to be below '51'
 */
When(
    'I wait until number of elements in {string} collection {cypressValueWait} {string}',
    function (alias: string, waitType: string, value: string) {
        const collection = getElement(alias);
        const expectedValue = getValue(value);
        const validation = getValidation(waitType);
        collection.its('length').should((length: number) => {
            validation(length, expectedValue);
        });
    }
);

/**
 * Wait for element property condition
 * @param {string} property - property
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until 'value' property of 'Search Input' to be equal 'Javascript'
 * @example I wait until 'value' property of 'Search Input' to be equal 'Javascript' (timeout: 3000)
 */
When(
    'I wait until {string} property of {string} {cypressValueWait} {string}',
    function (property: string, alias: string, waitType: string, value: string) {
        const propertyName = getValue(property);
        const element = getElement(alias);
        const expectedValue = getValue(value);
        const validation = getValidation(waitType);
        element.should((e: JQuery) => {
            validation(e.prop(propertyName), expectedValue);
        });
    }
);

/**
 * Wait for element attribute condition
 * @param {string} attribute - attribute
 * @param {string} alias - element to wait condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until 'href' attribute of 'Home Link' to be equal '/javascript'
 * @example I wait until 'href' attribute of 'Home Link' to be equal '/javascript' (timeout: 3000)
 */
When(
    'I wait until {string} attribute of {string} {cypressValueWait} {string}',
    function (attribute: string, alias: string, waitType: string, value: string) {
        const attributeName = getValue(attribute);
        const element = getElement(alias);
        const expectedValue = getValue(value);
        const validation = getValidation(waitType);
        element.should((e: JQuery) => {
            validation(e.attr(attributeName), expectedValue);
        });
    }
);

// /**
//  * Wait
//  * @param {number} ms - milliseconds
//  * @example I wait 1000 ms
//  */
// When('I wait {int} ms', function (ms) {
//     new Promise((resolve: Function): void => {
//         setTimeout(() => resolve(), ms)
//     });
// });
//
/**
 * Wait for url condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until current url to be equal 'https://qavajs.github.io/'
 * @example I wait until current url not to contain 'java'
 */
When(
    'I wait until current url {cypressValueWait} {string}',
    function (waitType: string, value: string) {
        const expectedValue = getValue(value);
        const validation = getValidation(waitType);
        cy.url().should((url: string) => {
            validation(url, expectedValue);
        });
    }
);

/**
 * Wait for title condition
 * @param {string} wait - wait condition
 * @param {string} value - expected value to wait
 * @param {number|null} [timeout] - custom timeout in ms
 * @example I wait until page title to be equal 'qavajs'
 * @example I wait until page title not to contain 'java'
 */
When(
    'I wait until page title {cypressValueWait} {string}',
    function (waitType: string, value: string) {
        const expectedValue = getValue(value);
        const validation = getValidation(waitType);
        cy.title().should((title: string) => {
            validation(title, expectedValue);
        });
    }
);
