import React from 'react'
import Widgets from './Components/Widgets'
import MonthlySalesTable from './Components/MonthlySalesTable'

export default function Reports() {
  return (
    <div>
        <Widgets/>
        <div className='mt-5'>
            <MonthlySalesTable/>
        </div>
    </div>
  )
}
