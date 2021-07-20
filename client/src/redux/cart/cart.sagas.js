import { all, call, takeLatest, put, select } from "redux-saga/effects"

import { getUserCartRef } from "../../firebase/firebase.utils"  
import userActionTypes from "../user/user.types"
import { clearCart, setCartFromFirebase } from "./cart.actions"
import { selectCurrentUser } from "../user/user.selectors"
import { selectCartItems } from "./cart.selectors"
import CartActionTypes from "./cart.types"

export function* clearCartOnSignOut() {
    yield put(clearCart())
}

export function* onSignOutSuccess() {
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* updateCartInFirebase() {
    const currentuser = yield select(selectCurrentUser)
    
    if(currentuser) {
        try {
            const cartRef = yield getUserCartRef(currentuser.id)
            const cartItems = yield select(selectCartItems)
            yield cartRef.update({ cartItems })
        } catch(error) {
            console.log(error)
        }
    }
}

export function* checkCartFromFirebase({ payload: user }) {
    const cartRef = yield getUserCartRef(user.id)
    const cartSnapshot = yield cartRef.get()
    yield put(setCartFromFirebase(cartSnapshot.data().cartItems))
}

export function* onUserSignIn() {
    yield takeLatest(userActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase)
}

export function* onCartChange() {
    yield takeLatest([
        CartActionTypes.ADD_ITEM,
        CartActionTypes.REMOVE_ITEM,
        CartActionTypes.CLEAR_ITEM_FROM_CART
    ], updateCartInFirebase)
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess),
        call(onUserSignIn),
        call(onCartChange)
    ])
}