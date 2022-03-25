/**
 * General / Common utility functions
 */

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Rearange an array randomly (Not perfect random)
 * @param array
 * @returns
 */
export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

/**
 * Prevent function from clogging thread by only running so often
 * @param delay
 * @param fn
 * @returns
 */
// https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
export function throttle(delay: number, fn: Function) {
  let lastCall = 0;
  return function (...args: any) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

/**
 * Turn a JWT into a readable object
 * @param token
 * @returns
 */
export function parseJwt(token: string) {
  if (!token) return false;
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

/**
 *
 * @param varName Get a single parameter from the URL query string
 * @returns
 */
export function getQueryVar(varName: string): string {
  let urlParams = new URLSearchParams(window.location.search);

  if (!urlParams.has(varName)) return '';
  return urlParams.get(varName) as string;
}
