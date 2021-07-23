import "./Todo.css"
import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faPen, faPlus, faSun, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ListGroup, ListGroupItem, Button, Input } from 'reactstrap';

let i;

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: props.tasks, typing: "", tasksCopy: props.tasks, mode: "light", btn: 1 }
    }

    typing = (event) => {
        this.setState((state) => {
            return {
                typing: event.target.value,
            }
        })
    }

    add = () => {
        this.setState((state) => {
            let newTasks = [...state.tasks];
            if (state.typing != '') newTasks.push({
                text: state.typing,
                completed: false,
                dis: false
            })

            return { tasks: newTasks, typing: "", tasksCopy: newTasks }
        })
        console.log(this.state.tasks);
    }

    complete = (index) => {
        if (this.state.tasks[index].completed) {
            this.setState((state) => {
                let newTasks = [...state.tasks];

                newTasks[index].completed = false;

                return { tasks: newTasks }
            })
        } else if (this.state.tasks[index].completed === false) {
            this.setState((state) => {
                let newTasks = [...state.tasks];

                newTasks[index].completed = true;

                return { tasks: newTasks, tasksCopy: newTasks }
            })
        }
    }

    edit = (index) => {
        document.getElementById("editAdd").classList.remove('d-none');
        document.getElementById("add").classList.add('d-none');
        this.setState((state) => {
            let newTasks = [...state.tasks];
            newTasks.map((v, i) => { v.dis = true })
            return {
                typing: state.tasks[index].text, tasks: newTasks, tasksCopy: newTasks
            }
        });
        i = index;
    }

    delete = (index) => {
        this.setState((state) => {
            let newTasks = [...state.tasks];

            newTasks.splice(index, 1)

            return { tasks: newTasks, tasksCopy: newTasks }
        })
    }

    editAdd = () => {
        this.setState((state) => {
            let newTasks = [...state.tasks];
            newTasks.map((v, i) => { v.dis = false });

            if (state.typing != "") newTasks[i].text = state.typing;

            return { tasks: newTasks, typing: '', tasksCopy: newTasks }
        })
        document.getElementById("add").classList.remove('d-none')
        document.getElementById("editAdd").classList.add('d-none');
    }

    completedShow = () => {
        // document.getElementById("lbox").children[0].classList.remove("blue");
        // document.getElementById("lbox").children[1].classList.remove("blue");
        // document.getElementById("lbox").children[2].classList.add("blue");
        console.log(document.getElementById("lbox"));
        this.setState((state) => {
            let newTasks = [...state.tasksCopy];
            newTasks = newTasks.filter((v) => { return v.completed == true })

            return { tasks: newTasks, btn: 3 }
        })
    }

    activeShow = (event) => {
        this.setState((state) => {
            let newTasks = [...state.tasksCopy];
            newTasks = newTasks.filter((v) => { return v.completed == false })

            return { tasks: newTasks, btn: 2 }
        })
    }

    allShow = (event) => {
        this.setState((state) => {
            let newTasks = [...state.tasksCopy];
            return { tasks: newTasks, btn: 1 }
        })
    }

    clearCompleted = () => {
        this.setState((state) => {
            let newTasks = [...state.tasksCopy];
            let ind = [];
            newTasks.map((v, i) => {
                if (v.completed == true) {
                    ind.push(i);
                }
            })
            ind.map((val, i) => {
                newTasks.splice(val, 1);
            })
            console.log(ind);
            return { tasksCopy: newTasks, tasks: newTasks }
        })
    }

    mode = (event) => {
        const body = document.getElementsByTagName("body")[0];
        if (this.state.mode == "light") {
            body.classList.add("light");
            this.setState((state) => {
                return { mode: "dark" }
            })
        }
        else if (this.state.mode == "dark") {
            body.classList.remove("light");
            this.setState((state) => {
                return { mode: "light" }
            })
        }
    }

    render() {
        return (
            <div>
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="text-white title">TODO</h1>
                    <Input type="checkbox" id="mode" onChange={this.mode}></Input>
                    <label htmlFor="mode" className="text-white fs-3"><FontAwesomeIcon icon={faSun} /></label>
                </div>
                <div className="item p-2 d-flex align-items-center">
                    <button className="cirleButton" onClick={this.add} id="add">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button className="cirleButton d-none" onClick={this.editAdd} id="editAdd">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <Input placeholder="new task" value={this.state.typing} onChange={this.typing} />
                </div>
                <ListGroup className="todoList mt-4" id="list">
                    {
                        this.state.tasks.map((value, index) => {
                            return <ListGroupItem
                                className={`d-flex align-items-center justify-content-between
                                            ${value.completed && "completed" || ""}`} key={index}>
                                <div className="d-flex align-items-center">
                                    <button className="cirleButton" onClick={() => this.complete(index)}>
                                        <FontAwesomeIcon icon={faCheck} className="d-none checked" />
                                    </button>
                                    <p className="text">{value.text}</p>
                                </div>
                                <div className="d-flex">
                                    <button className="cirleButton me-3" onClick={() => this.edit(index)}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className={`cirleButton ${value.dis && "disabled" || ""}`} onClick={() => this.delete(index)} >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </ListGroupItem>
                        })
                    }
                    <ListGroupItem className={`d-flex align-items-center justify-content-between`}>
                        <small className="text-muted">{this.state.tasks.length} items left</small>
                        <div>
                            <button className={`btn text-muted ${this.state.btn == 1 && "blue" || ""}`} onClick={this.allShow}>All</button>
                            <button className={`btn text-muted ${this.state.btn == 2 && "blue" || ""}`} onClick={this.activeShow}>Active</button>
                            <button className={`btn text-muted ${this.state.btn == 3 && "blue" || ""}`} onClick={this.completedShow}>Completed</button>
                        </div>
                        <button className="btn text-muted" onClick={this.clearCompleted}>Clear Completed</button>
                    </ListGroupItem>
                </ListGroup>
            </div>
        )
    }
};