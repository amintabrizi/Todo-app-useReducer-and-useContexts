import React from 'react';
import './App.css';

//import axios
import AxiosConfig from './Axios/AxiosConfig';

//contexts
import LoginContext from './Contexts/LoginContext';
import ToastContext from './Contexts/ToastContext';
import TodoContext from './Contexts/TodoContext';

//components
import NavbarComponent from './Components/HeaderComponents/Navbar/NavbarComponent';
import FormComponent from './Components/HeaderComponents/FormSection/FormComponent';
import TodosListComponent from './Components/MainComponents/TodosComponents/TodosList';
import ModalComponent from './Components/GeneralComponents/Modal/ModalComponent';
import LoginFormComponent from './Components/GeneralComponents/LoginForm/LoginFormComponent';
import ToastComponent from './Components/GeneralComponents/Toast/ToastComponent';

class App extends React.Component{

  state = {
    login: true,
    todos: [],
    modalShow: false,
    toastShow: false,
    toastInfo: {},
    selectedTodoInfo: {}
  }

  handleLoginStatus = () => {
    this.setState({
      login: !this.state.login
    })
    if (!this.state.login) {
      this.handleToastShow('وضعیت ورود', 'وارد شدید', 'bg-success');
    } else {
      this.handleToastShow('وضعیت ورود', 'خارج شدید', 'bg-danger');
    }
  }

  modalHandler = () => this.setState({
    modalShow: true
  })

  handleToastShow = (toastTitle, toastBody, toastBg) => {
    this.setState({
      toastShow: !this.toastShow,
      toastInfo: {
        'time': 'لحظاتی پیش',
        'title': toastTitle,
        'body': toastBody,
        'bg': toastBg
      }
    })
  }

  handleToastClose = () => {
    this.setState({
      toastShow: false
    })
    console.log('handleToastClose');
  }

  //add todo Functions
  addTodoHandler = (todoTitle) => {
    AxiosConfig.post('/todos.json', { todoTitle, 'todoStatus': false })
      .then((response) => {
        this.setState({
          todos: [...this.state.todos, { 'todoKey': response.data.name, todoTitle, 'todoStatus': false }]
        })
        this.handleToastShow('وضعیت درخواست', 'درخواست ایجاد برنامه ریزی انجام شد', 'bg-success');
      })
      .catch((error) => {
        this.handleToastShow('وضعیت درخواست', 'درخواست ایجاد برنامه ریزی انجام نشد', 'bg-danger');
      })
  }

  //delete todo function
  handleDeleteTodo = (key) => {

    let copyTodos = [...this.state.todos];
    let newTodos = copyTodos.filter(item => item.todoKey !== key);

    this.setState({
      todos: newTodos
    })

    AxiosConfig.delete(`/todos/${key}.json`)
      .then((response) => {
        this.handleToastShow('وضعیت درخواست', 'درخواست حذف انجام شد', 'bg-success');
      })
      .catch(() => {
        this.handleToastShow('وضعیت درخواست', 'درخواست حذف با مشکل مواجه شد', 'bg-danger');
      })
  }

  //handle edit todo status
  handlEditTodoStatus = (key) => {

    let copyTodo = [...this.state.todos];

    let selectTodoIndex = copyTodo.findIndex(item => {
      return item.todoKey === key
    })

    let selectTodo = copyTodo[selectTodoIndex];

    selectTodo = { todoKey: key, todoStatus: !selectTodo.todoStatus, 'todoTitle': selectTodo.todoTitle };

    let otherTodos = copyTodo.filter(item => {
      return item.todoKey !== key
    })

    this.setState({
      todos: [...otherTodos, selectTodo]
    })

    AxiosConfig.put(`/todos/${key}.json`, { todoStatus: selectTodo.todoStatus, 'todoTitle': selectTodo.todoTitle })
      .then((response) => {
        this.handleToastShow('وضعیت درخواست', 'درخواست ویرایش انجام شد', 'bg-success');
      })
      .catch(() => {
        this.handleToastShow('وضعیت درخواست', 'درخواست ویرایش با مشکل مواجه شد', 'bg-danger');
      })
  }

  getTodoInfo = (key) => {
    let FindTodo = this.state.todos.find(item => {
      return item.todoKey === key
    })
    this.setState({
      selectedTodoInfo: { ...FindTodo }
    })
  }

  handleEditTodoClick = (key) => {
    this.getTodoInfo(key);
    this.modalHandler();
  }

  //handle edit todo status
  handleEditTodoTitle = (key, title) => {

    let copyTodo = [...this.state.todos]

    let selectTodoIndex = copyTodo.findIndex(item => {
      return item.todoKey === key
    })

    let selectTodo = copyTodo[selectTodoIndex];

    selectTodo = { todoKey: key, todoStatus: selectTodo.todoStatus, 'todoTitle': title };

    let otherTodos = copyTodo.filter(item => {
      return item.todoKey !== key
    })

    this.setState({
      todos: [...otherTodos, selectTodo]
    })

    AxiosConfig.put(`/todos/${key}.json`, { todoStatus: selectTodo.todoStatus, 'todoTitle': title })
      .then((response) => {
        this.handleToastShow('وضعیت درخواست', 'درخواست ویرایش انجام شد', 'bg-success');
      })
      .catch(() => {
        this.handleToastShow('وضعیت درخواست', 'درخواست ویرایش با مشکل مواجه شد', 'bg-danger');
      })

  }

  componentDidMount() {
    AxiosConfig.get('/todos.json')
      .then((response) => {
        let loadedTodos = [];
        let responseData = response.data;
        for (const item in responseData) {
          loadedTodos.push({
            'todoKey': item,
            'todoTitle': responseData[item].todoTitle,
            'todoStatus': responseData[item].todoStatus,
          })
        }

        this.setState({
          todos: loadedTodos
        })

      })
      .catch((error) => {
        this.handleToastShow('وضعیت درخواست', 'دریافت اطلاعات با مشکل مواجه شد', 'bg-danger');
      })
  }

  render() {
    return (
      <ToastContext.Provider value={{
        toastShow: this.state.toastShow,
        toastInfo: this.state.toastInfo,
        handleToastShow: this.state.handleToastShow,
        handleToastClose: this.handleToastClose
      }}>

        <LoginContext.Provider value={{
          loginStatus: this.state.login,
          changeLoginStatus: this.handleLoginStatus
        }}>

          <TodoContext.Provider value={{
            addTodoHandler: this.addTodoHandler,
            todos: this.state.todos,
            handleDeleteTodo: this.handleDeleteTodo,
            handlEditTodoStatus: this.handlEditTodoStatus,
            modalHandler: this.modalHandler,
            handleEditTodoClick: this.handleEditTodoClick,
            handleEditTodoTitle: this.handleEditTodoTitle
          }}>

            {
              this.state.login
                ?
                <>
                  <NavbarComponent />
                  <FormComponent />
                  <TodosListComponent />
                  <ModalComponent edit_todo_title={this.handleEditTodoTitle} show={this.state.modalShow} selecttodoinfo={this.state.selectedTodoInfo} onHide={() => this.setState({ modalShow: false })} />
                </>
                :
                <LoginFormComponent />
            }

            <>
              <ToastComponent />
            </>

          </TodoContext.Provider>
        </LoginContext.Provider>

      </ToastContext.Provider>
    );
  }

}

export default App;
