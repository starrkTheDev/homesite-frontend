import classes from "./AddButton.module.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../files/LanguageContext";

const AddButton = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const optionsHandler = (event) => {
        props.onOptionsClick(event);
    };

    return (
        <Link className={classes.button}
            to="/add-new"
            onClick={optionsHandler}
        >
            {translations.addPost}
        </Link >
    )
};

export default AddButton;