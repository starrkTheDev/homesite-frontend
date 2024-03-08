import React from 'react';
import classes from './MatchingPosts.module.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../files/LanguageContext";

const MatchingPosts = ({ posts }) => {

    
    const { language } = useLanguage();
    const translations = require(`../files/${language}.json`);

    const navigate = useNavigate();

    const showPostDetails = (postId) => {
        navigate(`/${postId}`);
    }

  return (
    <div className={classes.matching_posts_container}>
      <div className={classes.matching_posts_header}>
        <h1>{translations.matchingPosts}</h1>
      </div>
      <div className={classes.matching_posts_list}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
              <div className={classes.matching_post_card}>
                  <h3>{post.title}</h3>
                  <div 
                    onClick={() => showPostDetails(post._id)}
                    key={post._id}
                    className={classes.matching_post_horizontal} 
                  >
                      <div className={classes.matching_post_description}>
                          <p>{post.price} zł</p>
                          <p>{post.area} m2</p>
                          <p>{translations.estateOptions[post.estate]}</p>
                          <p>{translations.purposeOptions[post.purpose]}</p>
                          <p>{translations.marketOptions[post.market]}</p>
                          <p>{post.place}</p>
                      </div>
                      <div>
                          <img src={`https://posts-photos-zamieszkaj.s3.eu-north-1.amazonaws.com/${post.imagePath}`} alt="Nieruchomość" />   
                      </div>
                  </div>
                </div>
          ))
        ) : (
          <p>{translations.noPosts}</p>
        )}
      </div>
    </div>
  );
};

export default MatchingPosts;
