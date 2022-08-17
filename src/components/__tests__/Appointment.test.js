import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";
import { waitForElement } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

describe("Appointment", () => {

  it("finds timeslot time of 12pm when created", () => {
    const { getByText } = render(<Appointment time="12pm" />);
  
    return waitForElement(() => getByText("12pm"));
  });

  it("finds the img when theres no interview", () => {
    const { getByRole } = render(<Appointment />);
  
    return waitForElement(() => getByRole('img'));

    
  });
  
});

