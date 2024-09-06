import {  useState } from "react";
import { useForm } from "react-hook-form"


export default function MyModal({ click }){
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState()
  const addEmployees = async (data) => {
    
    setLoading(true)
    try {
        
        const response = await fetch(
          'http://localhost:3000/employees',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: new Date().getTime(), 
                ...data
            }),
          }
        );
        if(response.ok){
            close()
            setMessage('Данные успешно сохранено')
        }

    } catch (error) {
        setMessage("Ошибка при отправки данные")
    }
    finally{
        setLoading(false)
    }
   
    
  };



  const {
    register,
    formState:{
        errors, isValid
    },
    handleSubmit
  } = useForm({mode:'onBlur'})

  const handleClose = () => {
    click()
  };

  
  return (
    <div
      className="z-10 relative"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div  className="fixed inset-0 z-10 w-screen overflow-y-auto" onClick={() => handleClose()}>
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <form onSubmit={handleSubmit(addEmployees)} className="w-1/2 flex justify-center" >
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                  <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black font-[500] ">Ф.И.О</label>
                    <input type="text" {...register('fullName', {
                        required: 'Поля обязательно для заполнения' ,
                        minLength:{
                            value: 8,
                            message : "Минимальное количество символов — 8"
                        }
                    })} className={`bg-green-50 border border-green-500 text-green-900    text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5   ${(errors.fullName) ? 'border-red-500' : 'placeholder-green-700'} `} placeholder="Введите ФИО" />
                    {errors.fullName && (<p className="mt-2 text-sm text-red-600 "><span className="font-medium">{errors.fullName.message || "Eror"}</span></p>)}
                </div>
               <div className="mb-6">
                    <label htmlFor="job" className="block mb-2 text-sm font-medium text-black font-[500] ">Должность</label>
                    <input type="text" {...register('job', {
                        required: 'Поля обязательно для заполнения' ,
                         minLength:{
                            value: 3,
                            message : "Минимальное количество символов — 3"
                        }
                    })} className={`bg-green-50 border border-green-500 text-green-900    text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5   ${(errors.job) ? 'border-red-500' : 'placeholder-green-700'} `} placeholder="Должность" />
                    {errors.job && (<p className="mt-2 text-sm text-red-600 "><span className="font-medium">{errors.job.message || "Eror"}</span></p>)}
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black font-[500]  ">Вид образования</label>
                    <select {...register("education")} className=" rounded-lg w-full p-2.5 bg-green-50 border border-green-500 text-green-900">
                    <option value="Высшее">Высшее</option>
                    <option value="Среднее">Среднее</option>
                </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black font-[500]">Учебное заведение
</label>
                    <input type="text" {...register('institution', {
                        required: 'Поля обязательно для заполнения' ,
                        minLength:{
                            value: 3,
                            message : "Минимальное количество символов — 3"
                        }
                    })} className={`bg-green-50 border border-green-500 text-green-900    text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5   ${(errors.institution) ? 'border-red-500' : 'placeholder-green-700'} `} placeholder="Введите учебное заведения" />
                    {errors.institution && (<p className="mt-2 text-sm text-red-600 "><span className="font-medium">{errors.institution.message || "Eror"}</span></p>)}
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black font-[500] ">Год окончания учебного завед-я
</label>
                    <input type="number" {...register('yearOfGraduation', {
                        required: 'Поля обязательно для заполнения' ,
                        min:{
                            value: 1970,
                            message : "Год должен быть между 1980 - 2024"
                        }, 
                        max:{
                            value: 2024,
                            message : "Год должен быть между 1980 - 2024"
                        }
                        
                    })} className={`bg-green-50 border border-green-500 text-green-900    text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5   ${(errors.yearOfGraduation) ? 'border-red-500' : 'placeholder-green-700'} `} placeholder="Год окончания" />
                    {errors.yearOfGraduation && (<p className="mt-2 text-sm text-red-600 "><span className="font-medium">{errors.yearOfGraduation.message || "Eror"}</span></p>)}
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black font-[500] ">Специальность
</label>
                    <input type="text" {...register('speciality', {
                        required: 'Поля обязательно для заполнения' ,
                        minLength:{
                            value: 4,
                            message : "Минимальное количество символов — 4"
                        }
                    })} className={`bg-green-50 border border-green-500 text-green-900    text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5   ${(errors.speciality) ? 'border-red-500' : 'placeholder-green-700'} `} placeholder="Введите специальность" />
                    {errors.speciality && (<p className="mt-2 text-sm text-red-600 "><span className="font-medium">{errors.speciality.message || "Eror"}</span></p>)}
                </div>
                </div>
              </div>
                  {
                      message !='' && (<h1 className="text-2xl text-[red] text-center">
                          {message}
                      </h1>)
                  }
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    disabled={!isValid || loading}
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Отправить
                </button>
                <button
                  onClick={() => click()}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


