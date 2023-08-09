import React from 'react'
import SettingsTab from '../../components/Settings/SettingsTab'
import SettingsContent from '../../components/Settings/SettingsContent'
import { useParams } from 'react-router-dom'

export default function Settings() {
  
  return (
    <div className='flex gap-5'>
        <SettingsTab/>
        <SettingsContent/>
    </div>
  )
}
