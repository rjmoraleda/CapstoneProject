// import React, { useState } from "react";
// import "./components.css";
// import { images } from "../constants";
// import { useQuery } from "@tanstack/react-query";
// import { getAllPost } from "../services/index/posts";
// import toast from "react-hot-toast";

// const ArticleCard = () => {
//    const [activeTab, setActiveTab] = useState(1);

//    const handleTabClick = (index) => {
//       setActiveTab((prevActiveTab) =>
//          prevActiveTab === index ? prevActiveTab : index
//       );
//    };

//    const { data, isLoading, isError } = useQuery({
//       queryFn: () => getAllPost,
//       queryKey: ["posts"],
//       onError: (error) => {
//          toast.error(error.message);
//          console.log(error);
//       },
//    });

//    const tabTitles = ["Latest", "Popular", "Featured"];

//    // Array of content for each tab
//    const tabContents = [
//       // This is for Latest Content TAB
//       <div className="latest-content">
//          <div className="latest">
//             <div className="latest-img">
//                <img
//                   src={images.latestPost}
//                   alt="Latest Post"
//                   className="responsive-image"
//                />
//             </div>
//             <div className="latest-text">
//                <h2>
//                   Need to stay up-to-date with the most relevant trends in
//                   software.
//                </h2>
//                <p>
//                   You can do so much more once you create your account. Follow
//                   the devs and topics you care about, and keep up-to-date.
//                </p>
//                <div className="latest-tags">
//                   <ul>
//                      <li>
//                         <a href="/" className="javascript">
//                            #javascript
//                         </a>
//                      </li>
//                      <li>
//                         <a href="/" className="html">
//                            #html
//                         </a>
//                      </li>
//                      <li>
//                         <a href="/" className="css">
//                            #css
//                         </a>
//                      </li>
//                      <li>
//                         <a href="/" className="tip">
//                            #tip
//                         </a>
//                      </li>
//                   </ul>
//                </div>
//                <div className="read-profile">
//                   <a href="/" className="read-more">
//                      Read More
//                   </a>
//                   <div className="post-profile">
//                      <img
//                         src={images.theProfile}
//                         className="profile"
//                         alt="The Profile"
//                      />
//                   </div>
//                </div>
//             </div>
//          </div>
//          <div className="previous-content">
//             {!isLoading &&
//                !isError &&
//                data.map((post) => (
//                   <div className="previous-post" key={post.id}>
//                      <h2>{post.title}</h2>
//                      <span className="previous-post-date">
//                         {new Date(post.createdAt).toLocaleDateString("en", {
//                            day: "numeric",
//                            month: "short",
//                            year: "numeric",
//                         })}
//                      </span>
//                   </div>
//                ))}
//             <div className="previous-post">
//                <h2>The Ultimate Deployment Guide</h2>
//                <p>
//                   Explore the step-by-step guide to deploying GitLab on
//                   Kubernetes, focusing on the Omnibus package configuration.
//                </p>
//                <div className="latest-tags">
//                   <ul>
//                      <li>
//                         <a href="/" className="development">
//                            #development
//                         </a>
//                      </li>

//                      <li>
//                         <a href="/" className="github">
//                            #github
//                         </a>
//                      </li>
//                      <li>
//                         <a href="/" className="tip">
//                            #tip
//                         </a>
//                      </li>
//                   </ul>
//                </div>
//                {/* This is for the Read More button */}
//                <div className="read-profile">
//                   <div className="readmore-comments">
//                      <a href="/" className="read-more">
//                         Read More
//                      </a>

//                      <a href="/" className="comments">
//                         18 Comments
//                      </a>
//                   </div>
//                   <div className="post-profile">
//                      <img
//                         src={images.theProfile}
//                         className="profile"
//                         alt="The Profile"
//                      />
//                   </div>
//                </div>
//             </div>
//             <div className="previous-post">
//                <h2>The Ultimate Deployment Guide</h2>
//                <p>
//                   Explore the step-by-step guide to deploying GitLab on
//                   Kubernetes, focusing on the Omnibus package configuration.
//                </p>
//                <div className="latest-tags">
//                   <ul>
//                      <li>
//                         <a href="/" className="development">
//                            #development
//                         </a>
//                      </li>

