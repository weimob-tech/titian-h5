import { RuleTester } from 'eslint';
import { checkLifeItems } from '../rules/check-life-items';

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

ruleTester.run('check-life-items', checkLifeItems, {
  valid: [
    `
    Component({
      lifetimes: {
        created(){},
        attached(){},
        ready(){},
        moved(){},
        detached(){},
        error(){},
      }
    })
  `,
  ],
  invalid: [
    {
      code: `Component({
        created(){},
        attached(){},
        ready(){},
        moved(){},
        detached(){},
        error(){},
      })`,
      errors: [
        { message: `created method should be declared in lifetimes field` },
        { message: `attached method should be declared in lifetimes field` },
        { message: `ready method should be declared in lifetimes field` },
        { message: `moved method should be declared in lifetimes field` },
        { message: `detached method should be declared in lifetimes field` },
        { message: `error method should be declared in lifetimes field` },
      ],
    },
    {
      code: `Component({
        created(){},
      })`,
      errors: [{ message: `created method should be declared in lifetimes field` }],
    },
    {
      code: `Component({
        attached(){},
      })`,
      errors: [{ message: `attached method should be declared in lifetimes field` }],
    },
    {
      code: `Component({
        moved(){},
      })`,
      errors: [{ message: `moved method should be declared in lifetimes field` }],
    },
    {
      code: `Component({
        detached(){},
      })`,
      errors: [{ message: `detached method should be declared in lifetimes field` }],
    },
    {
      code: `Component({
        error(){},
      })`,
      errors: [{ message: `error method should be declared in lifetimes field` }],
    },
  ],
});
