import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'react-bootstrap'
import GroupSvg from '../images/Group.svg'
import './Group.css'

class Group extends Component {
    groupTasks(list, keyGetter) {
        const map = new Map()
        list.forEach((item) => {
            const key = keyGetter(item)
            const collection = map.get(key)
            if (!collection) map.set(key, [item])
            else collection.push(item)
        })
        return map
    }
    render() {
        const tasks = this.props.tasks
        let groupedTasks = Array.from(this.groupTasks(tasks, task => task.group))
        let groupElement = groupedTasks.map((group, id) => {
            const groupName = group[0]
            const tasks = group[1]
            const totalTasks = group[1].length
            let completedTasks = 0
            tasks.forEach((task) => {
                if (task.completedAt !== null) completedTasks += 1
            })
            return (
                <ListGroupItem
                    id={ group[0] }
                    className="GroupItem"
                    key={ id }
                    onClick={this.props.onClick}
                >
                    <img src={ GroupSvg } alt="group" className="GroupSvg"/>
                    <strong>{ groupName }</strong>
                    <p className="GroupSubheader">
                        { completedTasks } OF { totalTasks } TASKS COMPLETE
                    </p>
                </ListGroupItem>
            )
        })
        return (
            groupElement
        )
    }
}

Group.propTypes = {
    tasks: PropTypes.array,
    onClick: PropTypes.func
}

Group.defaultProps = {

}

export default Group
