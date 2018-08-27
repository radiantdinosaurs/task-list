import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'react-bootstrap'
import IncompleteSvg from '../images/Incomplete.svg'
import CompletedSvg from '../images/Completed.svg'
import LockedSvg from '../images/Locked.svg'
import './PanelTask.css'

class PanelTask extends Component {
    checkIfComplete(dependencyIds) {
        if (dependencyIds) {
            let completedDependencies = 0
            this.props.tasks.forEach(task => {
                for (let i = 0; i < dependencyIds.length; i++) {
                    if (task.id === dependencyIds[i] && task.completedAt !== null) {
                        completedDependencies++
                    }
                }
            })
            return completedDependencies === dependencyIds.length
        } else throw new Error('Undefined parameters.')
    }
    render() {
        const { tasks, currentGroupName } = this.props
        let currentGroup = tasks.filter(element => element.group === currentGroupName)
        return (
            currentGroup.map((task, id) => {
                if (task.completedAt === null) {
                    let dependencies = task.dependencyIds
                    let taskIsUnlocked = this.checkIfComplete(dependencies)
                    if (taskIsUnlocked) {
                        return <ListGroupItem
                            className="ListItem"
                            key={ id }
                            id={ task.id }
                            onClick={ this.props.onClick }
                        >
                            <img src={ IncompleteSvg } alt="incomplete task"/>
                            <strong>{ task.task }</strong>
                        </ListGroupItem>
                    } else {
                        return <ListGroupItem
                            className="Locked ListItem"
                            key={ id }
                            id={ task.id }
                        >
                            <img src={ LockedSvg } className="LockedSvg" alt="locked task"/>
                            <strong>{ task.task }</strong>
                        </ListGroupItem>
                    }
                } else if (task.completedAt) {
                    return <ListGroupItem
                        className="ListItem"
                        key={ id }
                        id={ task.id }
                        onClick={ this.props.onClick }
                    >
                        <img src={ CompletedSvg } alt="completed task"/>
                        <strike><strong>{ task.task }</strong></strike>
                    </ListGroupItem>
                } else {
                    throw new Error('Object not as expected -- expected completedAt.')
                }
            }))
    }
}

PanelTask.propTypes = {
    tasks: PropTypes.array,
    currentGroupName: PropTypes.string,
    onClick: PropTypes.func
}

PanelTask.defaultProps = {

}

export default PanelTask
