import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "../../components/Header";
import { createPost } from "../../services/index/posts";
import "./newpost.css";
import "../home/container/container.css";
import SidebarLeft from "../../components/SidebarLeft";
import SidebarRight from "../../components/SidebarRight";
const NewPost = () => {
   const userState = useSelector((state) => state.user);
   const queryClient = useQueryClient();
   const [title, setTitle] = useState("");
   const [caption, setCaption] = useState("");
   const [photo, setPhoto] = useState(null);
   const [imagePreview, setImagePreview] = useState(null);

   const { isLoading: isLoadingCreatePost } = useMutation({
      mutationFn: async ({ token, title, caption, photo }) => {
         const formData = new FormData();
         formData.append("photo", photo);
         formData.append("title", title);
         formData.append("caption", caption);

         const response = await createPost({ token, formData });
         return response;
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries(["posts"]);
         toast.success("New Post Created Successfully");
         setPhoto(null);
         setImagePreview(null);
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   const handleAddNewPost = async () => {
      // Check if the user is logged in before proceeding
      if (!userState.userInfo) {
         toast.error("You need to be logged in to create a post.");
         return;
      }

      const token = userState.userInfo.token;

      // Check if title, caption, and photo are not empty
      if (!title.trim() || !caption.trim() || !photo) {
         toast.error("Title, caption, and photo are required.");
         return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("caption", caption);
      formData.append("photo", photo);

      try {
         const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
               Authorization: `Bearer ${token}`,
            },
            body: formData,
         });

         if (!response.ok) {
            throw new Error("Failed to create post");
         }

         const data = await response.json();
         console.log(data);

         queryClient.invalidateQueries(["posts"]);
         toast.success("New Post Created Successfully");
         setPhoto(null);
         setImagePreview(null);
      } catch (error) {
         toast.error(error.message);
      }
   };

   const handleImagePreview = (e) => {
      const file = e.target.files[0];
      setPhoto(file);

      const reader = new FileReader();
      reader.onloadend = () => {
         setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
   };
   return (
      <div>
         <Header />
         <div className="container new-post-container">
            <div className="sidebar-left sticky">
               <SidebarLeft />
            </div>
            <div className="newpost">
               {userState.userInfo ? (
                  <>
                     <h2 className="newpost-title">Create a New Post</h2>
                     <div className="post-title">
                        <label htmlFor="title">Title:</label>
                        <input
                           type="text"
                           id="title"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder="Title of the Post"
                        />
                     </div>
                     <div className="post-caption">
                        <label htmlFor="caption">Content:</label>
                        <textarea
                           rows="10"
                           cols="50"
                           id="caption"
                           value={caption}
                           onChange={(e) => setCaption(e.target.value)}
                        />
                     </div>

                     <div className="post-photo">
                        <label htmlFor="photo"></label>
                        <input
                           type="file"
                           id="photo"
                           accept="image/*"
                           onChange={handleImagePreview}
                           className="inputfile"
                        />
                     </div>
                     <div className="photo-preview-container">
                        {imagePreview && (
                           <img
                              src={imagePreview}
                              alt="Preview"
                              className="post-photo-preview"
                           />
                        )}
                     </div>
                     <div className="post-btn-container">
                        <button
                           disabled={isLoadingCreatePost}
                           onClick={handleAddNewPost}
                           className="post-btn"
                        >
                           Add Post
                        </button>
                     </div>
                  </>
               ) : (
                  <p>
                     You need to be logged in to create a post.{" "}
                     {/* You can customize this message */}
                     <a href="/login">Login</a>
                  </p>
               )}
            </div>
            <div className="sidebar-right sticky">
               <SidebarRight />
            </div>
         </div>
      </div>
   );
};

export default NewPost;
