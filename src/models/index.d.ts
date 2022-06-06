import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type LikeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PublicUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FollowerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PublicUserFollowerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Like {
  readonly id: string;
  readonly True?: boolean | null;
  readonly PublicUser?: PublicUser | null;
  readonly Post?: Post | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly likePublicUserId?: string | null;
  readonly likePostId?: string | null;
  constructor(init: ModelInit<Like, LikeMetaData>);
  static copyOf(source: Like, mutator: (draft: MutableModel<Like, LikeMetaData>) => MutableModel<Like, LikeMetaData> | void): Like;
}

export declare class PublicUser {
  readonly id: string;
  readonly username?: string | null;
  readonly Posts?: (Post | null)[] | null;
  readonly userImage?: string | null;
  readonly Followers?: (PublicUserFollower | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PublicUser, PublicUserMetaData>);
  static copyOf(source: PublicUser, mutator: (draft: MutableModel<PublicUser, PublicUserMetaData>) => MutableModel<PublicUser, PublicUserMetaData> | void): PublicUser;
}

export declare class Post {
  readonly id: string;
  readonly text?: string | null;
  readonly publicuserID: string;
  readonly img?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class Follower {
  readonly id: string;
  readonly publicusers?: (PublicUserFollower | null)[] | null;
  readonly username?: string | null;
  readonly userImage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Follower, FollowerMetaData>);
  static copyOf(source: Follower, mutator: (draft: MutableModel<Follower, FollowerMetaData>) => MutableModel<Follower, FollowerMetaData> | void): Follower;
}

export declare class PublicUserFollower {
  readonly id: string;
  readonly publicUser: PublicUser;
  readonly follower: Follower;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PublicUserFollower, PublicUserFollowerMetaData>);
  static copyOf(source: PublicUserFollower, mutator: (draft: MutableModel<PublicUserFollower, PublicUserFollowerMetaData>) => MutableModel<PublicUserFollower, PublicUserFollowerMetaData> | void): PublicUserFollower;
}