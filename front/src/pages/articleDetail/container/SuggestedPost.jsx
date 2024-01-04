import React from 'react';
import { Link } from 'react-router-dom';
import '../articledetail.css';

const SuggestedPost = ({ className, header, post = [], tags }) => {
  return (
    <div className={"suggested-post"}>
      <h2 className="suggested-header">{header}</h2>
      <div className="suggested-latest-post">
        {post.map((item, index) => (
          <div className="suggested-latest-post-item" key={item.id}>
            <h3>{item.title}</h3>
            <span className="suggested-latest-post-date">
              {new Date(item.createdAt).toLocaleDateString('en', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        ))}
      </div>

      <div className="suggested-tags">
        <h2>Tags:</h2>
        <div className="suggested-tags-used">
          {tags.map((item, index) => (
            <Link to="/" className="suggested-tags-item" key={index}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedPost;
