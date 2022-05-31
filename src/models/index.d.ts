import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PublicUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Post {
  readonly id: string;
  readonly text?: string | null;
  readonly publicuserID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class PublicUser {
  readonly id: string;
  readonly username?: string | null;
  readonly Posts?: (Post | null)[] | null;
  readonly userImage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PublicUser, PublicUserMetaData>);
  static copyOf(source: PublicUser, mutator: (draft: MutableModel<PublicUser, PublicUserMetaData>) => MutableModel<PublicUser, PublicUserMetaData> | void): PublicUser;
}