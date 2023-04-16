import React from 'react';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';
const ItemList = ({ item }) => {
    const dispatch = useDispatch()
    //update cart
    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...item, quantity: 1 },
        });
    };
    const { Meta } = Card;
    return (
        <div><Card
            hoverable
            style={{ width: 275, marginTop: 30 }}
            cover={<img alt={item.name} src={item.image} style={{ height: 220, width: 275 }} />}
        >
            <Meta title={item.name} />
            <div class="buttons"> <button class="cart-button" onClick={() => handleAddToCart()}> <span class="add-to-cart">Add to cart</span> <span class="added">Item added</span> <i class="fa fa-shopping-cart"></i> <i class="fa fa-square"></i> </button> </div>

        </Card>
        </div>
    );
};
document.addEventListener("DOMContentLoaded", function (event) {
    const cartButtons = document.querySelectorAll('.cart-button');
    cartButtons.forEach(button => {
        button.addEventListener('click', cartClick);
    });
    function cartClick() {
        let button = this;
        button.classList.add('clicked');
    }
});

export default ItemList