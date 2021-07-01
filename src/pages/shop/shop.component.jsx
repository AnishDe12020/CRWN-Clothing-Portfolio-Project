import React from "react"
import { Route } from "react-router-dom"
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux"

import CollectionsOverview from "../../components/collections-overview/collections-overview.component"
import CollectionPage from "../collection/collection.component"
import WithSpinner from "../../components/with-spinner/with-spinner.component"  

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions"
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors"

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props
        fetchCollectionsStartAsync()
    }

    render() {
        const { match, isCollectionFetching } = this.props
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={(props) => <CollectionOverviewWithSpinner 
                            isLoading={isCollectionFetching} 
                            {...props} 
                        />} 
                />
                <Route 
                path={`${match.path}/:collectionId`} 
                render={(props) => <CollectionPageWithSpinner
                        isLoading={isCollectionFetching}
                        {...props}
                    />}
                />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)