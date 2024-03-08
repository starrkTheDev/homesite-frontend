import classes from "../Inputs.module.css";
import { useState } from "react";
import { useLanguage } from "../../../files/LanguageContext";

const LevelCheckbox = ({ onLevelChange }) => {
    
    const { language } = useLanguage();
    const translations = require(`../../../files/${language}.json`);

    const [selectedLevel, setSelectedLevel] = useState(null);

    const handleLevelChange = (event) => {
        setSelectedLevel(() => {
            const newSelectedLevel = Number(event.target.value);
            onLevelChange(newSelectedLevel);
            return newSelectedLevel;
        });
    };

    return (
        <div className={classes.checkbox}>
            <p>{translations.level}</p>
            <label>1</label>
            <input type="checkbox" name="level" value={1} checked={selectedLevel === 1} onChange={handleLevelChange} />
            <label>2</label>
            <input type="checkbox" name="level" value={2} checked={selectedLevel === 2} onChange={handleLevelChange} />
            <label>3</label>
            <input type="checkbox" name="level" value={3} checked={selectedLevel === 3} onChange={handleLevelChange} />
            <label>4+</label>
            <input type="checkbox" name="level" value={4} checked={selectedLevel === 4} onChange={handleLevelChange} />
        </div>
    )
};

export default LevelCheckbox;