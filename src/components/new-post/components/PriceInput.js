import classes from "./DataInput.module.css";
import { useRef } from "react";
import { useLanguage } from "../../../files/LanguageContext";

const PriceInput = (props) => {

    const { language } = useLanguage();
    const translations = require(`../../../files/${language}.json`);

    const priceInputRef = useRef();
    const areaInputRef = useRef();
    
    const priceInputHandler = () => {
        const enteredPrice = +priceInputRef.current.value;
        console.log(enteredPrice);
        props.onPriceChange(enteredPrice);
    };
    
    const areaInputHandler = () => {
        const enteredArea = +areaInputRef.current.value;
        console.log(enteredArea);
        props.onAreaChange(enteredArea);
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
        id="price"
        required
        placeholder={translations.price}
        ref={priceInputRef}
        onKeyDown={blockLetterHandler}
        onChange={priceInputHandler}
    />
    <input
        className={classes.number_inputs}
        type="text"
        id="area"
        required
        placeholder={translations.area}
        ref={areaInputRef}
        onKeyDown={blockLetterHandler}
        onChange={areaInputHandler}
    />
    </div>
    )
};

export default PriceInput;