import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { ref } from 'vue';
// import { email as customEmail } from '~/validation/rules/email';
// import { password as customPassword } from '~/validation/rules/password';

export function useValidation() {
  const LoginForm = ref({
    email: '',
    password: '',
  });

  const RegisterForm = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const LoginRules = {
    email: { required, email },
    password: { required },
  };

  const RegisterRules = {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    password_confirmation: { required, sameAsPassword: sameAs(() => formRegister.value.password) },
  };
  
  const v$Login = useVuelidate(LoginRules, LoginForm);
  const v$Register = useVuelidate(RegisterRules, RegisterForm);

  return { LoginForm, v$Login, RegisterForm, v$Register };
}