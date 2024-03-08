import classes from './Inputs.module.css';
import { useLanguage } from "../../files/LanguageContext";

const RangeInputs = ({ onMinPriceChange, onMaxPriceChange, onMinAreaChange, onMaxAreaChange }) => {

    const { language } = useLanguage();
    const translations = require(`../../files/${language}.json`);

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
        <div>
            <div className={classes.rangeInputs}>
                <input
                    id="minPrice"
                    name='minPrice'
                    type='text'
                    placeholder={translations.minPrice}
                    className={classes.input}
                    onKeyDown={blockLetterHandler}
                    onChange={(e) => onMinPriceChange(e.target.value)}
                />
                <input
                    id="maxPrice"
                    name='maxPrice'
                    type='text'
                    placeholder={translations.maxPrice}
                    className={classes.input}
                    onKeyDown={blockLetterHandler}
                    onChange={(e) => onMaxPriceChange(e.target.value)}
                    />
            </div>
            <div className={classes.rangeInputs}>
                <input
                    id="minArea"
                    name='minArea'
                    type='text'
                    placeholder={translations.minArea}
                    className={classes.input}
                    onKeyDown={blockLetterHandler}
                    onChange={(e) => onMinAreaChange(e.target.value)}
                />
                <input
                    id="maxArea"
                    name='maxArea'
                    type='text'
                    placeholder={translations.maxArea}
                    className={classes.input}
                    onKeyDown={blockLetterHandler} 
                    onChange={(e) => onMaxAreaChange(e.target.value)}
                    />
            </div>
        </div>
    )

};

export default RangeInputs;