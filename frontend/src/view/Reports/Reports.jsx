import React, { useEffect, useState } from 'react'
import Widgets from './Components/Widgets'
import MonthlySalesTable from './Components/MonthlySalesTable'
import axiosClient from '../../axiosClient'

export default function Reports() {
  const [loading, setLoading] = useState(true)

  return (
    <div>
        <Widgets/>
    </div>
  )
}
