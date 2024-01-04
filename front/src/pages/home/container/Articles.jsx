import React from "react";
import ArticleCard from "../../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import toast from "react-hot-toast";

const Articles = () => {
   //using the useQuery hook, presumably from a library like React Query, to fetch data.
   const { data, isLoading, isError } = useQuery({
      queryFn: () => getAllPosts(),
      queryKey: ["posts"],
      onError: (error) => {
         toast.error(error.message);
         console.log(error);
      },
   });

   const posts = Array.isArray(data)
      ? data.sort(
           (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      : [];
   console.log(posts);
   return (
      <section className="container-article">
         {/* enders a section containing a list of articles.  */}
         {!isLoading &&
            !isError &&
            posts.map((post) => (
               <ArticleCard
                  key={post.id}
                  post={post}
                  className={"article-card"}
               />
            ))}
      </section>
   );
};

export default Articles;
