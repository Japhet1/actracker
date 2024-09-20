import * as sdk from "node-appwrite"
import { loginUser } from "./actions/user.action"

// export const { 
//     PROJECT_ID, 
//     API_KEY, 
//     DATABASE_ID, 
//     PATIENT_COLLECTION_ID, 
//     APPOINTMENT_COLLECTION_ID, 
//     DOCTOR_COLLECTION_ID, 
//     NEXT_PUBLIC_BUCKET_ID,
//     NEXT_PUBLIC_ENDPOINT
// } = process.env

const PROJECT_ID="66eab31d001cdd29281c"
const API_KEY="standard_211005d65a3369aa7eb94dfafb739b3b94e9287519f00df5559775377f78650521ba02c55f20279f4d6c06f1ff10042ec1052e955f91be5b7dbe8466d45f1b81d728d6c5fdcdb087fab30b06033bc1fec2d284fd1168f951b7b81b42bc39d7739ab8519432bba3c9b4e4b0b696b1a8157c535d909877302710d0fd5251408b5a"
const DATABASE_ID="66eab4720010d2fa45af"
const NEXT_PUBLIC_BUCKET_ID="66eab4c7003748ca517c"
const NEXT_PUBLIC_ENDPOINT="https://cloud.appwrite.io/v1"


const client = new sdk.Client()
client.setEndpoint(NEXT_PUBLIC_ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!)


export const database = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const messaging = new sdk.Messaging(client)
export const users = new sdk.Users(client)

export const account = new sdk.Account(client)
 
// export const result = await account.deleteSessions();

export async function logoutUser(userId: string): Promise<void> {
    try {
      const client = new sdk.Client()
        .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
        .setProject(PROJECT_ID!)
        .setKey(API_KEY!)
  
      const account = new sdk.Account(client);
  
      await account.deleteSession(userId);
      console.log("User session deleted successfully");
    } catch (error) {
      console.error("Error deleting user session:", error);
      throw error;
    }
  }