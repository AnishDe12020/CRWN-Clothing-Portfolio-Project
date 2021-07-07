import React from "react"
import { withRouter } from "react-router-dom"

import { MenuItemContainer, BackgroundImageContainer, ContentContainer, ContentTitleContainer, ContentSubtitleContainer } from "./menu-item.styles"

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
    return (
        <MenuItemContainer 
            size={size}
            onClick={() => history.push(`${match.url}${linkUrl}`)}
        >
            <BackgroundImageContainer
                className="background-image"
                style={
                    {
                        backgroundImage: `url(${imageUrl})`
                    }
                }
            />
            <ContentContainer className="content">
                <ContentTitleContainer>{title.toUpperCase()}</ContentTitleContainer>
                <ContentSubtitleContainer>SHOP NOW</ContentSubtitleContainer>
            </ContentContainer>
        </MenuItemContainer>
    )
}

export default withRouter(MenuItem)