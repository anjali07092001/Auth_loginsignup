import { toast } from "react-toastify";
export const handleSucess= (msg)=>{
toast.success(msg,
    {
        position:'top right'
    }
)}

export const handlerror= (msg)=>{
toast.error(msg,
    {
        position:'top right'
    })
}