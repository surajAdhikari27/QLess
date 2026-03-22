config={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTokensCollectionID: String(import.meta.env.VITE_APPWRITE_TOKENS_COLLECTION_ID),
    appwriteQueueMetaCollectionID: String(import.meta.env.VITE_APPWRITE_QUEUE_META_COLLECTION_ID),
    appwriteUsersCollectionID: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID)
}

export default config