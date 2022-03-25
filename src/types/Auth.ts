export interface IAuthCredentials {
  username?: string;
  email: string;
  password: string;
}

export interface IAuthRefreshCredentials {
  email: string;
  refreshToken: string;
}

export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthForm {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
}
