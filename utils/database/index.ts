import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: process.env.NEXT_PUBLIC_FIRESTORE_PRIVATE_KEY.replace(
          /\\n/g,
          '\n'
        ),
        projectId: process.env.NEXT_PUBLIC_FIRESTORE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIRESTORE_CLIENT_EMAIL,
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIRESTORE_DATABASE_URL,
    });
  } catch (error) {
    throw new Error(`Firebase admin initialization error: ${error.stack}`);
  }
}
export default admin.firestore();
