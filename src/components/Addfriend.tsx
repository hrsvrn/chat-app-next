"use client"
import {FC, useState} from 'react';
import Button from './ui/button';
import { addvalidator } from '@/lib/validations/add-friend';
import  axios, { AxiosError } from 'axios'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
interface AddfriendProps{}


type FormData = z.infer<typeof addvalidator>
const Addfriend: FC<AddfriendProps> =({}) =>{

    const {
      register, handleSubmit, setError, formState:{errors}
    } = useForm<FormData>({
      resolver: zodResolver(addvalidator),
    })
    const [success, setsuccess] = useState<boolean>(false)
    const addpeeps = async(email:string)=>{
      try{

        const validatemail = addvalidator.parse({email}) 

        await axios.post('/api/friends/add', {
          email:validatemail
        })

        setsuccess(true)
      } catch (error){
        if(error instanceof z.ZodError){
          setError('email',{message:error.message})
          return
        }
        if(error instanceof AxiosError){
          setError('email', {message: error.response?.data})
          return
        }
        setError('email', {message:'something went wrong  '})
      }
    }

    const onSubmit =(data: FormData) => {
      addpeeps(data.email)
    }
    return (
    <form className='max-w-sm' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email"
        className='block text-sm font-medium leading-6 text-gray-900'>
            Add a friend
        </label>

    <div className='mt-2 flex gap-4'>
        <input

          {...register('email')}
          type='text'
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder='you@example.com'
        />
        <Button>Add</Button>
      </div>
      <p className='bg-red-600 text-white mt-2 text-sm'>{errors.email?.message} </p>
      {success? (
        <p className='mt-2 text-green-700 text-sm'>Friend req sent!</p>
      ) : null}
     
    </form>
    )
}

export default Addfriend