import sdk from 'node-appwrite';

const client = new sdk.Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID).setKey(process.env.API_KEY);

const account = new sdk.Account(client);
const users = new sdk.Users(client);
const databases = new sdk.Databases(client);
const storage = new sdk.Storage(client);

const def = { account, users, databases, storage }
export { account, users, databases, storage }
export default def;