import axios from "axios";

// Post

export const getAllPosts = async () => {
   try {
      const { data } = await axios.get("/api/posts");
      return data;
   } catch (error) {
      if (error.response && error.response.data.message)
         throw new Error(error.response.data.message);
      throw new Error(error.message);
   }
};

export const getSinglePost = async ({ slug }) => {
   try {
      const { data } = await axios.get(`/api/posts/${slug}`);
      return data;
   } catch (error) {
      if (error.response && error.response.data.message)
         throw new Error(error.response.data.message);
      throw new Error(error.message);
   }
};

export const createPost = async ({ token, postData }) => {
   try {
      const config = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };

      const { data } = await axios.post(`/api/posts`, postData, config);
      return data;
   } catch (error) {
      if (error.response && error.response.data.message)
         throw new Error(error.response.data.message);
      throw new Error(error.message);
   }
};
