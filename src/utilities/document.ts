/**
 * These functions are for working with the HTML document
 */

export function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    //.then(() => console.log('Document Exited from Full screen mode'))
    //.catch((err) => console.error(err));
  } else {
    document.documentElement.requestFullscreen();
  }
}

export function updateDarkMode(darkmode: boolean) {
  if (darkmode) {
    document.body.classList.add('darkmode');
  } else {
    document.body.classList.remove('darkmode');
  }
}

// copy an emoji to the users clipboard!
export function copy(string: string) {
  navigator.clipboard.writeText(string);
}
