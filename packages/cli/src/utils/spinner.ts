// eslint-disable-next-line import/no-import-module-exports
import { Spinner } from 'cli-spinner';

export function spinner(message = 'loading..', str = '|/-\\') {
  const spinnerInstance = new Spinner(`${message} %s `);
  spinnerInstance.setSpinnerString(str);
  spinnerInstance.start();

  return spinnerInstance;
}

export default {};
