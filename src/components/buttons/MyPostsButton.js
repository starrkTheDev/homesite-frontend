import classes from "./MyPostsButton.module.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../files/LanguageContext";

const MyPostsButton = () => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

    return (
        <Link 
        to="/my-posts"
        className={classes.button}>
        {translations.myPosts}
    </Link>
    )
};

export default MyPostsButton;