import { RuleTester } from 'eslint';
import { noMoreArgs } from '../rules/no-more-args';

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

ruleTester.run('no-more-args', noMoreArgs, {
  valid: [
    `function foo() {}`,
    `function foo(a) {}`,
    `function foo(a, b) {}`,
    `function foo(a, b, c) {}`,

    `function foo(a, {d}, c) {}`,
    `function foo(a, {d, e}, c) {}`,
    `function foo(a, {d, e, f}, c) {}`,

    `const foo = () => {}`,
    `const foo = (a) => {}`,
    `const foo = (a, b) => {}`,
    `const foo = (a, b, c) => {}`,

    `const foo = (a, {d}, c) => {}`,
    `const foo = (a, {d, e}, c) => {}`,
    `const foo = (a, {d, e, f}, c) => {}`,
  ],
  invalid: [
    { code: `function foo(a, b, c, d) {}`, errors: [{ message: `The parameter of foo method cannot exceed 4` }] },
    { code: `function foo(a, b, c, d, e) {}`, errors: [{ message: `The parameter of foo method cannot exceed 4` }] },

    { code: `const foo = (a, b, c, d)=> {}`, errors: [{ message: `The parameter of foo method cannot exceed 4` }] },
    { code: `const foo = (a, b, c, d, e)=> {}`, errors: [{ message: `The parameter of foo method cannot exceed 4` }] },

    {
      code: `const foo = ({a, b, c, d})=> {}`,
      errors: [{ message: `arguments destructuring should not have more than 4 property` }],
    },
    {
      code: `const foo = ({a, b, c, d, e})=> {}`,
      errors: [{ message: `arguments destructuring should not have more than 4 property` }],
    },

    {
      code: `const foo = (a, b, c, d, {e, f, g, h, j})=> {}`,
      errors: [
        { message: `The parameter of foo method cannot exceed 4` },
        { message: `arguments destructuring should not have more than 4 property` },
      ],
    },
  ],
});
