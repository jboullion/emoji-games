export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export function validateEmail(email: string) {
  let error = '';
  if (!email) {
    error = 'Email is Required';
  } else if (!EMAIL_REGEX.test(email)) {
    error = 'Email must be a valid email address';
  }

  return error;
}

export function validatePassword(password: string) {
  let error = '';
  if (!password) {
    error = 'Password is Required';
  } else if (password.length < 8) {
    error = 'Password must be at least 8 characters long';
  } else if (password.length > 32) {
    error = 'Password must be less than 32 characters long';
  }

  return error;
}

export function validateUsername(username: string) {
  let error = '';
  if (!username) {
    error = 'Username is Required';
  } else if (username.length < 3) {
    error = 'Username must be at least 3 characters long';
  } else if (username.length > 20) {
    error = 'Username must be less than 20 characters long';
  }

  return error;
}
