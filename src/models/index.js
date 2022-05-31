// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, PublicUser } = initSchema(schema);

export {
  Post,
  PublicUser
};