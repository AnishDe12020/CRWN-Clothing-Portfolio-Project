import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import { auth } from "../../firebase/firebase.utils"

import { ReactComponent as Logo } from "../../assets/crown.svg"

import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"

import { selectCartHidden } from "../../redux/cart/cart.selectors"
import { selectCurrentUser } from "../../redux/user/user.selectors"

import { HeaderContainer, LogoContainer, OptionsContainer, Option } from "./header.styles"

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo />
        </LogoContainer>

        <OptionsContainer>
            <Option to="/shop">
                SHOP
            </Option>
            <Option to="/shop">
                CONTACT
            </Option>
            {
                currentUser ?
                (<Option as="div" onClick={() => auth.signOut()}>SIGN OUT</Option>)
                :
                (<Option to="/signin">SIGN IN</Option>)
            }

            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>
)

const mapStateToProp = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProp)(Header)