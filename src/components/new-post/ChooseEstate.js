import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faHome, faLandmark } from '@fortawesome/free-solid-svg-icons';
import classes from './ChooseEstate.module.css';
import { useLanguage } from "../../files/LanguageContext";

const ChooseEstate = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    return (
        <div className={classes.posts_container}>
            <Link to="/add-new-estate" className={classes.post_link}>
                <div className={classes.post_content}>
                    <FontAwesomeIcon icon={faBuilding} className={classes.post_icon} />
                    <span>{translations.estateOptions.apartments}</span>
                </div>
            </Link>
            <Link to="/add-new-estate" className={classes.post_link}>
                <div className={classes.post_content}>
                    <FontAwesomeIcon icon={faHome} className={classes.post_icon} />
                    <span>{translations.estateOptions.houses}</span>
                </div>
            </Link>
            <Link to="/add-new-plot" className={classes.post_link}>
                <div className={classes.post_content}>
                    <FontAwesomeIcon icon={faLandmark} className={classes.post_icon} />
                    <span>{translations.estateOptions.plots}</span>
                </div>
            </Link>
        </div>
    );
};

export default ChooseEstate;
