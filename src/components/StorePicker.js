import React from 'react';
import PropTypes from "prop-types";
import {getFunName} from '../helpers';

class StorePicker extends React.Component {
    myInput = React.createRef();
    static propTypes = {
        history: PropTypes.object,
    };

    goToStore = (event) => {
        event.preventDefault(); // Stop the form from Submitting
        const storeName = this.myInput.current.value;//Get the text from the input 
        this.props.history.push(`/store/${storeName}`);
    };

    render() {
        return (
            <form className = 'store-selector' onSubmit = {this.goToStore}>
                <h2>Please enter a store</h2>
                <input 
                    type = "text"
                    ref = {this.myInput} 
                    required 
                    placeholder = "Store Name" 
                    defaultValue = {getFunName()}>
                </input>
                <button type = "submit" >Visit Store -></button>
            </form> 
        )
    }
}
 
export default StorePicker;
