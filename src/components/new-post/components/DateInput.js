import classes from "./DataInput.module.css";
import { useRef } from "react";
import { useLanguage } from "../../../files/LanguageContext";

const DateInput = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../../files/${language}.json`);

    const yearInputRef = useRef();
    const availabilityInputRef = useRef();

    const yearInputHandler = () => {
        const enteredYear = +yearInputRef.current.value;
        console.log(enteredYear);
        props.onYearChange(enteredYear);
    };

    const availabilityInputHandler = () => {
        const enteredAvailability = availabilityInputRef.current.value.toString();
        console.log(enteredAvailability);
        props.onAvailabilityChange(enteredAvailability);
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
            <div className={classes.input_container}>
                <input
                    className={classes.number_inputs}
                    type="text"
                    id="year"
                    placeholder={translations.year}
                    ref={yearInputRef}
                    onKeyDown={blockLetterHandler}
                    onChange={yearInputHandler}
                />
                <input
                    className={classes.date_input}
                    type="date"
                    id="availability"
                    placeholder={translations.availability}
                    ref={availabilityInputRef}
                    onKeyDown={blockLetterHandler}
                    onChange={availabilityInputHandler}
                />
            </div>
    )
};

export default DateInput;