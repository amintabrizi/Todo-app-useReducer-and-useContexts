import React from 'react';
import BtnsComponent from './Btns/BtnsComponent';
import './TodoList.css';
import { Tabs, Tab, ListGroup } from 'react-bootstrap';
import TodoContext from './../../../Contexts/TodoContext';

class TodosListComponent extends React.Component {

    static contextType = TodoContext;

    render() {
        let doneTodos = this.context.todos.filter((item) => item.todoStatus === true);
        let unDoneTodos = this.context.todos.filter((item) => item.todoStatus === false);
        return (
            <section className="todo-lists my-5">
                <div className="container">
                    <div className="tabs-wrapper col-8 m-auto">
                        <Tabs defaultActiveKey="undone" id="todo-status-tabs" className="justify-content-center">
                            <Tab eventKey="done" title="انجام شده">
                                <ListGroup className="border-top-0">
                                    {
                                        doneTodos.length > 0
                                            ?

                                            doneTodos.map((item) => {
                                                return (
                                                    <ListGroup.Item key={item.todoKey} className="d-flex align-items-center">
                                                        <span className="ml-auto">{item.todoTitle}</span>
                                                        <BtnsComponent item={item} />
                                                    </ListGroup.Item>
                                                )
                                            })

                                            :
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <span className="ml-auto">موردی وجود ندارد</span>
                                            </ListGroup.Item>
                                    }

                                </ListGroup>
                            </Tab>
                            <Tab eventKey="undone" title="انجام نشده">
                                <ListGroup className="border-top-0">
                                    {
                                        unDoneTodos.length > 0
                                            ?
                                            unDoneTodos.map((item) => {
                                                return (
                                                    <ListGroup.Item key={item.todoKey} className="d-flex align-items-center">
                                                        <span className="ml-auto">{item.todoTitle}</span>
                                                        <BtnsComponent item={item} />
                                                    </ListGroup.Item>
                                                )
                                            })

                                            :
                                            <ListGroup.Item className="d-flex align-items-center">
                                                <span className="ml-auto">موردی وجود ندارد</span>
                                            </ListGroup.Item>
                                    }
                                </ListGroup>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }

}

export default TodosListComponent;