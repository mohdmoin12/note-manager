export function generateShareLink(noteId) {
    return `${window.location.origin}/shared/${noteId}`;
  }