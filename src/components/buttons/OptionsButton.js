import classes from "./OptionsButton.module.css";
import { useLanguage } from "../../files/LanguageContext";

const OptionsButton = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const less = translations.lessOptions;
    const more = translations.moreOptions;

    const optionsHandler = (event) => {
        props.onOptionsClick(event);
    };

    return (
        <button
            type="button"
            onClick={optionsHandler}
            className={classes.button}
        >
            {props.isSecondForm ? less : more}
        </button>
    );
};

export default OptionsButton;