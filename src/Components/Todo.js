import React, { useState, useEffect } from 'react'
import { Icon } from 'react-icons-kit'
import { plus } from 'react-icons-kit/feather/plus'
import { edit2 } from 'react-icons-kit/feather/edit2'
import { trash } from 'react-icons-kit/feather/trash'
const getTodosFromVl = () => {
    const data = localStorage.getItem("Todos");
    if (data) {
        return JSON.parse(data)
    } else {
        return []
    }
}
export const Todo = () => {

    const [todoValue, setTodoValue] = useState('');
    const [todos, setTodos] = useState(getTodosFromVl());
    console.log(todos)
    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date();
        const time = date.getTime();

        let todoObject = {
            ID: time,
            TodoValue: todoValue,
            completed: false
        }
        setTodos([...todos, todoObject]);
        setTodoValue('');
    }
    useEffect(() => {
        localStorage.setItem('Todos', JSON.stringify(todos));
    }, [todos])

    const handleDelete = (elem) => {
        let filtered = todos.filter((item) => {
            return item.ID !== elem;
        })
        setTodos(filtered)
    }
    const [editForm, setEditForm] = useState(false)
    const [id, setId] = useState()
    const handleEdit = (todo, index) => {
        console.log(todo, index)
        setEditForm(true)
        setId(index)
        setTodoValue(todo.TodoValue);
    }
    const handleEditSubmit = (e) => {
        e.preventDefault();
        let items = [...todos];
        let item = items[id];
        item.TodoValue = todoValue;
        item.completed = false;
        items[id] = item;
        setTodos(items);
        setTodoValue('')
        setEditForm(false)
    }
    const handleCheckbox = (id) => {
        let todoArr = [];
        todos.forEach(element => {
            if (element.ID === id) {
                if (element.completed === false) {
                    element.completed = true;
                }
                else if (element.completed === true) {
                    element.completed = false;
                }
            }
            todoArr.push(element);
            setTodos(todoArr)
        });
    }
    return (
        <>
            {editForm === false && (
                <div className='card'>
                    <div><h3 style={{ textAlign: "center" }}>Things Todo</h3></div>
                    <div className="form">
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <div className="input-and-button">


                                <input type='text' placeholder="Add an Item" required
                                    onChange={(e) => setTodoValue(e.target.value)} value={todoValue} />
                                <div className='button' style={{ borderRadius: "20px" }}>
                                    <button type="submit" >
                                        <Icon icon={plus} size={20} />
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editForm === true && (
                <div className='card'>
                    <div><h3 style={{ textAlign: "center" }}>Things Todo</h3></div>
                    <div className="form">
                        <form autoComplete="off" onSubmit={handleEditSubmit}>
                            <div className="input-and-button">

                                <input type='text' placeholder="Add an Item" required
                                    onChange={(e) => setTodoValue(e.target.value)} value={todoValue} />
                                <div className='button edit'>
                                    <button type="submit">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {todos.length > 0 && (
                <>
                    {todos.map((individualTodo, index) => (
                        <div className='todo' key={individualTodo.ID}>
                            <div>
                                {editForm === false && (
                                    <input type='checkbox' onChange={() => handleCheckbox(individualTodo.ID)} checked={individualTodo.completed} />
                                )}

                                <span style={individualTodo.completed === true ? { textDecoration: "line-through" } : { textDecoration: "none" }}>{individualTodo.TodoValue}</span>
                            </div>
                            {editForm === false && (
                                <div className='edit-and-delete'>
                                    <div style={{ marginRight: '7px' }}>
                                        <Icon icon={edit2} size={18} onClick={() => handleEdit(individualTodo, index)} style={{ color: "green" }} />
                                    </div>
                                    <div onClick={() => handleDelete(individualTodo.ID)}>
                                        <Icon icon={trash} size={18} style={{ color: "red" }} />
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                </>
            )}

            <div >
                <button className='delete-all' onClick={() => setTodos([])}>Clear All</button></div>

        </>
    )
}


