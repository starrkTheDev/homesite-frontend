import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classes from "./Bars.module.css";

const Bars = (props) => {

    return (
        <div>
           <FontAwesomeIcon 
            icon={faBars} 
            className={classes.bars}
            onClick={props.onModalActivation}
            />
        </div>
    )
};

export default Bars;
