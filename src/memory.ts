import memory from '@qavajs/memory';
import { When } from '@badeball/cypress-cucumber-preprocessor';
import { getElement, getValue } from './transformers';

/**
 * Save text of element to memory
 * @param {string} alias - element to get value
 * @param {string} key - key to store value
 * @example I save text of '#1 of Search Results' as 'firstSearchResult'
 */
When('I save text of {string} as {string}', function (alias: string, key: string) {
    const element = getElement(alias);
    element.then((e: JQuery) => {
        memory.setValue(key, e.text());
    });
});

/**
 * Save property of element to memory
 * @param {string} property - property to store
 * @param {string} alias - element to get value
 * @param {string} key - key to store value
 * @example I save 'checked' property of 'Checkbox' as 'checked'
 * @example I save '$prop' property of 'Checkbox' as 'checked'
 */
When('I save {string} property of {string} as {string}', function (property: string, alias: string, key: string) {
    const element = getElement(alias);
    const propertyName = getValue(property);
    element.then((e: JQuery) => {
        memory.setValue(key, e.prop(propertyName));
    });
});

/**
 * Save attribute of element to memory
 * @param {string} attribute - attribute to store
 * @param {string} alias - element to get value
 * @param {string} key - key to store value
 * @example I save 'href' attribute of 'Link' as 'linkHref'
 * @example I save '$prop' attribute of 'Link' as 'linkHref'
 */
When('I save {string} attribute of {string} as {string}', function (attribute: string, alias: string, key: string) {
    const element = getElement(alias);
    const attributeName = getValue(attribute);
    element.then((e: JQuery) => {
        memory.setValue(key, e.attr(attributeName));
    });
});

/**
 * Save number of elements in collection to memory
 * @param {string} alias - collection to get value
 * @param {string} key - key to store value
 * @example I save number of elements in 'Search Results' as 'numberOfSearchResults'
 */
When('I save number of elements in {string} collection as {string}', function (alias: string, key: string) {
    const collection = getElement(alias);
    collection.then((c: JQuery) => {
        memory.setValue(key, c.length);
    });
});

/**
 * Save array of texts of collection to memory
 * @param {string} alias - collection to get values
 * @param {string} key - key to store value
 * @example I save text of every element of 'Search Results' collection as 'searchResults'
 */
When(
    'I save text of every element of {string} collection as {string}',
    function (alias: string, key: string) {
        const collection = getElement(alias);
        collection.then((c: JQuery) => {
            const values: string[] = [];
            c.each(function () {
                values.push(Cypress.$(this).text());
            })
            memory.setValue(key, values);
        });
    }
);

/**
 * Save array of attributes of collection to memory
 * @param {string} alias - collection to get values
 * @param {string} key - key to store value
 * @example I save 'checked' attribute of every element of 'Search > Checkboxes' collection as 'checkboxes'
 */
When(
    'I save {string} attribute of every element of {string} collection as {string}',
    function (attribute: string, alias: string, key: string) {
        const collection = getElement(alias);
        collection.then((c: JQuery) => {
            const values: any[] = [];
            c.each(function () {
                values.push(Cypress.$(this).attr(attribute));
            })
            memory.setValue(key, values);
        });
    }
);

/**
 * Save array of property of collection to memory
 * @param {string} alias - collection to get values
 * @param {string} key - key to store value
 * @example I save 'href' property of every element of 'Search > Links' collection as 'hrefs'
 */
When(
    'I save {string} property of every element of {string} collection as {string}',
    function (property: string, alias: string, key: string) {
        const collection = getElement(alias);
        collection.then((c: JQuery) => {
            const values: any[] = [];
            c.each(function () {
                values.push(Cypress.$(this).prop(property));
            })
            memory.setValue(key, values);
        });
    }
);

/**
 * Save current url to memory
 * @param {string} key - key to store value
 * @example I save current url as 'currentUrl'
 */
When('I save current url as {string}', function (key: string) {
    cy.url().then((url: string) => {
        memory.setValue(key, url);
    });
});

/**
 * Save current page title to memory
 * @param {string} key - key to store value
 * @example I save page title as 'currentTitle'
 */
When('I save page title as {string}', function (key: string) {
    cy.title().then((title: string) => {
        memory.setValue(key, title);
    });
});

// /**
//  * Save page screenshot into memory
//  * @param {string} key - key to store value
//  * @example I save screenshot as 'screenshot'
//  */
// When('I save screenshot as {string}', function(key: string) {
//     const screenshot = page.screenshot();
//     memory.setValue(key, screenshot);
// });
//
/**
 * Save css property of element to memory
 * @param {string} property - property to store
 * @param {string} alias - element to get value
 * @param {string} key - key to store value
 * @example I save 'color' css property of 'Checkbox' as 'checkboxColor'
 * @example I save '$propertyName' property of 'Checkbox' as 'checkboxColor'
 */
When('I save {string} css property of {string} as {string}', function (property: string, alias: string, key: string) {
    const propertyName = getValue(property);
    const element = getElement(alias);
    element.then((e: JQuery) => {
        memory.setValue(key, e.css(propertyName));
    });
});
