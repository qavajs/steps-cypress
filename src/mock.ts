import { When } from '@badeball/cypress-cucumber-preprocessor';
import { getValue } from './transformers';
import memory from '@qavajs/memory';

/**
 * Create simple mock instance
 * @param {string} urlTemplate - minimatch url template to mock
 * @param {string} memoryKey - memory key to store mock instance
 * @example When I create mock for '/yourservice/**' as 'mock1'
 * @example When I create mock for '$mockUrlTemplate' as 'mock1'
 */
When('I create mock for {string} as {string}', function (urlTemplate: string, memoryKey: string) {
    const url = getValue(urlTemplate);
    memory.setValue(memoryKey, url);
});

function respondWith(mockKey: string, statusCode: string, body: string): void {
    const mockUrl: string = getValue(mockKey);
    const responseStatusCode: number = parseInt(getValue(statusCode));
    const responseBody = getValue(body);
    cy.intercept(mockUrl, {
        body: responseBody,
        statusCode: responseStatusCode
    });
}

/**
 * Add mocking rule to respond with desired status code and payload
 * @param {string} mockKey - memory key to get mock instance
 * @param {string} statusCode - status code
 * @param {string} body - response body
 * @example
 * When I create mock for '/yourservice/**' as 'myServiceMock'
 * And I set '$myServiceMock' mock to respond '200' with:
 * """
 * {
 *     "status": "success"
 * }
 * """
 */
When('I set {string} mock to respond {string} with:', respondWith);

/**
 * Add mocking rule to respond with desired status code and payload
 * @param {string} mockKey - memory key to get mock instance
 * @param {string} statusCode - status code
 * @param {string} body - response body
 * @example
 * When I create mock for '/yourservice/**' as 'myServiceMock'
 * And I set '$myServiceMock' mock to respond '200' with '$response'
 */
When('I set {string} mock to respond {string} with {string}', respondWith);

/**
 * Add mocking rule to abort request with certain reason
 * @param {string} mockKey - memory key to get mock instance
 * @param {string} reason - reason string see https://playwright.dev/docs/api/class-route#route-abort
 * @example
 * When I create mock for '/yourservice/**' as 'myServiceMock'
 * And I set '$myServiceMock' mock to abort with 'Failed' reason
 */
When('I set {string} mock to abort with {string} reason', function (mockKey: string, reason: string) {
    const mockUrl: string = getValue(mockKey);
    const errorCode: string = getValue(reason);
    cy.intercept(mockUrl, { forceNetworkError: true });
});
