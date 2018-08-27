import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from 'react-bootstrap'
import './Header.css'

class Header extends Component {
    render() {
        const currentGroupName = this.props.currentGroupName
        let headerElement
        if (currentGroupName) {
            headerElement =
                <PageHeader className="PageHeader">
                    { currentGroupName }
                    <small>
                        <a href="#" className="PullRight" onClick={ this.props.onClick }>
                            ALL GROUPS
                        </a>
                    </small>
                </PageHeader>
        } else {
            headerElement =
                <PageHeader className="PageHeader">
                    Things to Do
                </PageHeader>
        }
        return (
            headerElement
        )
    }
}

Header.propTypes = {
    currentGroupName: PropTypes.string,
    onClick: PropTypes.func
}

Header.defaultProps = {

}

export default Header
