import { helpers } from '@vuelidate/validators';

export const email = helpers.withMessage(
  'This is not a valid email address',
  value => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }
);