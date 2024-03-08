import classes from "./TitleInput.module.css";
import { useRef} from "react";
import { useLanguage } from "../../../files/LanguageContext";

const TitleInput = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../../files/${language}.json`);

    const titleInputRef = useRef();

    const inputHandler = () => {
        const enteredTitle = titleInputRef.current.value;
        props.onTitleChange(enteredTitle);
        };

    return (
            <input
                className={classes.input_title}
                type="text"
                id="title"
                required
                placeholder={translations.title}
                ref={titleInputRef}
                onChange={inputHandler}
            />
    )
};

export default TitleInput;