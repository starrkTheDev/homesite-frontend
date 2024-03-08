import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SinglePlotPost.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../files/LanguageContext';

const SinglePlotPost = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const { id } = useParams();
    const [plotPost, setPlotPost] = useState(null);

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
                        singlePlotPost(id: "${id}") {
                            _id
                            title
                            price
                            area
                            place
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
                if (data.data && data.data.singlePlotPost) {
                    setPlotPost(data.data.singlePlotPost);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const navigateBack = () => {
            navigate("/plots");
    }

    if (!plotPost) {
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
                    <h1>{plotPost.title}</h1>
                </div>
                <div className='single-post-image'>
                    {plotPost.imagePath && (
                        <img src={`https://posts-photos-zamieszkaj.s3.eu-north-1.amazonaws.com/${plotPost.imagePath}`} alt="Nieruchomość" />
                    )}
                    
                </div>
            </div>
            <div className="post-details">
                <div>{translations.price}: <strong> {plotPost.price} zł</strong></div>
                <div>{translations.area}: <strong> {plotPost.area} m2</strong></div>
                <div>{translations.place}: <strong> {plotPost.place.split(',')[0].trim()}</strong></div>
                <p>{translations.phoneNumber}: <strong> {plotPost.number} </strong></p>
            </div>
            <div className="description-container">
                <p className='description'>{plotPost.description}</p>
            </div>
        </div>
    );
};

export default SinglePlotPost;
