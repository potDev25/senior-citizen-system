import React from 'react'
import Announcements from './Announcements'

export default function Layout() {
  const link = '/announcement/index/'
  return (
    <div>
      <Announcements
        link={link}
      />
    </div>
  )
}
