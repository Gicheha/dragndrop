import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';

/*Shopping Cart DND Specifications
* This is a plain object that implements the drop target spec
*
* DropTarget Methods are all optional
* Drop: Called when a compatible item is dropped
* Hover: Called when an item is hovered over the component
* canDrop: Used to specify whether the drop target is able to accept the item
*/
const ShoppingCartSpec ={
    drop(){
        return {name:'ShoppingCart'}
    }
};

// ShoppingCart DropTarget - collect
//
// - connect: An instance of DropTargetConnector.
// You use it to assign the drop target role to a DOM node.
//
// - monitor: An instance of DropTargetMonitor.
// You use it to connect state from the React DnD to props.
// Available functions to get state include canDrop(), isOver() and didDrop()

let collect = (connect, monitor) =>{
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};

class ShoppingCart extends Component{
    render(){
        const {canDrop, isOver, connectDropTarget} = this.props;
        const isActive = canDrop && isOver;
        let backgroundColor = '#FFFFFFF';
        if(isActive){
            backgroundColor = '#F7F7BD';
        }else if(canDrop){
            backgroundColor = '#F7F7F7';
        }
        const style = {
            backgroundColor: backgroundColor
        };

        return(
            <div className='shopping-cart' style={style}>
                {isActive ? 'Hummmm, snack' : 'Drag here to Order! '}
            </div>
        );
    }
}

ShoppingCart.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
};

export default DropTarget("snack", ShoppingCartSpec, collect)(ShoppingCart);