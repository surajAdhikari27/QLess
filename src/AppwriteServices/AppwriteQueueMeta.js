import { Client, Databases, ID, Query } from "appwrite";
import config from '../config'

export class AppwriteQueueMeta{
    client = new Client()
    databases;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID)
        
        this.databases= new Databases(this.client)
    }

    //getting a queue meta
    async getQueueMeta(){
        try{
            const response= await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteQueueMetaCollectionID
            );
            return response.documents[0];
        }
        catch(error){
            console.log("Appwrite :: getQueueMeta :: error :: ",error);
            throw error;
        }
    }

    //updating (incrementing) token number
    async incrementTokenNumber({docID, lastTokenNumber}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteQueueMetaCollectionID,
                docID,
                {
                    lastToken: lastTokenNumber+1,
                    updatedAt : new Date().toISOString()
                }
            );
        }
        catch(error){
            console.log("Appwrite :: incrementTokenNumber :: error :: ", error);
            throw error;
        }
    }

    //update current token
    async updateCurrentToken({docID, newTokenNumber}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteQueueMetaCollectionID,
                docID,
                {
                    currentToken: newTokenNumber,
                    updatedAt: new Date().toISOString()
                }
            );
        }
        catch(error){
            console.log("Appwrite :: updateCurrentToken :: error :: ", error);
            throw error;
        }
    }

    // reset queue 
    async resetQueue({docID}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteQueueMetaCollectionID,
                docID,
                {
                    currentToken: 0,
                    lastToken: 0,
                    updatedAt: new Date().toISOString()
                }
            );
        }
        catch(error){
            console.log("Appwrite :: resetQueue :: error :: ",error);
            throw error;
        }
    }
}

const AppwriteQueueMetaService= new AppwriteQueueMeta();
export default AppwriteQueueMetaService;