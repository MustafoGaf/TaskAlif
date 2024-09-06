import { useState } from "react"
import MyModal from "./MyModal"

export default function AddWorker(){
    const [isModal, setIsModal] = useState(false)
    function closeModal(){
        setIsModal(prev => !prev)
    }
    return (
        <div className="my-4 flex items-center justify-center">
            <div>
                <button onClick={()=>setIsModal(true)} className="py-2 px-5 rounded bg-[#3e9480] text-white hover:bg-[#3b6158] hover:text-red hover:font-[500]">Добавить</button>
            </div>
            {isModal &&(
                <MyModal click={() => closeModal()}/>
            )}
        </div>
    )
}