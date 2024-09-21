import { ID, Query } from "node-appwrite"
import { users, account, database, DATABASE_ID, CATEGORY_COLLECTION_ID, TASK_COLLECTION_ID } from "../appwrite.config"
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

export const getUser = async () => {
    try {
        const user = await users.list()
        // console.log(user)
        return parseStringify(user)
    } catch(error) {
        console.log(error)
    }
}


export const loginUser = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        // console.log(session)
        return parseStringify(session);
    } catch (error) {
        console.error('Login error:', error);
    }
}

// const sessionId = localStorage.getItem('sessionId');
// console.log(sessionId);


// export const logoutUser = async (userId: string) => {
//     try {
  
//       const result = await account.deleteSession(userId);
//       console.log("User session deleted successfully");
//       return parseStringify(result);
//     } catch (error) {
//       console.error("Error deleting user session:", error);
//       throw error;
//     }
// }


// *** POST REQUEST ***

export const createCategory = async (data:{category: string}) => {
    try {
  
        const response = await database.createDocument(
            DATABASE_ID!,
            CATEGORY_COLLECTION_ID!,
            ID.unique(),
            data
        )
        // console.log(response);
        return parseStringify(response);
    } catch (error) {
      console.error("Error deleting user session:", error);
      throw error;
    }
}

export const createTask = async (data: CreateTaskParams) => {
    try {
  
        const response = await database.createDocument(
            DATABASE_ID!,
            TASK_COLLECTION_ID!,
            ID.unique(),
            data
        )
        // console.log(response);
        return parseStringify(response);
    } catch (error) {
      console.error("Error deleting user session:", error);
      throw error;
    }
}


// *** GET REQUEST ***

export const getCategory = async () => {
    try {
      const response = await database.listDocuments(
        DATABASE_ID!,
        CATEGORY_COLLECTION_ID!,
        // [Query.equal("userId", [userId])]
      );
      return parseStringify(response);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the patient details:",
        error
      );
    }
};

export const getTask = async (userId: string) => {
    try {
      const response = await database.listDocuments(
        DATABASE_ID!,
        TASK_COLLECTION_ID!,
        [Query.equal("userId", [userId])]
      );
      return parseStringify(response);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the patient details:",
        error
      );
    }
};


// *** UPDATE REQUEST ***

export const updateTask = async (id: string, data: CreateTaskParams) => {
    try {
      const response = await database.updateDocument(
        DATABASE_ID!,
        TASK_COLLECTION_ID!,
        id,
        data
      );
      return parseStringify(response);
    } catch (error) {
      console.error("An error occurred while updating the task:", error);
    }
};


// *** DELETE REQUEST ***

export const deleteCategoryDocument = async (id: string) => {
    try {
      const response = await database.deleteDocument(
        DATABASE_ID!,
        CATEGORY_COLLECTION_ID!,
        id
      );
      return parseStringify(response);
    } catch (error) {
      console.error("An error occurred while updating the task:", error);
    }
};

export const deleteTaskDocument = async (id: string) => {
    try {
      const response = await database.deleteDocument(
        DATABASE_ID!,
        TASK_COLLECTION_ID!,
        id
      );
      return parseStringify(response);
    } catch (error) {
      console.error("An error occurred while updating the task:", error);
    }
};
  
  