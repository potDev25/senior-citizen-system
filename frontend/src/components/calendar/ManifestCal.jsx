import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'

export default function ManifestCal() {
  return (
    <div>
         <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
            initialView="dayGridMonth"
            selectable
            dayMaxEvents={true}
            dateClick={(date) => {
                
            }}
            headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
                prev: 'Prev'
            }}
            events={
                [
                    {
                        title: 'Title',
                        start: '2023-07-01', 
                        end: '2018-07-02',
                        color: '#DBAA00',
                    },
                    {
                        title: 'The Title2 ',
                        start: '2023-07-01', 
                        end: '2018-07-02',
                        color: '#DBAA00',
                    }
                ]
            }
        />
    </div>
  )
}
