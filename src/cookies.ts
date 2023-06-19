import { When } from '@badeball/cypress-cucumber-preprocessor';
import { getValue } from './transformers';
import memory from '@qavajs/memory';
import Cookie = Cypress.Cookie;

/**
 * Set cookie
 * @param {string} cookie - cookie name
 * @param {string} value - value to set
 * @example I set 'userID' cookie 'user1'
 * @example I set 'userID' cookie '$userIdCookie'
 */
When('I set {string} cookie as {string}', function (cookie: string, value: string) {
    const cookieValue = getValue(value);
    const cookieObject = typeof cookieValue === 'object' ? cookieValue : { value: cookieValue };
    cy.setCookie(cookie, cookieObject.value, cookieObject);
});

/**
 * Save cookie value to memory
 * @param {string} cookie - cookie name
 * @param {string} key - memory key
 * @example I save value of 'auth' cookie as 'authCookie'
 */
When('I save value of {string} cookie as {string}', function (cookie: string, key: string) {
    const cookieName = getValue(cookie);
    cy.getCookie(cookieName).then((cookie: any) => {
        memory.setValue(key, cookie);
    });
});
