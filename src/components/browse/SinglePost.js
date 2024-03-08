import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SinglePost.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../files/LanguageContext';

const SinglePost = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const { id } = useParams();
    const [post, setPost] = useState(null);

    const yes = translations.yes;
    const no = translations.no;

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://homesite-api.onrender.com/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query {
                        singlePost(id: "${id}") {
                            _id
                            title
                            estate
                            market
                            heating
                            price
                            area
                            year
                            availability
                            place
                            rooms
                            level
                            garage
                            balcony
                            lift
                            ac
                            basement
                            storage
                            description
                            imagePath
                            number
                            createdAt
                        }
                    }
                `,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.data && data.data.singlePost) {
                    setPost(data.data.singlePost);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const navigateBack = () => {
        if (post.estate === "apartments") {
            navigate("/apartments");
        }
        if (post.estate === "houses") {
            navigate("/houses");
        }
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="single-post-container">
            <div className='single-post-main'>
                <div className='single-post-header'>
                    <button
                    onClick={navigateBack}
                    >
                       {translations.back}</button>
                    <h1>{post.title}</h1>
                </div>
                <div className='single-post-image'>
                    {post.imagePath && (
                        <img src={`https://posts-photos-zamieszkaj.s3.eu-north-1.amazonaws.com/${post.imagePath}`} alt="Nieruchomość" />
                    )}
                    
                </div>
            </div>
            <div className="post-details">
                <div>{translations.price}: <strong> {post.price} zł</strong></div>
                <div>{translations.area}: <strong> {post.area} m2</strong></div>
                <div>{translations.place}: <strong> {post.place.split(',')[0].trim()}</strong></div>
                <p>{translations.market}: <strong> {translations.marketOptions[post.market]}</strong></p>
                <p>{translations.heating}: <strong> {translations.heatingOptions[post.heating]}</strong></p>
                <p>{translations.year}: <strong> {post.year}</strong></p>
                <p>{translations.availability}: <strong> {post.availability}</strong></p>
                <p>{translations.rooms}: <strong> {post.rooms}</strong></p>
                <p>{translations.level}: <strong> {post.level}</strong></p>
                <p>{translations.garage}: <strong> {post.garage ? yes : no}</strong></p>
                <p>{translations.balcony}: <strong> {post.balcony ? yes : no}</strong></p>
                <p>{translations.lift}: <strong> {post.lift ? yes : no}</strong></p>
                <p>{translations.ac}: <strong> {post.ac ? yes : no}</strong></p>
                <p>{translations.basement}: <strong> {post.basement ? yes : no}</strong></p>
                <p>{translations.storage}: <strong>{post.storage ? yes : no}</strong></p>
                <p>{translations.phoneNumber}: <strong> {post.number} </strong></p>
            </div>
            <div className="description-container">
                <p className='description'>{post.description}</p>
            </div>
        </div>
    );
};

export default SinglePost;
