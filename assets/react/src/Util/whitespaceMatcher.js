import {equals, map} from 'ramda';
import {matcherHint, printExpected, printReceived} from 'jest-matcher-utils';
import diff from 'jest-diff';

const replaceWhitespace = (str) => {
  return str.replace(/\s+/g, ` `).replace(/> /g, `>`);
};
const compressWhitespace = map(replaceWhitespace);

const name = `toEqualWithCompressedWhitespace`;

export default (received, expected) => {
  const [
    receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace,
  ] = compressWhitespace([received, expected]);
  const pass = equals(
    receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace
  );
  const message = pass
    ? () =>
      `${matcherHint(`.not.${name}`)}\n\n` +
      `Uncompressed expected value:\n` +
      `  ${printExpected(expected)}\n` +
      `Expected value with compressed whitespace to not equal:\n` +
      `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
      `Uncompressed received value:\n` +
      `  ${printReceived(received)}\n` +
      `Received value with compressed whitespace:\n` +
      `  ${printReceived(receivedWithCompresssedWhitespace)}`
    : () => {
      const diffString = diff(
        expectedWithCompresssedWhitespace,
        receivedWithCompresssedWhitespace,
        {
          expand: this.expand,
        }
      );
      return (
        `${matcherHint(`.${name}`)}\n\n` +
        `Uncompressed expected value:\n` +
        `  ${printExpected(expected)}\n` +
        `Expected value with compressed whitespace to equal:\n` +
        `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
        `Uncompressed received value:\n` +
        `  ${printReceived(received)}\n` +
        `Received value with compressed whitespace:\n` +
        `  ${printReceived(receivedWithCompresssedWhitespace)}${
          diffString ? `\n\nDifference:\n\n${diffString}` : ``
        }`
      );
    };
  return {
    actual: received,
    expected,
    message,
    name,
    pass,
    receivedWithCompresssedWhitespace: receivedWithCompresssedWhitespace,
    expectedWithCompresssedWhitespace: expectedWithCompresssedWhitespace,
  };
};