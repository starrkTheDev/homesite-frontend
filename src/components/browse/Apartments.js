import React, { useEffect, useState } from 'react';
import './Apartments.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../files/LanguageContext';

const Apartments = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const [apartments, setApartments] = useState([]);

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate("/posts");
    }

    useEffect(() => {
        fetch('https://homesite-api.onrender.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
          query {
              getApartmentPosts {
                  _id
                  title
                  price
                  purpose
                  area
                  rooms
                  imagePath
                  createdAt
                  updatedAt
              }
          }
        `,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.data && data.data.getApartmentPosts) {
                    setApartments(data.data.getApartmentPosts);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const showPostDetails = (apartmentId) => {
        navigate(`/${apartmentId}`);
    }

    return (
        <div>
            <div className='apartments-header'>
                <button onClick={navigateBack}>
                    {translations.back}
                </button>    
                <h1>{translations.estateOptions.apartments}</h1>
            </div>
            <div className="apartments-container">
                <div className="apartments-list">
                    {apartments.map((apartment) => (
                        <div
                            onClick={() => showPostDetails(apartment._id)}
                            key={apartment._id} className="apartment-card">
                                 <div>
                    {apartment.imagePath && (
                        <img src={`https://posts-photos-zamieszkaj.s3.eu-north-1.amazonaws.com/${apartment.imagePath}`} alt="Nieruchomość" />
                    )}
                                </div>
                                <div>
                            <h3>{apartment.title}</h3>
                            <p>{apartment.price} zł</p>
                            <p>{apartment.purpose === "forSale" ? "sprzedaż" : "wynajem"}</p>
                            <p>{apartment.area} m2</p>
                            <p>{apartment.rooms} {translations.rooms}</p>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Apartments;
