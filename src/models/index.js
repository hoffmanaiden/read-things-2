// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Like, PublicUser, Post, Follower, PublicUserFollower } = initSchema(schema);

export {
  Like,
  PublicUser,
  Post,
  Follower,
  PublicUserFollower
};