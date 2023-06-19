import { Before, Then } from '@badeball/cypress-cucumber-preprocessor';
import memory from '@qavajs/memory';
import Memory from '../memory';
import PO from '../page_object';
import { po } from '@qavajs/po-cypress';
import { expect } from 'chai';
Before(function () {
    po.init(cy, {} as any);
    po.register(new PO());
    memory.register(new Memory());
});

Then('I expect {string} memory value to be equal {string}', function(actual: string, expected: string) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(expectedValue).to.eql(actualValue);
});

Then('I expect {string} memory value to contain {string}', function(actual: string, expected: string) {
    const actualValue = memory.getValue(actual);
    const expectedValue = memory.getValue(expected);
    expect(actualValue).to.contain(expectedValue);
});
