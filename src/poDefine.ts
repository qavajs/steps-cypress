import { When } from '@badeball/cypress-cucumber-preprocessor';
import { po, $, $$ } from '@qavajs/po-cypress';
import { getValue } from './transformers';

/**
 * Register selector as page object
 * @param {string} selectorKey - selector to register
 * @param {string} aliasKey - alias of element
 * @example
 * When I define '#someId' as 'My Button' element
 * And I click 'My Button'
 *
 * When I define 'li.selected' as 'Selected Items' collection
 * And I expect number of element in 'Selected Items' collection to equal '3'
 */
When('I define {string} as {string} {cypressPoType}', function (
    selectorKey: string, aliasKey: string, poType: string
) {
    const selector = getValue(selectorKey);
    const alias = getValue(aliasKey).replace(/\s/g, '');
    const defineElement = poType === 'element' ? $ : $$;
    po.register({ [alias]: defineElement(selector) });
});
