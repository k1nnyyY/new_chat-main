export interface FileOwner {
  eventId?: number;
  userId?: number;
  messageSender?: number;
  relativeId?: number;
  audioSender?: number;
  eventCommentId?: number;
  videoSender?: number;
}

export interface FileOwnerData {
  key: string | null;
  value: number | string | null;
  limit: number | null;
}

export interface ImageSequence {
  imageId: number;
  sequence: number;
}
