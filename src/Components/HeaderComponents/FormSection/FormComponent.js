import React from 'react';
import './FormComponent.css';
import { Form, FormControl, Button,InputGroup} from 'react-bootstrap';
import TodoContext from './../../../Contexts/TodoContext';
import { render } from '@testing-library/react';

class FormComponent extends React.Component {
    
    static contextType = TodoContext;

    state = {
        inputValue: ''
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.context.addTodoHandler(this.state.inputValue);
    }

    render() {
        return (
            <section className="form-wrapper">
                <div className="container d-flex justify-content-center align-items-center">
                    <Form onSubmit={(e) => this.submitHandler(e)} inline className="flex-row-reverse w-100 justify-content-center direction-ltr">
                        <InputGroup size="lg" className="mb-3">
                            <InputGroup.Prepend>
                                <Button type="submit" className="bg-primary">!اضافه کن</Button>
                            </InputGroup.Prepend>
                            <FormControl onChange={(e) => this.setState({inputValue:e.target.value})} className="text-right add-todo" aria-describedby="basic-addon1" />
                        </InputGroup>
                    </Form>
                </div>
            </section>
        )
    }
}

// function FormComponent(props) {

//     const todoContext = useContext(TodoContext);

//     const [inputValue,setInputValue] = useState('');

//     let submitHandler = (e) => {
//         e.preventDefault();
//         todoContext.addTodoHandler(inputValue);
//     }

//     return (
//         <section className="form-wrapper">
//             <div className="container d-flex justify-content-center align-items-center">
//                 <Form onSubmit={(e) => submitHandler(e)} inline className="flex-row-reverse w-100 justify-content-center direction-ltr">
//                     <InputGroup size="lg" className="mb-3">
//                         <InputGroup.Prepend>
//                             <Button type="submit" className="bg-primary">!اضافه کن</Button>
//                         </InputGroup.Prepend>
//                         <FormControl onChange={(e) => setInputValue(e.target.value)} className="text-right add-todo" aria-describedby="basic-addon1" />
//                     </InputGroup>
//                 </Form>
//             </div>
//         </section>
//     )
// }

export default FormComponent;