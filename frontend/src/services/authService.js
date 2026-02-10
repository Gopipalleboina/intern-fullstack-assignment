const BASE_URL="http://localhost:5000/api";
export const registerUser= async(formdata)=>{
    const response=await fetch(`${BASE_URL}/auth/register`,{
        method:"POST",
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify(formdata)
    });
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.message || "Registration Failed");
        
    }
    return data;
}
export const loginUser= async(formdata)=>{
    const response=await fetch(`${BASE_URL}/auth/login`,{
        method:"POST",
        headers:{
            "content-Type":"application/json",
        },
        body:JSON.stringify(formdata)
    })
    const data=await response.json();
    if(!response.ok){
        throw new Error(data.message || "Login failed");
    }
    localStorage.setItem("token",data.token);
    localStorage.setItem("user",JSON.stringify(data.user));
    return data;
}