import React, { Component } from "react"
import Departments from "./../Departments";
import { Input } from 'antd';
const type =  {
    DEPARTMENT: 'DEPARTMENT'
}

class DraggableList extends Component {
    render() {
        const { departments, searchString, handleChange }  = this.props;
        return <div className="departments">
            <Input placeholder="Search the Department" style={{width: "150px"}} onChange={handleChange}/>
            {departments.filter(item => searchString ? item.name.toLowerCase() === searchString.toLowerCase() : true).map(item => {
                return <Departments department={item} color={type.DEPARTMENT}>{item.name}</Departments>
            })}
        </div>
    }
}

export default DraggableList;