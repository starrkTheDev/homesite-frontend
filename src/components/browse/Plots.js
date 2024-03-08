import React, { useEffect, useState } from 'react';
import './Plots.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../files/LanguageContext';

const Plots = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const [plots, setPlots] = useState([]);

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
              getPlotPosts {
                  _id
                  title
                  price
                  area
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
                if (data.data && data.data.getPlotPosts) {
                    setPlots(data.data.getPlotPosts);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const showPostDetails = (plotId) => {
        navigate(`/plots/${plotId}`);
    }

    return (
        <div>
            <div className='plots-header'>
                <button onClick={navigateBack}>
                    {translations.back}
                </button>    
                <h1>{translations.estateOptions.plots}</h1>
            </div>
            <div className="plots-container">
                <div className="plots-list">
                    {plots.map((plot) => (
                        <div
                            onClick={() => showPostDetails(plot._id)}
                            key={plot._id} className="plot-card">
                                 <div>
                    {plot.imagePath && (
                        <img src={`https://posts-photos-zamieszkaj.s3.eu-north-1.amazonaws.com/${plot.imagePath}`} alt="Nieruchomość" />
                    )}
                                </div>
                                <div>
                            <h3>{plot.title}</h3>
                            <p>{plot.price} zł</p>
                            <p>{plot.area} m2</p>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plots;

