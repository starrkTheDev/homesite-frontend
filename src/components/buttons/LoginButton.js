import classes from "./LoginButton.module.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../files/LanguageContext";

// its the button responsible only of redirecting user to the login page, not handling the login process itself!

const LoginButton = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    return (
        <Link 
            to="/login"
            className={classes.button}>
            {translations.login}
        </Link>
    )
};

export default LoginButton;