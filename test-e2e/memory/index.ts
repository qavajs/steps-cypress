export default class Memory {
    valuesPage = './test-e2e/apps/values.html';
    actionsPage = './test-e2e/apps/actions.html';
    framePage = './test-e2e/apps/frame.html';
    waitsPage = './test-e2e/apps/waits.html';
    mockPage = './test-e2e/apps/mock.html';
    storagePage = './test-e2e/apps/storage.html';
    dragDropPage = './test-e2e/apps/dragdrop.html';

    array = (...args: Array<any>) => args;

    // @ts-ignore
    setInputValue = function() { return this.document.querySelector('#input').value = 'some value' };

    // @ts-ignore
    getActionInnerText = function() { return this.document.querySelector("#action").innerText };

    // @ts-ignore
    clickJS = target => target.click();

    // @ts-ignore
    getInnerText = target => target.innerText;

    userFromMemory = 'Mock 3';

    users = JSON.stringify([
        {"name": "Memory Mock 1"},
        {"name": "Memory Mock 2"},
        {"name": "Memory Mock 3"}
    ]);

    button2 = 'Button2';

    userInterceptionMatcher = {
        method: 'GET',
        url: '**/users'
    };

    uploadFile = 'test-e2e/apps/actions.html';
}

