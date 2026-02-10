import Task from '../models/Task.js';

export const gettasks=async(req,res)=>{
   const tasks=await Task.find({user:req.user._id});
   res.json(tasks);
};
export const createtask=async(req,res)=>{
    const{title}=req.body;
    if(!title){
        return res.status(400).json({message:"title is required"});
    }
    const task=await Task.create({
        title,
        user:req.user._id
    });
    res.status(201).json(task);
};
export const updatetask=async(req,res)=>{
    const task=await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({message:"task not found"});
    }
    if(task.user.toString()!==req.user._id.toString()){
        return res.status(401).json({message:"Not authorized"});
    }
    task.title=req.body.title || task.title;
    const updatedtask=await task.save();
    res.json(updatedtask);
}
export const deletetask=async(req,res)=>{
    const task=await Task.findById(req.params.id);
    if(!task){
        return res.status(404).json({message:"task not found"});
    }
    if(task.user.toString()!==req.user._id.toString()){
        return res.status(404).json({message:"Not authorized"});
    }
    await task.deleteOne();
    res.json({message:"task deleted"});
};