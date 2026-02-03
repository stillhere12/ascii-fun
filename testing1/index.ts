import { styleText } from 'node:util';
import { stderr } from 'node:process';

// Bun.color() return's color code string

const red = Bun.color('red', 'ansi');
console.log(red);
console.log(JSON.stringify(red));

console.log(typeof red); // string
// this string is not visible in terminal

console.log(`${red} This text is red!`);

const redFromNode = styleText('red', 'Hello from stderr');
console.log(typeof redFromNode);

stderr.write(redFromNode);
stderr.write('\n');

const successMessage = styleText('green', 'Hello from stderr');
stderr.write(successMessage);
stderr.write('\n');
const successMessage1 = styleText(['green', 'bold'], 'Hello from stderr');
stderr.write(successMessage1);
stderr.write('\n');
const successMessage2 = styleText(['underline', 'red'], 'Hello from stderr');
stderr.write(successMessage2);
stderr.write('\n');

// push pop are not available in typed arrays
const arr = new Uint8Array([1, 2, 3]);
const newarr = arr.map((e) => e * 2);
console.log(newarr);
arr.forEach((e) => console.log(e));
// each entry in Uint8Array is 0-255
