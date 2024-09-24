import conf from "../conf/conf";
import { Client, Databases, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.databases = new Databases(this.client)

    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(error){
            console.log("Appwrite :: createPost :: error", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch(error){
            console.log("Appwrite :: updatePost :: error", error) 
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwritecollectionId,
                slug
            )
            return true
        } 
        catch (error) {
            console.log("Appwrite :: deletePost :: error", error) 
            return false
        }
    }

    async getPost(slug){
        try {
            return this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwritecollectionId,
                slug
            )
        } 
        catch (error) {
            console.log("Appwrite :: getPost :: error", error) 
        }
    }

    async getPosts(queries = [Query.equal("status", "true")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwritecollectionId,
                queries

            )
        } 
        catch (error) {
            console.log("Appwrite :: getposts :: error", error)  
            return false  
        }
    }


}

const appwriteService = new Service()

export default appwriteService