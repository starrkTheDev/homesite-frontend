import classes from "./LogoutButton.module.css";
import { useLanguage } from "../../files/LanguageContext";

const LogoutButton = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.reload();
    }

    return (
        <button 
            onClick={logoutHandler}
            className={classes.button}>
            {translations.logout}
        </button>
    )
};

export default LogoutButton;