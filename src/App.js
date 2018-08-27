import React, { Component } from 'react'
import { tasksPayload } from './data/data'
import PropTypes from 'prop-types'
import PanelTask from './components/PanelTask'
import Group from './components/Group'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            tasks: tasksPayload,
            currentGroupName: '',
            showChecklist: false,
            headerText: ''
        }
    }
    onGroupClick(event) {
        event.stopPropagation()
        event.preventDefault()
        let groupName
        if (event.currentTarget.id) {
            groupName = event.currentTarget.id
            this.setState({showChecklist: true, currentGroupName: groupName})
        } else throw new Error('Could not get current target of click. Element id is not defined.')
    }
    taskClicked(event) {
        event.stopPropagation()
        event.preventDefault()
        if (event.currentTarget.id) {
            let targetTaskId = Number(event.currentTarget.id)
            let { tasks } = this.state
            tasks.find((element) => {
                if (element.id === targetTaskId) {
                    if (element.completedAt !== null) element.completedAt = null
                    else element.completedAt = new Date()
                }
                return element.id === targetTaskId
            })
            this.setState({ tasks: tasks })
        } else throw new Error('Could not get current target of click. Element id is not defined.')
    }
    returnToGroups() {
        this.setState({ showChecklist: false, currentGroupName: '' })
    }
    render() {
        let { showChecklist } = this.state
        return (
            <div className="App">
                <ErrorBoundary>
                    <Header
                        headerText={ this.state.headerText }
                        currentGroupName={ this.state.currentGroupName }
                        onClick={ this.returnToGroups.bind(this) }
                    />
                </ErrorBoundary>
                <ErrorBoundary>
                    {!showChecklist &&
                        <Group
                            tasks={ this.state.tasks }
                            onClick={ this.onGroupClick.bind(this) }
                        />
                    }
                </ErrorBoundary>
                <ErrorBoundary>
                    {showChecklist &&
                        <PanelTask
                            tasks={ this.state.tasks }
                            currentGroupName={ this.state.currentGroupName }
                            onClick={ this.taskClicked.bind(this) }
                        />
                    }
                </ErrorBoundary>
            </div>
        )
    }
}

App.propTypes = {
    tasks: PropTypes.array
}

App.defaultProps = {
    tasks: tasksPayload
}

export default App
