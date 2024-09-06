import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import WorkersItems from "./WorkersItems"

export default function WorkersList(){
    const [employees, setEmployees] = useState([])
    const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
const [message, setMessage] = useState('')
const  bottomOfList = useRef()
    
   
const fetchEmployees = async() => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/employees?_page=${page}&_per_page=10`)
            const {next , data} = await response.json()
            
            
              setEmployees(prevEmployees => prevEmployees.concat(...data))
            
      
            setPage(next);
            setMessage('')
        } catch (error) {
            setMessage(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {

const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting){
            if(page != null){
                 fetchEmployees()
            }
        }
        }, {
            rootMargin : "10px",
           
        })

        observer.observe(bottomOfList.current)
        return () => {
          observer.unobserve(bottomOfList.current)  
        }
    }, [page])


    return (
<section>
    
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="py-3 px-6">Ф.И.О</th>
            <th className="py-3 px-6">Должность</th>
            <th className="py-3 px-6">Вид образования</th>
            <th className="py-3 px-6">Учебное заведение</th>
            <th className="py-3 px-6">Год окончания учебного заведения</th>
            <th className="py-3 px-6">Специальность</th>
          </tr>
        </thead>
        <tbody>  
            {employees.length > 0  && employees.map((employee) => (
                <WorkersItems emploee={employee} key={employee.id}/>
                    )) }
               
        </tbody>
        <tfoot ref={bottomOfList} />
     
      </table>
      {loading && (
  <div className=" flex items-center justify-center space-x-2 mt-5">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    <span className="text-blue-500 text-lg">Загрузка данных...</span>
  </div>
)}
      {message && (
        <h1 className="text-white bg-red-500 p-4 rounded-md text-center text-lg mt-5">
    Ошибка при получении данных
  </h1>
      )}
    </div>
</section>
    )
}