//                      <li>
//                         <a href="/" className="github">
//                            #github
//                         </a>
//                      </li>
//                      <li>
//                         <a href="/" className="tip">
//                            #tip
//                         </a>
//                      </li>
//                   </ul>
//                </div>
//                {/* This is for the Read More button */}
//                <div className="read-profile">
//                   <div className="readmore-comments">
//                      <a href="/" className="read-more">
//                         Read More
//                      </a>

//                      <a href="/" className="comments">
//                         18 Comments
//                      </a>
//                   </div>

//                   <div className="post-profile">
//                      <img
//                         src={images.theProfile}
//                         className="profile"
//                         alt="The Profile"
//                      />
//                   </div>
//                </div>
//             </div>
//             <div className="previous-post">
//                <h2>The Ultimate Deployment Guide</h2>
//                <p>
//                   Explore the step-by-step guide to deploying GitLab on
//                   Kubernetes, focusing on the Omnibus package configuration.
//                </p>
//                <div className="latest-tags">
//                   <ul>
//                      <li>
//                         <a href="/" className="development">
//                            #development
//                         </a>
//                      </li>

//                      <li>
//                         <a href="/" className="github">
//                            #github
//                         </a>
//                      </li>
//                      <li>
//                         <a href="/" className="tip">
//                            #tip
//                         </a>
//                      </li>
//                   </ul>
//                </div>
//                {/* This is for the Read More button */}
//                <div className="read-profile">
//                   <div className="readmore-comments">
//                      <a href="/" className="read-more">
//                         Read More
//                      </a>

//                      <a href="/" className="comments">
//                         18 Comments
//                      </a>
//                   </div>
//                   <div className="post-profile">
//                      <img
//                         src={images.theProfile}
//                         className="profile"
//                         alt="The Profile"
//                      />
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>,

//       // This is for Popular Content TAB
//       <div className="popular-content">
//          <h1>Popular Content Goes Here</h1>
//       </div>,

//       // This is for Featured Content TAB
//       <div className="featured-content">
//          <h1>Featured Content Goes Here</h1>
//       </div>,
//    ];

//    return (
//       <>
//          <div className="label-accordion">
//             <div className="accordion">
//                <div className="accordion-container">
//                   {tabTitles.map((title, index) => (
//                      <div
//                         key={index}
//                         className={`accordion-tab ${
//                            activeTab === index + 1 ? "active" : ""
//                         }`}
//                         onClick={() => handleTabClick(index + 1)}
//                      >
//                         <div className="tab-title">{title}</div>
//                      </div>
//                   ))}
//                </div>
//             </div>
//          </div>

//          {activeTab && (
//             <div className="tab-content">{tabContents[activeTab - 1]}</div>
//          )}
//       </>
//    );
// };

// export default ArticleCard;

import React, { useEffect, useState } from "react";
import { images, stables } from "../constants";
import "./css/articlecard.css";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const ArticleCard = ({ post, className }) => {
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      // Simulate data fetching (replace with your actual data fetching logic)
      setTimeout(() => {
         setIsLoading(false);
      }, 3000);
   }, []);

   return (
      <div className={`article-card ${className}`}>
         {isLoading ? (
            <LoadingSpinner /> // Display loading spinner while loading
         ) : (
            <>
               <img
                  src={
                     // Check if there is a photo from the uploads folder
                     post.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                        : images.noImage
                  }
                  alt="latest post"
                  className="article-image"
               />
               <div className="article-content">
                  <Link to={`/topics/${post.slug}`}>
                     <h2 className="article-title">{post.title}</h2>
                  </Link>
               </div>
               <p className="article-description">{post.caption}</p>
               <div className="article-info">
                  <div className="readmore-comments">
                     <a href={`/topics/${post.slug}`} className="read-more">
                        Read More
                     </a>

                     <div className="comment-date">
                        <a href="/" className="comments">
                           18 Comments
                        </a>
                        <span>
                           {new Date(post.createdAt).getDate()}{" "}
                           {new Date(post.createdAt).toLocaleString("default", {
                              month: "long",
                           })}
                        </span>
                     </div>
                  </div>
                  <div className="post-profile">
                     <img
                        src={
                           post.user.avatar
                              ? stables.UPLOAD_FOLDER_BASE_URL +
                                post.user.avatar
                              : images.user
                        }
                        className="profile"
                        alt="The Profile"
                     />
                     <p className="verified">
                        {post.user.verified ? (
                           <FaCheckCircle className="verified-icons" />
                        ) : (
                           <FaCheckCircle className="not-verified" />
                        )}
                        {post.user.name}
                     </p>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default ArticleCard;
