import { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = function () {
  // our object to be returned later.
  let appData = {};

  // init our states.
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // get data from server, push that into states.
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

  // finds the current days ID from a given appointment ID.
  const getDayIDFromApptID = function (apptID) {
    // look through the days
    for (let i = 0; i < state.days.length; i++) {
      // if the i'th day contains the appointment, we have found the correct day, return i.
      if (state.days[i].appointments.includes(apptID)) {
        return i;
      }
    }
  }
  const updateSpots = function (dayID, tempstate) {
    let newDays = tempstate.days;
    // max amount of spots is the amount of appointments on the given day. i.e. 5 appointments, start at 5 spots.
    let newSpotCount = tempstate.days[dayID].appointments.length;
    // we are going to traverse the appointments for the given day.
    let apptKeys = Object.values(tempstate.days[dayID].appointments);

    for (const i of apptKeys) {
      // if we find an appointment, we reduce spots by 1.
      if (tempstate.appointments[i].interview) {
        newSpotCount--;
      }
      
    }
    // we update todays spot count, and then we return the new state
    newDays[dayID].spots = newSpotCount;
    return newDays;

  }

  const bookInterview = function (id, interview) {
    // find out what day we are booking for using the appointment ID
    const dayID = getDayIDFromApptID(id);
    // prep our data with the new interview data, ready to go into state.
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // data being sent to server
    let putData = {
      "interview": {
        "student": interview.student,
        "interviewer": interview.interviewer
      }
    };

    const putPromise = new Promise((resolve, reject) => {
      axios.put(`http://localhost:8001/api/appointments/${id}`, putData)
      // if we get a response, it can only be good
        .then(res => {
          const newStateWithAppt = {
            ...state,
            appointments
          }
          // get our newDays state with new spots count.
          const newDays = updateSpots(dayID, newStateWithAppt)
          const newStateWithDays = { ...newStateWithAppt, days: newDays }
          //  set the state and finish up!
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
    // find the day ID for the appointment we are cancelling.
    const dayID = getDayIDFromApptID(id);
    // prep data to set interview to null for this ID, ready to update state if request is successful
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
        // if the server responds saying it has sucessfully deleted it...
        .then(res => {
          const newStateWithAppt = {
            ...state,
            appointments
          }
          // find how many spots we have now for this day ID
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

  // give our output object all the things it needs to work in the outside world.
  appData.state = { ...state };
  appData.setDay = setDay;
  appData.cancelInterview = cancelInterview;
  appData.bookInterview = bookInterview;

  return appData;
}

export { useApplicationData };