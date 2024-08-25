import {useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")

  const [todos, setTodos] = useState([])

  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let storage = localStorage.getItem("todos")
    if(storage){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])
  
  const save = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted:false}])
    setTodo("")
    save()
  }

  const handleKey = (e)=>{
    if (e.key === 'Enter' && todo.length >=2 ) {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted:false}])
    setTodo("")
      setTodo(e.target.value)
      setTodo("")
      save()
    }
  }

  const handleEdit = (e , id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id !== id
    });
    
    setTodos(newTodos);
    save()
   
  }

  const handleFinished = ()=>{
    setShowFinished(!showFinished)
  }

  
  const handleDelete = (e, id)=>{
      let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos);
    save()
  }

  const handleChange = (e)=>{
    setTodo(e.target.value)
  }
  
  const handleCheck = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    save()

  }


  return (
    <>
    <Navbar/>
      <div className = "container rounded-xl mx-auto min-h-[80vh] bg-black text-white py-8 px-8">
        
        <div className='addTodo'>
          <h2 className='font-bold text-lg my-3 text-green-400 ' >Add a To-Do</h2>
          <input  className='text-black rounded-md w-[40vh] p-1 ' onChange={handleChange}   onKeyDown={(e)=>handleKey(e)} value={todo} type='text'></input>
          <button disabled={todo.length <=2 } onClick={(e)=>handleAdd(e)}  className='bg-bg2 w-20 mx-3 p-1 rounded-md text-black font-semibold hover:bg-green-400 hover:font-bold' >Add</button>

        </div>
          <input type='checkbox' onClick={handleFinished} className='mt-10 mr-3' checked={showFinished}/> Show Finished To-Dos

        <h2 className='font-bold text-lg my-4 mt-5 text-green-400'>Your To-Dos</h2>
        <div className='todos'>
          {todos.length===0 && <h1 className='text-2xl m-4 '>No To-Dos</h1>}
          {todos.map(item=>{
          return ( showFinished || !item.isCompleted) && <div key={item.id} className='todo flex justify-between m-2 font-semibold text-orange-300 border-bg1 p-2'>
            <div className='flex gap-5 w-1/2'>

            <input type='checkbox'  name={item.id} onClick={handleCheck} checked={item.isCompleted} id=""/>
            <div className=  {`${item.isCompleted ? "line-through && text-red-400" : ""}` } > {item.todo} </div>
            </div>
            <div className='buttons content-center '>
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-bg2 py-1 px-2 w-20 mx-2 rounded-md text-black font-semibold hover:bg-green-400 hover:font-bold'>Edit</button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-bg2 py-1 w-20 mx-2 rounded-md text-black font-semibold hover:bg-red-500 hover:font-bold'>Delete</button>
            </div>

          </div>
          })}
        </div>
      </div>
    </>


  )

 
}

export default App
