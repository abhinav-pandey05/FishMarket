import React from "react";
import PropTypes from "prop-types";
import  Header from "./Header";
import  Order from "./Order";
import  Fish from "./Fish";
import  Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object,
    }

    componentDidMount() {
        const {params} = this.props.match;
        // First reinstate our local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order :  JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId,JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        // 1. Take a copy of existing state.
        const fishes = { ...this.state.fishes };
        // 2. Add our new fish to that fishes variable.
        fishes[`fish${Date.now()}`] = fish;
        // 3. Set the new fishes object to state.
        this.setState({
            fishes : fishes
        });
    };

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of current state
        const fishes = {...this.state.fishes};
        //  2. Update that state
        fishes[key] = updatedFish;
        // Set the state 
        this.setState({fishes});
    };

    deleteFish = (key) => {
        // 1. Take a copy of state
        const fishes = {...this.state.fishes};
        // 2. Update/Delete the state
        fishes[key] = null;
        // 3. Set the new state
        this.setState({fishes});
    }

    addToOrder = key => {
        // 1. take a copy of exiting state.
        const order = { ...this.state.order };
        // 2. Either add to order or update the number in our order.
        order[key] = order[key] + 1 || 1;
        // Set the state.
        this.setState({order});
    }

    removeFromOrder = key => {
        // 1. Take a copy of existing state.
        const order = {...this.state.order};
        // 2. Delete from the order state.
        delete order[key];
        // 3. Set the state.
        this.setState({order});
    };

    loadSampleFishes = () => {
        this.setState({fishes : sampleFishes});
    };

    render() {  
        return (
            <div className = "catch-of-the-day">
                <div className = "menu">
                    <Header tagline = "Fresh Seafood Market"/>
                    <ul className = "fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish 
                                key = {key}
                                index = {key} 
                                details = {this.state.fishes[key]}
                                addToOrder = {this.addToOrder}>
                            </Fish>
                        ))}
                    </ul>
                </div>
                <Order 
                    fishes = {this.state.fishes} 
                    order = {this.state.order} 
                    removeFromOrder = {this.removeFromOrder}
                />
                <Inventory 
                    addFish = {this.addFish}
                    updateFish = {this.updateFish}
                    deleteFish = {this.deleteFish}
                    loadSampleFishes = {this.loadSampleFishes}
                    fishes = {this.state.fishes}
                    storeId = {this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;