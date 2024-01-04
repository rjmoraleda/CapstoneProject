import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import SuggestedPost from "./container/SuggestedPost";
import SidebarLeft from "../../components/SidebarLeft";
import SidebarRight from "../../components/SidebarRight";
import { Link, useParams } from "react-router-dom";
import { images, stables } from "../../constants";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";

import "./articledetail.css";
import CommentsContainer from "../../components/comments/CommentsContainer";

import { getSinglePost } from "../../services/index/posts";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useSelector } from "react-redux";

const postData = [
   {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: "2022-01-01",
   },
   {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: "2022-01-01",
   },
   {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: "2022-01-01",
   },
   {
      id: 4,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: "2022-01-01",
   },
   {
      id: 5,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: "2022-01-01",
   },
];

const tagsData = ["Programming", "Development", "Testing"];

const ArticleDetailPage = () => {
   const { slug } = useParams();
   const [breadCrumbsData, setBreadCrumbsData] = useState([]);
   const [body, setBody] = useState([null]);
   const userState = useSelector((state) => state.user);

   const { data } = useQuery({
      queryKey: ["getSinglePost", slug],
      queryFn: () => getSinglePost({ slug }),
      enabled: !!slug,
   });

   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      // Simulate data fetching (replace with your actual data fetching logic)
      setTimeout(() => {
         setIsLoading(false);
      }, 2000);
   }, []);

   useEffect(() => {
      if (data) {
         // Set breadcrumbs and body together
         setBreadCrumbsData([
            { name: "Home", link: "/" },
            { name: "Article", link: "/" },
            { name: `${data.title}`, link: `/topics/${data.slug}` },
         ]);
         setBody(
            parse(
               generateHTML(data?.body, [
                  Bold,
                  Italic,
                  Document,
                  Paragraph,
                  Text,
               ])
            )
         );
      }
   }, [data]);
   console.log(data);
   return (
      <MainLayout>
         <div className="article">
            <div className="article-sidebar-left">
               <SidebarLeft />
            </div>
            <section className="article-detail-page">
               <article className="article-detail">
                  <BreadCrumbs data={breadCrumbsData} />
                  {/* Generating the BreadCrumbs from the data */}
                  {isLoading ? (
                     <LoadingSpinner /> // Display loading spinner while loading
                  ) : (
                     <>
                        <div className="article-img-box">
                           {/* Redering the image */}
                           <img
                              src={
                                 data?.photo
                                    ? stables.UPLOAD_FOLDER_BASE_URL +
                                      data?.photo
                                    : images.noImage
                              }
                              alt={data?.title}
                              className="article-img"
                           />
                        </div>
                        <div className="article-categories">
                           {data?.categories.map((category) => (
                              <Link
                                 to={`/topics?category=${category.name}`}
                                 className="article-category"
                              >
                                 {category.name}
                              </Link>
                           ))}
                        </div>

                        <h1 className="article-title">{data?.title}</h1>
                        <p className="article-post">{data?.caption}</p>
                     </>
                  )}

                  <CommentsContainer
                     comments={data?.comments}
                     className="comments-container"
                     loggedinUserId={userState?.userInfo?._id}
                  />
               </article>
               <SuggestedPost
                  header="Latest Article"
                  post={postData}
                  tags={tagsData}
               />
            </section>
            <div className="article-sidebar-right sticky">
               <SidebarRight />
            </div>
         </div>
      </MainLayout>
   );
};

export default ArticleDetailPage;
