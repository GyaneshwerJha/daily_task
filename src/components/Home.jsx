import React, { useEffect, useState } from 'react'
import './home.css'
import Task from './Task'

const Home = () => {
    const initialTask = localStorage.getItem('task');

    // Check if the stored value is a valid JSON string
    const initialArray = initialTask ? JSON.parse(initialTask) : [];

    const [task, setTask] = useState(initialArray);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();

        if (!title || !description) {
            setError('Fill out the required field')
            return;
        }

        setError('')
        setTask([...task, { title, description }]);
        setTitle('')
        setDescription('')
    }

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(task));
    }, [task]);


    const deleteTask = (index) => {
        const filteredArr = task.filter((val, i) => {
            return i !== index;
        })
        setTask(filteredArr);
    }
    return (
        <>
            <div className="container">
                <h1>Daily Taks</h1>
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder='Type your tasks...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type='submit'>Add</button>
                </form>

                {task.map((item, index) => (
                    <Task
                        key={index}
                        title={item.title}
                        description={item.description}
                        deleteTask={deleteTask}
                        index={index}
                    />
                ))}
            </div>
        </>
    )
}

export default Home