import React from "react";

export function getAppointmentsForDay(state, day) {
  let out = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      out = state.days[i].appointments.slice();
      break;
    }
  }

  for (let i = 0; i < out.length; i++) {
    out[i] = state.appointments[out[i]];
  }
  return out;
}
