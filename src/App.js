import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom" 
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import './App.css'

import HomePage from "./pages/homepages/homepage.component"
import ShopPage from "./pages/shop/shop.component"
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"
import CheckoutPage from "./pages/checkout/checkout.component"

import Header from "./components/header/header.component"

import { selectCurrentUser } from "./redux/user/user.selectors"

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth)
    //     // console.log("useAuth")

    //     userRef.onSnapshot(snapshot => {
    //       // console.log("setting state")
    //       setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data()
    //       })
    //     })
    //   }
    //   setCurrentUser(userAuth)
    // })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(App)