import classes from "../Inputs.module.css";
import { useLanguage } from "../../../files/LanguageContext";

const AdditionalRangeInputs = ({onMinYearChange, onMaxYearChange, onMinPricePerSquareMeterChange, onMaxPricePerSquareMeterChange}) => {

    const { language } = useLanguage();
    const translations = require(`../../../files/${language}.json`);

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
                    type='text'
                    placeholder={translations.minPrice + "/m"}
                    className={classes.input}
                    onKeyDown={blockLetterHandler}
                    onChange={(e) => onMinPricePerSquareMeterChange(e.target.value)}
                />
                <input
                    type='text'
                    placeholder={translations.maxPrice + "/m"}
                    className={classes.input}
                    onKeyDown={blockLetterHandler} 
                    onChange={(e) => onMaxPricePerSquareMeterChange(e.target.value)}
                />
            </div>
            <div className={classes.rangeInputs}>
                <input
                    type='text'
                    name="minYearBuilt"
                    placeholder={translations.minYearBuilt}
                    className={classes.input}
                    onKeyDown={blockLetterHandler}
                    onChange={(e) => onMinYearChange(e.target.value)}
                />
                <input
                    type='text'
                    name="maxYearBuilt"
                    placeholder={translations.maxYearBuilt}
                    className={classes.input}
                    onKeyDown={blockLetterHandler} 
                    onChange={(e) => onMaxYearChange(e.target.value)}
                    />
            </div>
        </div>
    );
};

export default AdditionalRangeInputs;