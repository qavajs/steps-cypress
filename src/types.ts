import { defineParameterType } from '@badeball/cypress-cucumber-preprocessor';

defineParameterType({
    name: 'cypressValidation',
    regexp: /((?:is |do |does |to )?(not |to not )?(?:to )?(?:be )?(equal|strictly equal|deeply equal|have member|match|contain|above|below|greater than|less than|have type)(?:s|es)?)/,
    transformer: p => p
});

defineParameterType({
    name: 'cypressValueWait',
    regexp: /((not )?to (?:be )?(equal|contain|above|below|match))/,
    transformer: p => p
});

defineParameterType({
    name: 'cypressConditionWait',
    regexp: /((not )?to (?:be )?(present|clickable|visible|invisible|enabled|disabled))/,
    transformer: p => p
});

defineParameterType({
    name: 'cypressPoType',
    regexp: /(element|collection)/,
    transformer: p => p
});

defineParameterType({
    name: 'cypressTimeout',
    regexp: /(?:\(timeout: (\d+)\))?/,
    transformer: p => p ? parseInt(p) : null
});

defineParameterType({
    name: 'cypressMouseButton',
    regexp: /(left|right|middle)/,
    transformer: button => {
        switch (button) {
            case 'left': return 1;
            case 'middle': return 4;
            case 'right': return 2;
        }
    }
});
