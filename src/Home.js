import { useEffect, useState } from 'react';
import './Home.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function Home() {
    const [isCompletedScreen, setIsCompletedScreen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [allTodos, setallTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    function HandleAddButton() {
        let newTodoItem = {
            title: newTitle,
            description: newDescription
        }
        let updatedArr = [...allTodos]
        updatedArr.push(newTodoItem)
        setallTodos(updatedArr)
        localStorage.setItem('todoList',JSON.stringify(updatedArr))
        setIsCompletedScreen(false)
    }

    useEffect(()=>{
        let savedTodoList = JSON.parse(localStorage.getItem('todoList'))
        let savedCompletedTodoList = JSON.parse(localStorage.getItem('completedTodoList'))
        if(savedTodoList){
            setallTodos(savedTodoList)
        }
        if(savedCompletedTodoList){
            setCompletedTodos(savedCompletedTodoList)
        }
    },[])

    function handleDelete(index){
        let reducedTodoList = [...allTodos]
        reducedTodoList.splice(index,1)
        setallTodos(reducedTodoList)
        localStorage.setItem('todoList',JSON.stringify(reducedTodoList))
    }

    function handleCompletedDelete(index){
        let reducedCompletedTodoList = [...completedTodos]
        reducedCompletedTodoList.splice(index,1)
        setCompletedTodos(reducedCompletedTodoList)
        localStorage.setItem('completedTodoList',JSON.stringify(reducedCompletedTodoList))
    }

    function handleComplete(index){
        let now = new Date();
        let yy = now.getFullYear();
        let mm = now.getMonth();
        let dd = now.getDate();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd+"-"+mm+"-"+yy +" at "+h+":"+m+":"+s;
        let completedItem = {
            ...allTodos[index],
            completedOn: completedOn
        }
        let updatedCompletedTodosArr = [...completedTodos]
        updatedCompletedTodosArr.push(completedItem)
        setCompletedTodos(updatedCompletedTodosArr)
        handleDelete(index)
        localStorage.setItem('completedTodoList',JSON.stringify(updatedCompletedTodosArr))
    }

    return (
        <div className="body-division">
            <h1>My Todos</h1>
            <div className="division-without-heading">
                <div className="entering-adding-task-division">
                    <div className="title-division input">
                        <label>Title:</label>
                        <input type="text" placeholder="What's the title of your To Do?" id="title" onChange={(e) => setNewTitle(e.target.value)} />
                    </div>
                    <div className="description-division input">
                        <label>Description:</label>
                        <input type="text" placeholder="What's the description of your To Do?" id="description" onChange={(e) => setNewDescription(e.target.value)} />
                    </div>
                    <div className="add-button-division input">
                        <button onClick={HandleAddButton} >Add</button>
                    </div>
                </div>
                <div className="todo-completed-buttons-division">
                    <button onClick={()=>setIsCompletedScreen(false)}>To Do</button>
                    <button onClick={()=>setIsCompletedScreen(true)} className="completed-button">Completed</button>
                </div>
                {
                    isCompletedScreen===false && allTodos.map((item, index) => {
                        return (
                            <div className="displaying-tasks-division" key={index}>
                                <div className="task-description-division">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div class="check-delete-icons">
                                    <AiOutlineDelete className="delete icon" onClick={()=>handleDelete(index)} />
                                    <BsCheckLg className="check icon"onClick={()=>handleComplete(index)}/>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    isCompletedScreen===true && completedTodos.map((item, index) => {
                        return (
                            <div className="displaying-tasks-division" key={index}>
                                <div className="task-description-division">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>completed on {item.completedOn}</small></p>
                                </div>
                                <div class="check-delete-icons">
                                    <AiOutlineDelete className="delete icon" onClick={()=>handleCompletedDelete(index)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default Home;
