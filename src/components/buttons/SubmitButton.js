import classes from "./SubmitButton.module.css";
import { useLanguage } from "../../files/LanguageContext";

const SubmitButton = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    return (
        <button className={classes.button}>
            {translations.search}
        </button>
    )
};

export default SubmitButton;