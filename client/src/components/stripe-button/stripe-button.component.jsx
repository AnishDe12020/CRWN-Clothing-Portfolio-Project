import React from "react"
import StripeCheckout from "react-stripe-checkout"

const StripCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51J56WKSEokNY3wn63iuUiEHjCUAGK9HdPFBKua3W6OiH7G5dt7RQtPoXh2NOmvq9dDny7P6Ve4Xz1ZyohQl6Uz6g00IjBKiDzv"

    const onToken = token => {
        console.log(token)
        alert("Payment successful")
    }

    return (
        <StripeCheckout 
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://sendeyo.com/en/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripCheckoutButton