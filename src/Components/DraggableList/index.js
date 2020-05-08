import React, { Component } from "react"
import Departments from "./../Departments";
const type =  {
    DEPARTMENT: 'DEPARTMENT'
}

class DraggableList extends Component {
    render() {
        const { departments }  = this.props;
        return <div className="departments">
            {departments.map(item => {
                return <Departments department={item} color={type.DEPARTMENT}>{item.name}</Departments>
            })}
        </div>
    }
}

export default DraggableList;