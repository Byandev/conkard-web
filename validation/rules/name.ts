import { helpers } from '@vuelidate/validators';

export const username = helpers.withMessage(
  'Username must be alphanumeric and between 3 to 16 characters',
  helpers.regex('username', /^[a-zA-Z0-9]{3,16}$/)
);