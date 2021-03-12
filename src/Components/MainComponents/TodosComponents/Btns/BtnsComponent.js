import React from 'react';
import { Button } from 'react-bootstrap';
import TodoContext from './../../../../Contexts/TodoContext';

class BtnsComponent extends React.Component {

    static contextType = TodoContext;

    render() {
        return (
            <>
                <Button onClick={() => this.context.handleDeleteTodo(this.props.item.todoKey)} variant="danger" className="btn-sm ml-2">پاک کردن</Button>
                <Button onClick={() => this.context.handleEditTodoClick(this.props.item.todoKey)} variant="info" className="btn-sm ml-2">ویرایش</Button>
                <Button onClick={() => this.context.handlEditTodoStatus(this.props.item.todoKey)} className={`btn-sm ml-2 ${this.props.item.todoStatus ? 'btn-success' : 'btn-warning'}`}>{this.props.item.todoStatus ? 'انجام شده' : 'انجام نشده'}</Button>
            </>
        )
    }
}

export default BtnsComponent;