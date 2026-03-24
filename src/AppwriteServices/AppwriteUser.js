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
    async createUserDocument(user){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteUsersCollectionID,
                ID.unique(),
                {
                    userID: user.$id,
                    email: email,
                    role: "admin"
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
            const response= await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteUsersCollectionID,
                [
                    Query.equal("userID", userID)
                ]
            );
            return response.documents[0] || null;
        }
        catch(error){
            console.log("Appwrite :: getUserByID :: error :: ",error);
            throw error;
        }
    }

    //getting the role by user ID
    async getUserRole(userID) {
        const user = await this.getUserByID(userID);
        return user?.role || null;
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