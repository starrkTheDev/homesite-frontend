import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import classes from './MyPosts.module.css';
import { useLanguage } from "../files/LanguageContext";

const MyPosts = () => {

    const { language } = useLanguage();
    const translations = require(`../files/${language}.json`);

    const [userPosts, setUserPosts] = useState([]);
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate("/");
    }

    const showPostDetails = (postId) => {
        navigate(`/${postId}`);
    };

    const getUserPosts = async(userId) => {
        const graphqlQuery = {
            query: `
                query GetUserPosts($userId: ID!) {
                    getUserPosts(userId: $userId) {
                        _id
                        title
                        price
                        area
                        rooms
                        purpose
                        imagePath
                    }
                }
            `,
            variables: {
                userId,
            },
        };

        try {
            const response = await fetch('https://homesite-api.onrender.com/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
              },
              body: JSON.stringify(graphqlQuery),
            });
        
            const responseData = await response.json();
            const fetchedUserPosts = responseData.data?.getUserPosts || [];
            setUserPosts(fetchedUserPosts);
          } catch (error) {
            console.error('Error:', error);
          }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        getUserPosts(userId);
        console.log(userId);

    }, []);


    return (
      <div>
          <div className={classes.my_posts_header}>
                <button onClick={navigateBack}>
                    {translations.back}
                </button>    
                <h1>{translations.myPosts}</h1>
          </div>
        <div className={classes.my_posts_container}>
          <div className={classes.my_posts_list}>
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div
              className={classes.my_posts_card}
              onClick={() => showPostDetails(post._id)}
              key={post._id}>
                      <div>
                          <img src={`https://posts-photos-zamieszkaj.s3.eu-north-1.amazonaws.com/${post.imagePath}`} alt="Nieruchomość" />   
                      </div>
                      <div>
                          <h3>{post.title}</h3>
                          <p>{post.price} zł</p>
                          <p>{post.area} m2</p>
                          <p>{post.rooms} {translations.rooms}</p>
                      </div>
              </div>
            ))
          ) : (
            <p>{translations.noPosts}</p>
          )}
          </div>
        </div>
      </div>
    );
};

export default MyPosts;