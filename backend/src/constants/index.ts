export const PG_CONNECTION = 'PG_CONNECTION';
export const DIALOG_SERVICE = 'dialog';
export const STORAGE_SERVICE = 'storage';
export const EVENTS_SERVICE = 'events';

export const DEFAULT_TIMEOUT = 30000; // Milliseconds
export const DEFAULT_MAX_EVENT_IMAGE = 9;
export const DEFAULT_MAX_USER_IMAGE = 9;
export const DEFAULT_MAX_RELATIVE_IMAGE = 9;
export const DEFAULT_MAX_EVENT_COMMENTS_IMAGES = 3;
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE = 1;
export const AVATAR_SEQUENCE = -1;

export const FILES_DEST = Object.freeze({
  EVENTS_DIR: 'events',
  USERS_DIR: 'users',
  MESSAGES_IMG_DIR: 'messages/images',
  MESSAGES_AUDIO_DIR: 'messages/audio',
  MESSAGES_VIDEO_DIR: 'messages/video',
  RELATIVES_DIR: 'relatives',
  EVENT_COMMENTS_DIR: 'event-comments',
});

export const DIALOG = Object.freeze({
  SEND_FILE: 'send.file',
});

export const EVENTS = Object.freeze({
  COMMENT: 'comment.event',
});

export const STORAGE = Object.freeze({
  DELETE_FILE: 'delete.file'
})
