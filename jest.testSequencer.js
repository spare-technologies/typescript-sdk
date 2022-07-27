const Sequencer = require('@jest/test-sequencer').default;
const path = require('path');

/**
 * Order tests by their alphabetic name
 */
class AlphabetOrderTestSequencer extends Sequencer {
    sort(tests) {
        const copyTests = Array.from(tests);

        return copyTests.sort((testA, testB) => (path.parse(testA.path).base > path.parse(testB.path).base ? 1 : -1));
    }
}

module.exports = AlphabetOrderTestSequencer;
