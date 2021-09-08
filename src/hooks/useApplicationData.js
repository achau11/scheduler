import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  //The default state of the application to be used
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {
      '1': {
        id: 1,
        time: '12pm',
        interview: null
      }
    },
    interviewers: {}
  });

  //*********Functions that manipulate the data***************
  const setDay = day => setState({...state, day});

  function bookInterview(id, interview) { 

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Add the state to the API so that data persists
    return axios.put(`/api/appointments/${id}`, {interview}).then(response => {
      setState({...state, appointments});
    });
  }

  //Remove an appointment and delete it from the database
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, {}).then(() => {
      setState({...state, appointments});
    });
  }

  //Make API calls to display data from the database
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(all => {
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      }));
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
}
