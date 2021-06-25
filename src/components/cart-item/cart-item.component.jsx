import React from "react"

import { CartItemContainer, ItemDetailsContainer, ItemName, CartItemImage } from "./cart-item.styles"

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
    <CartItemContainer>
    <CartItemImage src={imageUrl} alt="item" />
        <ItemDetailsContainer>
            <ItemName>{name}</ItemName>
            <span className="price">
                {quantity} x ${price}
            </span>
        </ItemDetailsContainer>
    </CartItemContainer>
)

export default CartItem