import { Client, Databases, ID, Query } from "appwrite";
import config from '../config'

export class AppwriteTokens{
    client= new Client()
    databases;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID)

        this.databases= new Databases(this.client)
    }

    //creating token
    async createToken({name, tokenNumber}){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteTokensCollectionID,
                ID.unique(),
                {
                    name,
                    tokenNumber,
                    status: "waiting",
                    createdAt: new Date().toISOString(),
                    servedAt: null
                }
            );
        }
        catch(error){
            console.log("Appwrite :: createToken :: error :: ", error);
            throw error;
        }
    }

    //getting all tokens
    async getAllTokens(){
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteTokensCollectionID,
                [
                    Query.orderAsc("tokenNumber")
                ]
            );
        }
        catch(error){
            console.log("Appwrite :: getAllTokens :: error :: ",error);
            throw error;
        }
    }

    //updating the token status
    async updateTokenStatus(docID, newStatus){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteTokensCollectionID,
                docID,
                {
                    status: newStatus,
                    servedAt: newStatus === "completed" 
                        ? new Date().toISOString() 
                        : null
                }
            );
        }
        catch(error){
            console.log("Appwrite :: updateTokenStatus :: error :: ",error);
            throw error;
        }
    }

    //deleting token
    async deleteAllTokens() {
    try {
        const response = await this.getAllTokens();

        const deletePromises = response.documents.map((doc) =>
            this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteTokensCollectionID,
                doc.$id
            )
        );

        await Promise.all(deletePromises);
    } catch (error) {
        console.log("Appwrite :: deleteAllTokens :: error :: ", error);
        throw error;
    }
}
}

const AppwriteTokensService = new AppwriteTokens()
export default AppwriteTokensService;