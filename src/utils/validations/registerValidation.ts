import type { Rule } from 'antd/es/form';
import type { NamePath } from 'antd/es/form/interface';

export const nameRules: Rule[] = [
  { required: true, message: 'This field is required' },
  {
    pattern: /^[A-Za-z\s\-']+$/,
    message: 'Only letters are allowed',
  },
];

export const phoneRules: Rule[] = [
  { required: true, message: 'Phone number is required' },
  {
    pattern: /^\d{11}$/,
    message: 'Phone number must be exactly 11 digits',
  },
];

export const emailRules: Rule[] = [
  { required: true, message: 'Email is required' },
  {
    type: 'email',
    message: 'Enter a valid email',
  },
];

export const passwordRules: Rule[] = [
  { required: true, message: 'Password is required' },
  {
    min: 8,
    message: 'Password must be at least 8 characters',
  },
  {
    validator: (_, value) => {
      if (!value) return Promise.resolve();

      const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      return strongRegex.test(value)
        ? Promise.resolve()
        : Promise.reject(
            'Password must include uppercase, lowercase, number, and special character'
          );
    },
  },
];

// ✅ Fix: Properly typed getFieldValue with NamePath support
export const confirmPasswordRules = (
  getFieldValue: (name: NamePath) => any
): Rule[] => [
  { required: true, message: 'Confirm your password' },
  {
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('Passwords do not match');
    },
  },
];
