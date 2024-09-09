import React from 'react'

const InputBox = ({label,placeholder , required ,onChange}) => {
  return (
    <div className=''>
        <div className='text-sm  font-medium text-left py-2'>
            {label}{required && <span className='text-red-500'>*</span>}
        </div>
        <input onChange={onChange} placeholder={placeholder} type="text" name="" id=""  className='w-full px-2 py-1 border '/>
    </div>
  )
}

export default InputBox