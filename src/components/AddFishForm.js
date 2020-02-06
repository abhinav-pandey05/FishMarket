import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    static propTypes = {
        addFish: PropTypes.func,
    }

    createFish = event => {
        event.preventDefault();
        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value,
        };
        this.props.addFish(fish);
        // Reset the form
        event.currentTarget.reset();
    }
    
    render() {
        return (
            <form className = "fish-edit" onSubmit = {this.createFish}>
                <input  name = "name"  ref = {this.nameRef} placeholder = "Name" type = "text"/>
                <input  name = "price" ref = {this.priceRef} placeholder = "Price" type = "text"/>
                <select  name = "status" ref = {this.statusRef}>
                    <option value = "available" >Fresh!</option>
                    <option value = "unavailable" >Sold Out!</option>
                </select>
                <textarea  name = "desc" ref ={this.descRef} placeholder = "desc"/>
                <input  name = "image" ref = {this.imageRef} placeholder = "image" type = "text"/>
                <button type = "submit" >Add Fish</button>
            </form>
        )
    }
}

export default AddFishForm;