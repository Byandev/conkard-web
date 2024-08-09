import { helpers } from '@vuelidate/validators';

export const password = helpers.withMessage(
  'Password must be at least 8 characters long',
  helpers.regex('password', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
);