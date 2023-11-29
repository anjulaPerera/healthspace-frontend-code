export interface Comment {
  _id: string;
  userId: string;
  text: string;
  createdAt: Date;
}

export interface Like {
  _id: string;
  userId: string;
}

export interface Posts {
    _id: string;
  content: string;
  images?: string;
  likesFrom: Like[];
  commentsFrom: Comment[];
    userId: string;
    createdAt: Date;
}
