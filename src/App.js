import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash,faFloppyDisk,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App()
{
  const [todo,setTodo]=useState([])
  const [input,setInput]=useState("")
  const [editingItemId,setEditingItemId]=useState(null)
  const [editedItemName,setEditedItemName]=useState("")

  function changeInput(e)
  {
    setInput(e.target.value)
  }

  function submit()
  {
    var x=todo.length+1
    var newItem={id:x,name:input,status:false}
    setTodo([...todo,newItem])
    setInput("")
  }

  function handleEditItem(item)
  {
    setEditingItemId(item.id)
    setEditedItemName(item.name);
  }

  function cancelEditItem(item)
  {
    setEditingItemId(null)
    setEditedItemName("");
  }

  function handleSaveItem()
  {
    if (editedItemName.trim() !== "") {
      const updatedItems = todo.map((item) => {
        if (item.id === editingItemId) {
          return { ...item, name: editedItemName };
        }
        return item;
      });
      setTodo(updatedItems);
      setEditingItemId(null);
    }
  };

  function handleDelete(id){
    const filteredItems=todo.filter((item)=>item.id!==id)
    setTodo(filteredItems)
  }

  function handleInputChange(event)
  {
    setEditedItemName(event.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-10 offset-1">
          <h2 className="text-center p-3 mt-5 text-white"><b>TO-DO LIST</b></h2>
          <div className="input-group mb-3 mt-3">
            <input type="text" className="form-control" placeholder="Enter the next task" aria-label="Recipient's username" aria-describedby="button-addon2" value={input} onChange={changeInput}/>
            <button className="btn btn-outline-white btn-success" type="button" id="button-addon2" onClick={submit}>ADD TASK</button>
          </div>
          <div>
            <ul className="list-unstyled">
              {
              todo.map((item)=>( <li key={item.id}>
                {
                  (editingItemId===item.id)?(<div className="bg-white border rounded mt-1 d-flex justify-content-between align-items-center">
                  <input autoFocus type="input" onChange={handleInputChange} value={editedItemName} className="form-control-plaintext w-100 ms-2" />
                  <div className="d-flex">
                    <button className="btn btn-default" onClick={handleSaveItem} style={{ padding: 0, backgroundColor: 'transparent', border: 'none' }}>
                    <FontAwesomeIcon icon={faFloppyDisk} /> {/* corrected icon name */}
                    </button>
                    <button className="btn btn-default ms-2 pe-2" onClick={()=>cancelEditItem(item)} style={{ padding: 0, backgroundColor: 'transparent', border: 'none' }}>
                    <FontAwesomeIcon icon={faCircleXmark} /> {/* corrected icon name */}
                    </button>
                  </div>
                </div>)
                
                :(<div className="bg-white rounded p-2 mt-1 d-flex justify-content-between align-items-center">
                  <div className="task-description">
                    <input type="checkbox"/>
                    <label>{item.name}</label>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-default" onClick={()=>handleEditItem(item)} style={{ padding: 0, backgroundColor: 'transparent', border: 'none' }}>
                      <FontAwesomeIcon icon={faPenSquare} /> {/* corrected icon name */}
                    </button>
                    <button className="btn btn-default ms-2" onClick={()=>handleDelete(item.id)} style={{ padding: 0, backgroundColor: 'transparent', border: 'none' }}>
                      <FontAwesomeIcon icon={faTrash} /> {/* corrected icon name */}
                    </button>
                  </div>
                </div>)
                }
              </li>))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
