import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors"

import CheckoutItem from "../../components/checkout-item/checkout-item.component"
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component"

import { CheckoutPageContainer, CheckoutHeaderContainer, CheckoutHeaderBlockContainer, TotalContainer, TestWarningContainer } from "./checkout.styles"

const CheckoutPage = ({ cartItems, total }) => (
    <CheckoutPageContainer>
            <CheckoutHeaderContainer>
                <CheckoutHeaderBlockContainer>
                    <span>Product</span>
                </CheckoutHeaderBlockContainer>
                <CheckoutHeaderBlockContainer>
                    <span>Description</span>
                </CheckoutHeaderBlockContainer>
                <CheckoutHeaderBlockContainer>
                    <span>Price</span>
                </CheckoutHeaderBlockContainer>
                <CheckoutHeaderBlockContainer>
                    <span>Quantity</span>
                </CheckoutHeaderBlockContainer>
                <CheckoutHeaderBlockContainer>
                    <span>Remove</span>
                </CheckoutHeaderBlockContainer>
            </CheckoutHeaderContainer>
            {
                cartItems.map(cartItem => 
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />    
                )
            }

            <TotalContainer>
                <span>TOTAL: ${total}</span>
            </TotalContainer>

            <TestWarningContainer>
                *Please use the following test credit card for payments*
                <br />
                4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
            </TestWarningContainer>

            <StripeCheckoutButton price={total} />
    </CheckoutPageContainer>
)

const mapStateTopProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateTopProps)(CheckoutPage)