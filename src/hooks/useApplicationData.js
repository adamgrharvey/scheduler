import { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = function () {
  let appData = {};

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  const setDay = day => setState({ ...state, day });

  const getDayIDFromApptID = function (apptID) {
    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].appointments.includes(apptID)) {
        return i;
      }
    }
  }
  const updateSpots = function (dayID, tempstate) {
    let newDays = tempstate.days;
    let newSpotCount = tempstate.days[dayID].appointments.length;
    let apptKeys = Object.values(tempstate.days[dayID].appointments);

    for (const i of apptKeys) {
      if (tempstate.appointments[i].interview) {
        newSpotCount--;
      }
    }
    newDays[dayID].spots = newSpotCount;
    return newDays;

  }

  const bookInterview = function (id, interview) {
    const dayID = getDayIDFromApptID(id);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let putData = {
      "interview": {
        "student": interview.student,
        "interviewer": interview.interviewer
      }
    };

    const putPromise = new Promise((resolve, reject) => {
      axios.put(`http://localhost:8001/api/appointments/${id}`, putData)
        .then(res => {
          const newStateWithAppt = {
            ...state,
            appointments
          }
          const newDays = updateSpots(dayID, newStateWithAppt)
          const newStateWithDays = { ...newStateWithAppt, days: newDays }
          setState(newStateWithDays)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })

    })
    return putPromise;

  };

  const cancelInterview = function (id) {
    const dayID = getDayIDFromApptID(id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const deletePromise = new Promise((resolve, reject) => {
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
        .then(res => {
          const newStateWithAppt = {
            ...state,
            appointments
          }
          const newDays = updateSpots(dayID, newStateWithAppt)
          const newStateWithDays = { ...newStateWithAppt, days: newDays }
          setState(newStateWithDays)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })

    })
    return deletePromise;

  };

  appData.state = { ...state };
  appData.setDay = setDay;
  appData.cancelInterview = cancelInterview;
  appData.bookInterview = bookInterview;

  return appData;
}

export { useApplicationData };