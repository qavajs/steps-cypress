import {Then} from '@badeball/cypress-cucumber-preprocessor';
import {
    getValue, getElement, getConditionWait,
    // getConditionWait
} from './transformers';
import {getValidation} from '@qavajs/validation';

/**
 * Verify element condition
 * @param {string} alias - element to wait condition
 * @param {string} condition - wait condition
 * @example I expect 'Header' to be visible
 * @example I expect 'Loading' not to be present
 * @example I expect 'Search Bar > Submit Button' to be clickable
 */
Then('I expect {string} {cypressConditionWait}', function (alias: string, condition: string) {
    const wait = getConditionWait(condition);
    const element = getElement(alias);
    wait(element);
});

/**
 * Verify that text of element satisfies condition
 * @param {string} alias - element to get text
 * @param {string} validationType - validation
 * @param {string} value - expected result
 * @example I expect text of '#1 of Search Results' equals to 'google'
 * @example I expect text of '#2 of Search Results' does not contain 'yandex'
 */
Then(
    'I expect text of {string} {cypressValidation} {string}',
    function (alias: string, validationType: string, value: any) {
        const expectedValue = getValue(value);
        const element = getElement(alias);
        const validation = getValidation(validationType);
        element.should((e: JQuery) => {
            validation(e.text(), expectedValue);
        });
    }
);

/**
 * Verify that property of element satisfies condition
 * @param {string} property - element to verify
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect 'value' property of 'Search Input' to be equal 'text'
 * @example I expect 'innerHTML' property of 'Label' to contain '<b>'
 */
Then(
    'I expect {string} property of {string} {cypressValidation} {string}',
    function (property: string, alias: string, validationType: string, value: string) {
        const propertyName = getValue(property);
        const expectedValue = getValue(value);
        const element = getElement(alias);
        const validation = getValidation(validationType);
        element.should((e: JQuery) => {
            validation(e.prop(propertyName), expectedValue);
        });
    }
);

/**
 * Verify that attribute of element satisfies condition
 * @param {string} attribute - element to verify
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect 'href' attribute of 'Home Link' to contain '/home'
 */
Then(
    'I expect {string} attribute of {string} {cypressValidation} {string}',
    function (attribute: string, alias: string, validationType: string, value: string) {
        const attributeName = getValue(attribute);
        const expectedValue = getValue(value);
        const element = getElement(alias);
        const validation = getValidation(validationType);
        element.should((e: JQuery) => {
            validation(e.attr(attributeName), expectedValue);
        });
    }
);

/**
 * Verify that current url satisfies condition
 * @param {string} validationType - validation
 * @param {string} expected - expected value
 * @example I expect current url contains 'wikipedia'
 * @example I expect current url equals 'https://wikipedia.org'
 */
Then(
    'I expect current url {cypressValidation} {string}',
    function (validationType: string, expected: string) {
        const validation = getValidation(validationType);
        const expectedUrl = getValue(expected);
        cy.url().then((actualUrl: string) => {
            validation(actualUrl, expectedUrl);
        });
    }
);

/**
 * Verify that number of element in collection satisfies condition
 * @param {string} alias - collection to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect number of elements in 'Search Results' collection to be equal '50'
 * @example I expect number of elements in 'Search Results' collection to be above '49'
 * @example I expect number of elements in 'Search Results' collection to be below '51'
 */
Then(
    'I expect number of elements in {string} collection {cypressValidation} {string}',
    function (alias: string, validationType: string, value: string) {
        const expectedValue = getValue(value);
        const collection = getElement(alias);
        const validation = getValidation(validationType);
        collection.then((collection: JQuery) => {
            validation(collection.length, expectedValue);
        });
    }
);

/**
 * Verify that page title satisfies condition
 * @param {string} validationType - validation
 * @param {string} expected - expected value
 * @example I expect page title equals 'Wikipedia'
 */
Then(
    'I expect page title {cypressValidation} {string}',
    function (validationType: string, expected: string) {
        const validation = getValidation(validationType);
        const expectedTitle = getValue(expected);
        cy.title().then((actualTitle: string) => {
            validation(actualTitle, expectedTitle);
        });
    }
);

/**
 * Verify that all texts in collection satisfy condition
 * @param {string} alias - collection to get texts
 * @param {string} validationType - validation
 * @param {string} value - expected result
 * @example I expect text of every element in 'Search Results' collection equals to 'google'
 * @example I expect text of every element in 'Search Results' collection does not contain 'yandex'
 */
Then(
    'I expect text of every element in {string} collection {cypressValidation} {string}',
    function (alias: string, validationType: string, value: string) {
        const expectedValue = getValue(value);
        const collection = getElement(alias);
        const validation = getValidation(validationType);
        collection.each((element: JQuery) => {
            validation(element.text(), expectedValue);
        });
    }
);

/**
 * Verify that all particular attributes in collection satisfy condition
 * @param {string} alias - collection to get attrs
 * @param {string} validationType - validation
 * @param {string} value - expected result
 * @example I expect 'href' attribute of every element in 'Search Results' collection to contain 'google'
 */
Then(
    'I expect {string} attribute of every element in {string} collection {cypressValidation} {string}',
    function (attribute: string, alias: string, validationType: string, value: string) {
        const expectedValue = getValue(value);
        const collection = getElement(alias);
        const validation = getValidation(validationType);
        collection.each((element: JQuery) => {
            validation(element.attr(attribute), expectedValue);
        });
    }
);

/**
 * Verify that all particular properties in collection satisfy condition
 * @param {string} alias - collection to get props
 * @param {string} validationType - validation
 * @param {string} value - expected result
 * @example I expect 'href' property of every element in 'Search Results' collection to contain 'google'
 */
Then(
    'I expect {string} property of every element in {string} collection {cypressValidation} {string}',
    function (property: string, alias: string, validationType: string, value: string) {
        const expectedValue = getValue(value);
        const collection = getElement(alias);
        const validation = getValidation(validationType);
        collection.each((element: JQuery) => {
            validation(element.prop(property), expectedValue);
        });
    }
);

/**
 * Verify that css property of element satisfies condition
 * @param {string} property - element to verify
 * @param {string} alias - element to verify
 * @param {string} validationType - validation
 * @param {string} value - expected value
 * @example I expect 'color' css property of 'Search Input' to be equal 'rgb(42, 42, 42)'
 * @example I expect 'font-family' css property of 'Label' to contain 'Fira'
 */
Then(
    'I expect {string} css property of {string} {cypressValidation} {string}',
    function (property: string, alias: string, validationType: string, value: string) {
        const propertyName = getValue(property);
        const expectedValue = getValue(value);
        const element = getElement(alias);
        const validation = getValidation(validationType);
        element.then((e: JQuery) => {
            validation(e.css(propertyName), expectedValue);
        });
    }
);

/**
 * Verify that text of an alert meets expectation
 * @param {string} validationType - validation
 * @param {string} value - expected text value
 * @example I expect text of alert does not contain 'coffee'
 */
Then(
    'I expect text of alert {cypressValidation} {string}',
    function (validationType: string, expectedValue: string) {
        const validation = getValidation(validationType);
        const alertHandler = new Cypress.Promise((resolve, reject) => {
            cy.on('window:alert', (alertText)=> {
                resolve(alertText)
            });
            cy.on('window:confirm', (alertText)=> {
                resolve(alertText)
            });
        });
        return alertHandler.then(alertText => { validation(alertText, expectedValue) })
    }
);
