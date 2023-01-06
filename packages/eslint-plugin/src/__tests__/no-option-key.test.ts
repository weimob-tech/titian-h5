import { RuleTester } from 'eslint';
import { noOptionKey } from '../rules/no-option-key';

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

ruleTester.run('no-option-key', noOptionKey, {
  valid: [`const a = {a:1, b: 2}`],
  invalid: [
    {
      code: `const a = {option: {}}`,
      errors: [{ message: `don't use 'option' as key, please replace with 'options'` }],
    },
    {
      code: `Component({
              properties: {
                option: {
                  type: String,
                  value: '',
                },
              },
            })`,
      errors: [{ message: `don't use 'option' as key, please replace with 'options'` }],
    },
  ],
});
