import { When } from '@badeball/cypress-cucumber-preprocessor';
import { getValue } from './transformers';
import memory from '@qavajs/memory';

/**
 * Set value of local/session storage
 * @param {string} storageKey - local/session storage key to set value
 * @param {string} storageType - storage type (local or session)
 * @param {string} value - value to set
 * @example I set 'username' local storage value as 'user1'
 * @example I set '$sessionStorageKey' session storage value as '$sessionStorageValue'
 */
When('I set {string} {word} storage value as {string}', function (storageKey: string, storageType: string, value: string) {
    const resolvedValue = getValue(value);
    cy.window().then((win: Window) => {
        console.log(win)
        // @ts-ignore
        win[storageType + 'Storage'].setItem(storageKey, resolvedValue);
    });
});

/**
 * Save value of local/session storage to memory
 * @param {string} storageKey - local/session storage key to set value
 * @param {string} storageType - storage type (local or session)
 * @param {string} key - memory key
 * @example I save value of 'username' local storage as 'localStorageValue'
 * @example I save value of '$sessionStorageKey' session storage value as 'sessionStorageValue'
 */
When('I save value of {string} {word} storage as {string}', function (storageKey: string, storageType: string, key: string) {
    const resolvedStorageKey = getValue(storageKey);
    cy.window().then((win: Window) => {
        console.log(win)
        // @ts-ignore
        memory.setValue(key, win[storageType + 'Storage'].getItem(resolvedStorageKey));
    });
});
