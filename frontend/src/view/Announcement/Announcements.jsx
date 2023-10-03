import React, { useEffect, useState } from 'react'
import PeopleTable from './Table/PeopleTable'
import axiosClient from '../../axiosClient';

export default function Announcements({link}) {
  const [links, setLinks] = useState([]);
  const [passengers, setPassengers] = useState([])
  const [loading, setLoading] = useState(true)
  const [limit, _setLimit] = useState(15)
  const [paginate, setPaginate] = useState(1);

  const handleLoading = () => {
    setLoading(true)
  }

  const handleLimit = (l) => {
    _setLimit(l)
  }

  const handlePaginate = (p) => {
    setPaginate(p)
  }

  useEffect(() => {
    axiosClient.get(`${link}${limit}?page=${paginate}`)
    .then(({data}) => {
        setPassengers(data.announcements.data)
        setLinks(data.announcements.links)
        setLoading(false)
    })
}, [loading])
  return (
    <div>
      <PeopleTable
        announcements={passengers}
        handleLoading={handleLoading}
        links={links}
        handleLimit={handleLimit}
        handlePaginate={handlePaginate}
        loading={loading}
      />
    </div>
  )
}
