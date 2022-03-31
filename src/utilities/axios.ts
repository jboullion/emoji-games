import { AxiosError } from 'axios';

// Return Axios Errors
export function getAxiosError(error: AxiosError | any): string | null {
  if (error.response) {
    return error.response.data.message;

    // if (error.response.data?.statusCode === 400) {
    //   errors.value = error.response.data.message;
    // } else if (error.response.data?.statusCode === 401) {
    //   errors.value.push(error.response.data.message);
    // } else if (error.response.data?.statusCode === 409) {
    //   errors.value.push(error.response.data.message);
    // }
  } else {
    //Bugsnag.notify(new Error(error));
  }

  return null;
}
