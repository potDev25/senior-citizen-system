import React, { useEffect, useState } from 'react'
import Widgets from './Components/Widgets'
import MonthlySalesTable from './Components/MonthlySalesTable'
import axiosClient from '../../axiosClient'

export default function Reports() {
  const [loading, setLoading] = useState(true)

  return (
    <div>
        <div className='w-full h-[50px] bg-blue-500 text-white rounded mb-5 flex items-center justify-center'></div>
        <Widgets/>
    </div>
  )
}
