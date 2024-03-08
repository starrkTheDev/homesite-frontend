import classes from "./DescriptionInput.module.css";
import { useRef } from "react";
import { useLanguage } from "../../../files/LanguageContext";

const DescriptionInput = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../../files/${language}.json`);

    const descriptionInputRef = useRef();

    const inputHandler = () => {
        const enteredDescription = descriptionInputRef.current.value;
        props.onDescriptionChange(enteredDescription);
    }

    return (
        <textarea
            className={classes.input_description}
            id="description"
            required
            placeholder={translations.description}
            ref={descriptionInputRef}
            onChange={inputHandler}
      />
    )
};

export default DescriptionInput;