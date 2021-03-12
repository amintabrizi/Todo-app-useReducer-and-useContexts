import React from 'react';
import { Toast,Row,Col } from 'react-bootstrap';

import ToastContext from '../../../Contexts/ToastContext'

class ToastComponent extends React.Component{

    static contextType = ToastContext;
    
    render() {
        return(
            <Row>
                <Col xs={6}>
                    <Toast onClose={this.context.handleToastClose} show={this.context.toastShow} delay={1500} autohide>
                        <Toast.Header className={`${this.context.toastInfo.bg} text-white`}>
                            <strong className="ml-auto ml-1">{this.context.toastInfo.title}</strong>
                        </Toast.Header>
                        <Toast.Body className="d-flex flex-column">
                            {this.context.toastInfo.body}
                            <small className="mr-auto">{this.context.toastInfo.time}</small>
                        </Toast.Body>
                    </Toast>
                </Col>
            </Row>
        );

    }
}

export default ToastComponent;