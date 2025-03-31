import { api } from "../APIBase";

export const getUserProfile = async () => {
    try {
      const response = await api.get("/profynus-user/profile", { withCredentials: true });
  
      if (response.status === 200) {
        return response.data;
      } else {
        console.log(response);
        return null;
      }
    } catch (e) {
      console.error("Error fetching user profile:", e);
      return null;
    }
};