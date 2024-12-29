import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import { getTaskApi } from '../apis/fetchApi';
import { Button, Table, Modal } from 'react-bootstrap';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const token = sessionStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` };

  const GetData = () => {
    getTaskApi(headers)
      .then((res) => {
        const calendarEvents = res.data.map((task) => ({
          title: task.title,
          start: task.created_date,
          end: task.due_date,
          description: task.description,
          status: task.status,
          extendedProps: {
            description: task.description,
            status: task.status,
          },
        }));
        setEvents(calendarEvents);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
      });
  };

  const handleshow = (info) => {
    setShowModal(true);
    const selectedDate = new Date(info.dateStr);
    const filteredTasks = events.filter((event) => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
    setSelectedDayTasks(filteredTasks);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        events={events}
        views={{
          multiMonth3: {
            type: 'multiMonth',
            duration: { months: 3 },
            titleFormat: { month: 'short', year: 'numeric' },
            columnHeaderFormat: { weekday: 'short' },
            buttonText: '3 Months',
          },
        }}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth, timeGridWeek, listDay, multiMonth3',
        }}
        dateClick={handleshow}
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {selectedDayTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.end}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      <style>{`
        .fc {
          text-decoration: none !important;
        }
        .fc-daygrid-day-number {
          text-decoration: none !important;
        }
        .fc-event-title {
          text-decoration: none !important;
        }
        .fc-list-event-title {
          text-decoration: none !important;
        }
        .fc-day-header {
          text-decoration: none !important;
        }
        .fc-event a {
          text-decoration: none !important;
        }
      `}</style>
    </>
  );
};

export default Calendar;
