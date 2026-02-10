const BASE_URL="http://localhost:5000/api";
const getAuthHeaders=()=>{
    const token=localStorage.getItem("token");
    return {
        "content-Type":"application/json",
        Authorization:`Bearer ${token}`
    }
};
export const getTasks=async()=>{
    const response=await fetch(`${BASE_URL}/tasks`,{
        headers:getAuthHeaders()
    });
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.message || "Failed to Fetch tasks");
    }
    return data;
};
export const createTask=async(title)=>{
    const response=await fetch(`${BASE_URL}/tasks`,{
        method:"POST",
        headers:getAuthHeaders(),
        body:JSON.stringify({title})
    })
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.message || "failed to create task");
    }
    return data;
}
export const updateTask = async (id, title) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update task");
  }
  return data;
};


export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete task");
  }
  return data;
};
