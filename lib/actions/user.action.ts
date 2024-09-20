import { ID, Query } from "node-appwrite"
import { users, account } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async (user: CreateUserParams) => {
    try {
        const newuser = await users.create(
            ID.unique(),
            user.email,
            undefined,
            user.password,
            user.username
        );
        return parseStringify(newuser);
    } catch (error: any) {
        if (error && error?.code === 409) {
            const existingUser = await users.list([
            Query.equal("email", [user.email]),
            ]);
            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user:", error);
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = users.get(userId)
        return parseStringify(user)
    } catch(error) {
        console.log(error)
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        console.log(session)
        return parseStringify(session);
    } catch (error) {
        console.error('Login error:', error);
    }
}

// const sessionId = localStorage.getItem('sessionId');
// console.log(sessionId);


// export const logoutUser = async () => {
//     try {
//         const sessionId = sessionStorage.getItem('sessionId');
        
//         if (!sessionId) {
//             throw new Error('No session ID found. User may not be logged in.');
//         }
//         const result = await account.deleteSession(sessionId);
//         console.log(result)
//         return parseStringify(result);
//     } catch (error) {
//         console.error('Login error:', error);
//     }
// }

  // Example usage:
//   login('user@example.com', 'password123');
  