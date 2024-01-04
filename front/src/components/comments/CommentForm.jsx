import React, { useState } from "react";
import "./comment.css";

const CommentForm = ({
   btnLabel,
   formSubmitHandler,
   formCancelHandler = null,
   initialText = "",
}) => {
   const [value, setValue] = useState(initialText);
   //Submit handler function
   const submitHandler = (e) => {
      e.preventDefault();
      formSubmitHandler(value);
      setValue("");
   };
   return (
      <form onSubmit={submitHandler}>
         <div className="article-comment-form-wrapper">
            <textarea
               className="article-comment-form"
               rows="5"
               placeholder="Leave a comment"
               value={value}
               onChange={(e) => setValue(e.target.value)}
            />
            <div className="comment-form-btn-wrapper">
               {formCancelHandler && (
                  <button
                     onClick={formCancelHandler}
                     className="comment-form-cancel"
                  >
                     Cancel
                  </button>
               )}
               <button type="submit" className="article-comment-form-btn">
                  {btnLabel}
               </button>
            </div>
         </div>
      </form>
   );
};

export default CommentForm;
