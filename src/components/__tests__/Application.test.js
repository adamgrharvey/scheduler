import React from "react";
import axios from "axios";
import { render, cleanup, fireEvent, prettyDOM, queryByText, getByPlaceholderText, getAllByTestId, getByAltText } from "@testing-library/react";
import { waitForElement } from "@testing-library/react";
import Application from "components/Application";
import { act } from "react-test-renderer";
import { getByText } from "@testing-library/react";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday"));
});

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = getAllByTestId(container, "appointment")[0];
  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  expect(getByAltText(appointment, "Sylvia Palmer")).toBeInTheDocument();
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  //console.log(prettyDOM(container));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  //console.log(prettyDOM(day));
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = getAllByTestId(container, "appointment")[1];
  // 3. Click the "Trashcan" icon on the second booked appointment.
  fireEvent.click(getByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Confirm")).toBeInTheDocument();
  // 4. click confirm
  fireEvent.click(getByText(appointment, "Confirm"));
  // 5. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  await waitForElement(() => getByAltText(appointment, "Add"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  // 6. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();


});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = getAllByTestId(container, "appointment")[1];
  // 3. Click the "Edit" button on the booked appointment.
  fireEvent.click(getByAltText(appointment, "Edit"));
  // 4. Change student name
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  expect(getByText(appointment, "Save")).toBeInTheDocument();
  // 5. Click the "Save" button
  fireEvent.click(getByText(appointment, "Save"));
  // 6. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  // 7. Wait until the appointment is displayed.
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  // 8. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});


it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = getAllByTestId(container, "appointment")[1];
  // 3. Click the "Edit" button on the booked appointment.
  fireEvent.click(getByAltText(appointment, "Edit"));
  // 4. Change student name
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  expect(getByText(appointment, "Save")).toBeInTheDocument();
  // 5. Click the "Save" button
  fireEvent.click(getByText(appointment, "Save"));
  // 6. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "Could not save appointment."));
  expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();
});

it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();
  // 1. Render the Application.
  const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = getAllByTestId(container, "appointment")[1];
  // 3. Click the "Trashcan" icon on the second booked appointment.
  fireEvent.click(getByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Confirm")).toBeInTheDocument();
  // 4. click confirm
  fireEvent.click(getByText(appointment, "Confirm"));
  // 5. Check that the element with the text "Deleting" is displayed.
   expect(getByText(appointment, "Deleting")).toBeInTheDocument();
   await waitForElement(() => getByText(appointment, "Could not delete appointment."));
  // expect(getByText(appointment, "Could not delete appointment.")).toBeInTheDocument();
});