import React from 'react';
import { Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import './ModalComponent.css'

class ModalComponent extends React.Component {
    
    state = {
        flag:true,
        title: ''
    }

    static getDerivedStateFromProps(props, state) {
        // do things with nextProps.someProp and prevState.cachedSomeProp
        if (props.selecttodoinfo.todoTitle && state.flag) {
            return {
                title: props.selecttodoinfo.todoTitle,flag: false
            };
        }
        return state;
    }

    handleEditTodo = (e,key) => {
        e.preventDefault();
        this.props.edit_todo_title(key,this.state.title);
        this.props.onHide(false);
    }

    handleOnChange = (e) => {
        this.setState({title:e.target.value});
    }

    render(){
        return (
            <Modal
                show = {this.props.show}
                onHide = {this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        ویرایش وظیفه
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => this.handleEditTodo(e,this.props.selecttodoinfo.todoKey)} inline className="flex-row-reverse w-100 justify-content-center direction-ltr">
                        <InputGroup size="md" className="mb-3">
                            <InputGroup.Prepend>
                                <Button type="submit" className="bg-info">ویرایش</Button>
                            </InputGroup.Prepend>
                            <FormControl onChange={(e) => this.handleOnChange(e)} defaultValue={this.state.title} className="text-right add-todo" aria-describedby="basic-addon1" />
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>بستن</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

// function ModalComponent(props) {
//     const [title, setTitle] = useState('');

//     useEffect(()=>{
//         setTitle(props.selecttodoinfo.todoTitle);
//     },[props.selecttodoinfo.todoTitle]);

//     let handleEditTodo = (e,key) => {
//         e.preventDefault();
//         props.edit_todo_title(key,title);
//         props.onHide(false);
//     }

//     return (
//         <Modal
//             show = {props.show}
//             onHide = {props.onHide}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     ویرایش وظیفه
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={(e) => handleEditTodo(e,props.selecttodoinfo.todoKey)} inline className="flex-row-reverse w-100 justify-content-center direction-ltr">
//                     <InputGroup size="md" className="mb-3">
//                         <InputGroup.Prepend>
//                             <Button type="submit" className="bg-info">ویرایش</Button>
//                         </InputGroup.Prepend>
//                         <FormControl onChange={(e) => setTitle(e.target.value)} value={title || ''} className="text-right add-todo" aria-describedby="basic-addon1" />
//                     </InputGroup>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={props.onHide}>بستن</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }

export default ModalComponent;