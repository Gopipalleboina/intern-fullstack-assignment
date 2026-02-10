import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../services/taskService.js';
function Dashboard(){
    const navigate=useNavigate();

    const[tasks,settasks]=useState([]);
    const[title,settitle]=useState("");
    const[editid,seteditid]=useState(null);
    const[edittitle,setedittitle]=useState("");
    const[error,seterror]=useState("");

    const loadtask=async()=>{
        try{
            const data=await getTasks();
            settasks(data);
        }
        catch(error){
            seterror(error.message);
        }
    };

    useEffect(()=>{
        loadtask();
    },[]);

    const handleaddtask=async()=>{
      if(!title.trim()){
         seterror("title field is required");
         return;
      }
      try{
        await createTask(title);
        settitle("");
        loadtask();
      }
      catch(error){
        seterror(error.message);
      }
    };

    const handleupdatetask=async(id)=>{
      if(!edittitle.trim()) return;
      try{
        await updateTask(id,edittitle);
        seteditid(null);
        setedittitle("");
        loadtask();
      }
      catch(error){
        seterror(error.message);
      }
    };

    const handledeletetask=async(id)=>{
        try{
            await deleteTask(id);
            loadtask();
        }
        catch(error){
            seterror(error.message);
        }
    };

    const handlelogout=()=>{
        localStorage.removeItem("token");
        navigate("/login",{replace:true});
    };
    
    
    return(
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">Dashboard</h3>
                <button className="btn btn-outline-danger" onClick={handlelogout}>
                    Logout
                </button>
            </div>

            <div className="card shadow-sm p-4 mb-4">
                <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter new task"
                      value={title}
                      onChange={(e)=>{
                        settitle(e.target.value)
                      }}/>
                      <button className="btn btn-primary" onClick={handleaddtask}>
                            Add Task
                      </button>
                </div>
                </div>
                {error && <div className="alert alert-danger mb-3">{error}</div>}
                <ul className="list-group">
                    {tasks.map((task)=>(
                        <li
                        key={task._id}
                        className="list-group-item d-flex justify-content-between align-items-center">
                            {editid===task._id ? (
                                <div className="d-flex w-100 gap-2">
                                    <input 
                                    className="form-control"
                                    value={edittitle}
                                    onChange={(e)=>{
                                        setedittitle(e.target.value)
                                    }}/>
                                    <button
                                     className="btn btn-success btn-sm"
                                     onClick={()=>handleupdatetask(task._id)}
                                     >
                                        save
                                     </button>
                                    <button
                                     className="btn btn-secondary btn-sm"
                                     onClick={()=>seteditid(null)}
                                     >
                                        Cancel
                                     </button>
                                </div>
                            ) : (
                                <>
                                 <span>{task.title}</span>
                                 <div className="btn-group">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={()=>{
                                            seteditid(task._id);
                                            setedittitle(task.title);
                                        }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={()=>handledeletetask(task._id)}
                                        >
                                            Delete
                                        </button>
                                 </div>
                                </>
                            
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        
    )
}
export default Dashboard;