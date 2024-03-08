import classes from "./BrowseButton.module.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../files/LanguageContext";

const BrowseButton = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    return (
        <Link className={classes.button} to="/posts">
            {translations.browse}
        </Link >
    );
};

export default BrowseButton;