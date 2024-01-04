import React, { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentsContainer = ({ loggedinUserId, comments }) => {
   const [affectedComment, setAffectedComment] = useState(null);

   //this is for the comment handler
   const addCommentHandler = (value, parent = null, replyOnUser = null) => {
      setAffectedComment(null);
   };

   const updateCommentHandler = (value, commentId) => {
      setAffectedComment(null);
   };

   // Delete comment
   const deleteCommentHandler = (commentId) => {};

   return (
      <div className="comments-container">
         <CommentForm
            btnLabel="Add Comment"
            //passing the formSubmitHandler function with addCommentHandler
            formSubmitHandler={(value) => addCommentHandler(value)}
         />

         <div className="comments-area">
            {/* rendering the main comments/parents comments fromt the mainComments */}
            {comments && comments.length > 0 ? (
               comments.map((comment) => (
                  <Comment
                     key={comment._id}
                     comment={comment}
                     loggedinUserId={loggedinUserId}
                     affectedComment={affectedComment}
                     setAffectedComment={setAffectedComment}
                     addComment={addCommentHandler}
                     updateComment={updateCommentHandler}
                     deleteComment={deleteCommentHandler}
                     replies={comment.replies}
                  />
               ))
            ) : (
               <p className="no-comments">No comments available</p>
            )}
         </div>
      </div>
   );
};

export default CommentsContainer;
