/**
 * These functions are for working with the HTML document
 */

export function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    //window.screen.orientation.unlock();
    //.then(() => console.log('Document Exited from Full screen mode'))
    //.catch((err) => console.error(err));
  } else {
    document.documentElement.requestFullscreen();
    //window.screen.orientation.lock('landscape');
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

// Target the
export function trapFocus(inputID: string, modalID: string) {
  const modal = document.getElementById(modalID);
  const input = document.getElementById(inputID);

  if (modal && input) {
    modal.addEventListener('shown.bs.modal', function () {
      input.focus();
    });
  }
}

export function scrollToBottom(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}
