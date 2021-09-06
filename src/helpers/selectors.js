export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(val => val.name === day);
  const arr = [];

  filteredDays.map(day => {
    day.appointments.map(appointment => {
      arr.push(state.appointments[appointment]);
    });
  });
  
  return arr;
}