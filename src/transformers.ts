import { conditionWait, conditionWaitExtractRegexp } from './conditionWait';
// @ts-ignore
import { po } from '@qavajs/po-cypress';
import memory from '@qavajs/memory';

export function getValue(alias: string): any {
    return memory.getValue(alias)
}

export function getElement(alias: string): any {
    return po.getElement(memory.getValue(alias))
}

export function getConditionWait(condition: string): Function {
    const match = condition.match(conditionWaitExtractRegexp) as RegExpMatchArray;
    if (!match) throw new Error(`${condition} wait is not implemented`);
    const [ _, reverse, validation ] = match;
    return function (element: any, timeout: number) {
        conditionWait(element, validation, timeout, Boolean(reverse))
    }
}
