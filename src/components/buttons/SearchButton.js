import classes from "./SearchButton.module.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../files/LanguageContext";

const SearchButton = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const optionsHandler = (event) => {
        props.onOptionsClick(event);
    };

    return (
        <Link className={classes.button}
            to="/"
            onClick={optionsHandler}
        >
            {translations.searchPost}
        </Link >
    )
};

export default SearchButton;