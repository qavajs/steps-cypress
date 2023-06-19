export const conditionValidations = {
    PRESENT: 'present',
    // CLICKABLE: 'clickable',
    VISIBLE: 'visible',
    INVISIBLE: 'invisible',
    ENABLED: 'enabled',
    DISABLED: 'disabled'
}

const notClause = '(not )?';
const toBeClause = 'to (?:be )?';
const validationClause = `(${Object.values(conditionValidations).join('|')})`;

export const conditionWaitExtractRegexp = new RegExp(`^${notClause}${toBeClause}${validationClause}$`);
export const conditionWaitRegexp = new RegExp(`(${notClause}${toBeClause}${validationClause})`);

const not = (reverse: boolean) => reverse ? 'not.' : '';
const waits = {
    [conditionValidations.PRESENT]: (
        element: any,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.should(not(reverse) + 'exist'),
    [conditionValidations.VISIBLE]: (
        element: any,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.should(not(reverse) + 'be.visible'),
    [conditionValidations.INVISIBLE]: (
        element: any,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.should(not(reverse) + 'be.hidden'),
    [conditionValidations.ENABLED]: (
        element: any,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.should(not(reverse) + 'be.enabled'),
    [conditionValidations.DISABLED]: (
        element: any,
        reverse: boolean,
        timeout: number,
        timeoutMsg: string
    ) => element.should(not(reverse) + 'be.disabled'),
}
/**
 * Wait for condition
 * @param {any} element - element
 * @param {string} validationType - validation to perform
 * @param {number} [timeout] - timeout to wait
 * @param {boolean} [reverse] - negate flag
 * @return {Promise<void>}
 */
export function conditionWait(
    element: any,
    validationType: string,
    timeout: number = 10000,
    reverse: boolean = false
) {
    const timeoutMsg: string = `Element is${reverse ? '' : ' not'} ${validationType}`;
    const waitFn = waits[validationType];
    waitFn(element, reverse, timeout, timeoutMsg);
}
