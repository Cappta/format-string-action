const {run} = require('./index.js');
const core = require('@actions/core');

jest.mock('@actions/core');

function mockGetInput(requestResponse) {
    return function (name, options) { // eslint-disable-line no-unused-vars
        return requestResponse[name]
    }
}

const DEFAULT_INPUTS = {
    'value': undefined,
    'format': undefined
};

describe('Format String', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        core.getInput = jest
            .fn()
            .mockImplementation(mockGetInput(DEFAULT_INPUTS));
    });

    test('with docker', async () => {
        const mockInputs = {
            'value': '123_Format_String_Action_456',
            'format': 'docker'
        };
        core.getInput = jest
            .fn()
            .mockImplementation(mockGetInput(mockInputs));

        await run();
        expect(core.setOutput).toHaveBeenNthCalledWith(1, 'formatted', 'format-string-action');
    });

    test('with invalid format', async () => {
        const mockInputs = {
            'value': '123_Format_String_Action_456',
            'format': 'invalid'
        };
        core.getInput = jest
            .fn()
            .mockImplementation(mockGetInput(mockInputs));

        await run();
        expect(core.setFailed).toHaveBeenNthCalledWith(1, 'Unknown format: invalid');
    });
});
