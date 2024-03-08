import classes from "./SignUpButton.module.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../files/LanguageContext";

const SignUpButton = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    return (
        <Link 
            to="/signup"
            className={classes.button}>
            {translations.singup}
        </Link>
    )
};

export default SignUpButton;