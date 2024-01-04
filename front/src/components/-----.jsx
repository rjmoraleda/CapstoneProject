// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { createPost } from "../services/index/posts";

// function AddPost() {
//    const userState = useSelector((state) => state.user);
//    const queryClient = useQueryClient();

//    const [title, setTitle] = useState("");
//    const [caption, setCaption] = useState("");

//    const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
//       useMutation({
//          mutationFn: ({ token, postData }) => createPost({ token, postData }),
//          onSuccess: (data) => {
//             queryClient.invalidateQueries(["posts"]);
//             toast.success("New Post Created Successfully");
//             // You can redirect the user or perform other actions after successful post creation
//          },
//          onError: (error) => {
//             toast.error(error.message);
//          },
//       });

//    const handleAddNewPost = () => {
//       const token = userState.userInfo.token;

//       // Check if title and caption are not empty
//       if (!title.trim() || !caption.trim()) {
//          toast.error("Title and caption are required.");
//          return;
//       }

//       const postData = {
//          title,
//          caption,
//       };

//       mutateCreatePost({ token, postData });
//    };

//    return (
//       <div>
//          <h2>Create a New Post</h2>
//          <label htmlFor="title">Title:</label>

//          <br />
//          <label htmlFor="caption">Caption:</label>
//          <textarea
//             id="caption"
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//          />
//          <br />
//          <button disabled={isLoadingCreatePost} onClick={handleAddNewPost}>
//             Add Post
//          </button>
//       </div>
//    );
// }

// export default AddPost;

// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createPost } from "../services/index/posts";

// function AddPost() {
//    const userState = useSelector((state) => state.user);
//    const queryClient = useQueryClient();
//    const [title, setTitle] = useState("");
//    const [caption, setCaption] = useState("");
//    const [photo, setPhoto] = useState(null);

//    const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
//       useMutation({
//          mutationFn: async ({ token, title, caption, photo }) => {
//             const formData = new FormData();
//             formData.append("photo", photo);
//             formData.append("title", title);
//             formData.append("caption", caption);

//             const response = await createPost({ token, formData });
//             return response;
//          },
//          onSuccess: (data) => {
//             queryClient.invalidateQueries(["posts"]);
//             toast.success("New Post Created Successfully");
//             setPhoto(null);
//          },
//          onError: (error) => {
//             toast.error(error.message);
//          },
//       });

//    const handleAddNewPost = async () => {
//       const token = userState.userInfo.token;

//       // Check if title, caption, and photo are not empty
//       if (!title.trim() || !caption.trim() || !photo) {
//          toast.error("Title, caption, and photo are required.");
//          return;
//       }

//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("caption", caption);
//       formData.append("photo", photo);

//       try {
//          const response = await fetch("/api/posts", {
//             method: "POST",
//             headers: {
//                Authorization: `Bearer ${token}`,
//             },
//             body: formData,
//          });

//          if (!response.ok) {
//             throw new Error("Failed to create post");
//          }

//          const data = await response.json();

//          queryClient.invalidateQueries(["posts"]);
//          toast.success("New Post Created Successfully");
//          setPhoto(null);
//       } catch (error) {
//          toast.error(error.message);
//       }
//    };
//    return (
//       <div>
//          <h2>Create a New Post</h2>
//          <label htmlFor="title">Title:</label>
//          <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//          />
//          <br />
//          <label htmlFor="caption">Caption:</label>
//          <textarea
//             id="caption"
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//          />
//          <br />
//          <label htmlFor="photo">Photo:</label>
//          <input
//             type="file"
//             id="photo"
//             accept="image/*"
//             onChange={(e) => setPhoto(e.target.files[0])}
//          />
//          <br />
//          <button disabled={isLoadingCreatePost} onClick={handleAddNewPost}>
//             Add Post
//          </button>
//       </div>
//    );
// }

// export default AddPost;

// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createPost } from "../services/index/posts";

// function AddPost() {
//    const userState = useSelector((state) => state.user);
//    const queryClient = useQueryClient();
//    const [title, setTitle] = useState("");
//    const [caption, setCaption] = useState("");
//    const [photo, setPhoto] = useState(null);
//    const [imagePreview, setImagePreview] = useState(null);

//    const { isLoading: isLoadingCreatePost } = useMutation({
//       mutationFn: async ({ token, title, caption, photo }) => {
//          const formData = new FormData();
//          formData.append("photo", photo);
//          formData.append("title", title);
//          formData.append("caption", caption);

//          const response = await createPost({ token, formData });
//          return response;
//       },
//       onSuccess: (data) => {
//          queryClient.invalidateQueries(["posts"]);
//          toast.success("New Post Created Successfully");
//          setPhoto(null);
//          setImagePreview(null);
//       },
//       onError: (error) => {
//          toast.error(error.message);
//       },
//    });

//    const handleAddNewPost = async () => {
//       const token = userState.userInfo.token;

//       // Check if title, caption, and photo are not empty
//       if (!title.trim() || !caption.trim() || !photo) {
//          toast.error("Title, caption, and photo are required.");
//          return;
//       }

//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("caption", caption);
//       formData.append("photo", photo);

//       try {
//          const response = await fetch("/api/posts", {
//             method: "POST",
//             headers: {
//                Authorization: `Bearer ${token}`,
//             },
//             body: formData,
//          });

//          if (!response.ok) {
//             throw new Error("Failed to create post");
//          }

//          const data = await response.json();
//          console.log(data);

//          queryClient.invalidateQueries(["posts"]);
//          toast.success("New Post Created Successfully");
//          setPhoto(null);
//          setImagePreview(null);
//       } catch (error) {
//          toast.error(error.message);
//       }
//    };

//    const handleImagePreview = (e) => {
//       const file = e.target.files[0];
//       setPhoto(file);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//          setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//    };

//    return (
//       <div>
//          <h2>Create a New Post</h2>
//          <label htmlFor="title">Title:</label>
//          <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//          />
//          <br />
//          <label htmlFor="caption">Caption:</label>
//          <textarea
//             id="caption"
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//          />
//          <br />
//          <label htmlFor="photo">Photo:</label>
//          <input
//             type="file"
//             id="photo"
//             accept="image/*"
//             onChange={handleImagePreview}
//          />
//          <br />
//          {imagePreview && (
//             <img
//                src={imagePreview}
//                alt="Preview"
//                style={{
//                   maxWidth: "100%",
//                   maxHeight: "200px",
//                   marginTop: "10px",
//                }}
//             />
//          )}
//          <br />
//          <button disabled={isLoadingCreatePost} onClick={handleAddNewPost}>
//             Add Post
//          </button>
//       </div>
//    );
// }

// export default AddPost;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../services/index/posts";

function AddPost() {
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
         <h2>Create a New Post</h2>
         {userState.userInfo ? (
            <>
               <label htmlFor="title">Title:</label>
               <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
               />
               <br />
               <label htmlFor="caption">Caption:</label>
               <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
               />
               <br />
               <label htmlFor="photo">Photo:</label>
               <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleImagePreview}
               />
               <br />
               {imagePreview && (
                  <img
                     src={imagePreview}
                     alt="Preview"
                     style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        marginTop: "10px",
                     }}
                  />
               )}
               <br />
               <button
                  disabled={isLoadingCreatePost}
                  onClick={handleAddNewPost}
               >
                  Add Post
               </button>
            </>
         ) : (
            <p>
               You need to be logged in to create a post.{" "}
               {/* You can customize this message */}
               <a href="/login">Login</a>
            </p>
         )}
      </div>
   );
}

export default AddPost;
