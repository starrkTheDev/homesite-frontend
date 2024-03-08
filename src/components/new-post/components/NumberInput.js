import classes from "./DataInput.module.css";
import { useRef } from "react";
import { useLanguage } from "../../../files/LanguageContext";

const NumberInput = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../../files/${language}.json`);

    const numberInputRef = useRef();
    
    const numberInputHandler = () => {
        const enteredNumber = numberInputRef.current.value;
        console.log(enteredNumber);
        props.onNumberChange(enteredNumber);
    };
    
    const blockLetterHandler = (event) => {
        // Allow Backspace (key code 8), digits (key codes 48-57),
        // and numeric keypad digits (key codes 96-105)
        if (
            !(event.keyCode === 8 ||
                (event.keyCode >= 48 && event.keyCode <= 57) ||
                (event.keyCode >= 96 && event.keyCode <= 105))
        ) {
            event.preventDefault();
        }
    };

    return (
    <input
        className={classes.number_inputs}
        type="text"
        id="number"
        maxLength={9}
        required
        placeholder={translations.phoneNumber}
        ref={numberInputRef}
        onKeyDown={blockLetterHandler}
        onChange={numberInputHandler}
    />
    )
};

export default NumberInput;