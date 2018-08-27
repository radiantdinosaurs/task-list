import React, { Component } from 'react'
import { Label } from 'react-bootstrap'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // Logging for errors can be added here
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <Label bsStyle="danger" className="Error">
                        Sorry, we have an unexpected error!
                    </Label>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
