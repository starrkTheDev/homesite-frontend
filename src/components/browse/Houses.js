import React, { useEffect, useState } from 'react';
import './Houses.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../files/LanguageContext';

const Houses = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const [houses, setHouses] = useState([]);

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
              getHousePosts {
                  _id
                  title
                  price
                  area
                  rooms
                  purpose
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
                if (data.data && data.data.getHousePosts) {
                    setHouses(data.data.getHousePosts);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const showPostDetails = (houseId) => {
        navigate(`/${houseId}`);
    }

    return (
        <div>
            <div className='houses-header'>
                <button onClick={navigateBack}>
                    {translations.back}
                </button>    
                <h1>{translations.estateOptions.houses}</h1>
            </div>
            <div className="houses-container">
                <div className="houses-list">
                    {houses.map((house) => (
                        <div
                            onClick={() => showPostDetails(house._id)}
                            key={house._id} className="house-card">
                                 <div>
                    {house.imagePath && (
                        <img src={`https://posts-photos-zamieszkaj.s3.eu-north-1.amazonaws.com/${house.imagePath}`} alt="Nieruchomość" />
                    )}
                                </div>
                                <div>
                                <h3>{house.title}</h3>
                            <p>{house.price} zł</p>
                            <p>{house.purpose === "forSale" ? "sprzedaż" : "wynajem"}</p>
                            <p>{house.area} m2</p>
                            <p>{house.rooms} {translations.rooms}</p>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Houses;
