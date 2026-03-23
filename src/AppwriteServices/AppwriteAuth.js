import { Client, Account, ID } from "appwrite";
import config from '../config'
export class AppwriteAuth{
    client= new Client();
    account;

    constructor(){
        this.client
            .setProject(config.appwriteProjectID)
            .setEndpoint(config.appwriteUrl)

        this.account= new Account(this.client);
    }

    //creating an account 
    async signup(emailID, password){
        try{
            const userAccount= await this.account.create(ID.unique(), emailID, password);
            if(userAccount){
                return await this.login(emailID, password)
            }
            else{
                return userAccount
            }
        }
        catch(error){
            console.log("Appwrite :: CreateAccount :: signup :: ",error);
        }
    }

    //login
    async login(emailID, password){
        try{
            return await this.account.createEmailPasswordSession(emailID, password);
        }
        catch(error){
            console.log("Appwrite :: login :: error :: ", error);
            throw error;
        }
    }

    //login with google
    loginWithGoogle(provider, success, failure){
        try{
            return this.account.createOAuth2Session("google",
                "http://localhost:5173/admin", "http://localhost:5173/login")
        }
        catch(error){
            console.log("Appwrite :: loginWithGoogle :: error :: ",error);
            throw error;
        }
    }

    //getting current user
    async getCurrentUser(){
        try{
            return await this.account.get()
        }
        catch(error){
            return null;
        }
    }

    //logout or deleting the session
    async logout(){
        try{
            return await this.account.deleteSession("current")
        }
        catch(error){
            console.log("Appwrite :: logout :: error :: ", error);
            throw error;
        }
    }
}

const AppwriteAuthService= new AppwriteAuth()
export default AppwriteAuthService;

