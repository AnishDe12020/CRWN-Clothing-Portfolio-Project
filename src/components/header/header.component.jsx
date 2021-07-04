import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import { ReactComponent as Logo } from "../../assets/crown.svg"

import CartIcon from "../cart-icon/cart-icon.component"
import CartDropdown from "../cart-dropdown/cart-dropdown.component"

import { selectCartHidden } from "../../redux/cart/cart.selectors"
import { selectCurrentUser } from "../../redux/user/user.selectors"

import { HeaderContainer, LogoContainer, OptionsContainer, Option } from "./header.styles"

import { signOutStart } from "../../redux/user/user.actions"

const Header = ({ currentUser, hidden, signOutStart }) => (
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
                    (<Option as='div' onClick={signOutStart}>
                        SIGN OUT
                    </Option>)
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProp, mapDispatchToProps)(Header)