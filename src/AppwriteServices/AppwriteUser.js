import { Client, Databases, ID, Query } from "appwrite";
import config from '../config'

export class AppwriteUser{
    client= new Client()
    databases;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID)

        this.databases= new Databases(this.client);
    }

    //creating the user document(row)
    async createUserDocument({ userID, email, role = "user" }){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteUsersCollectionID,
                ID.unique(),
                {
                    userID: userID,
                    email: email,
                    role: role
                }
            );
        }
        catch(error){
            console.log("Appwrite :: createUserDocument :: error :: ",error);
            throw error;
        }
    }

    //getting user by id
    async getUserByID(userID){
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteUsersCollectionID,
                [
                    Query.equal("userID", userID)
                ]
            );
        }
        catch(error){
            console.log("Appwrite :: getUserByID :: error :: ",error);
            throw error;
        }
    }

    //getting the role by user ID
    async getUserRole(userID) {
        const user = await this.getUserByID(userID);
        if(user.documents.length > 0){
            return user.documents[0].role;
        }
        return null;
    }

    //updating the user role
    async updateUserRole({docID, newRole}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteUsersCollectionID,
                docID,
                {
                    role: newRole
                }

            );
        }
        catch(error){
            console.log("Appwrite :: updateUserRole :: error :: ",error);
            throw error;
        }
    }

}

const AppwriteUserService= new AppwriteUser()
export default AppwriteUserService;