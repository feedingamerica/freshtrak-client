import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import PrimaryInfoFormComponent from "../PrimaryInfoFormComponent";
import { noop, mockPrimaryInfoBuilder } from "../../../Testing";

test("should render", () => {
  expect(() => {
    render(
      <PrimaryInfoFormComponent onSelectedChild={noop} onFormErrors={noop} />
    );
  }).not.toThrowError();
});

test("should show validation errors", async () => {
  const { container, getByTestId } = render(
    <PrimaryInfoFormComponent
      ref = {jest.fn()}
      onSelectedChild={noop}
      onFormErrors={noop}
    />
  );
  const first_name = container.querySelector('input[name="first_name"]');
  const last_name = container.querySelector('input[name="last_name"]');
  const middle_name = container.querySelector('input[name="middle_name"]');
  const dob = container.querySelector('input[name="dob"]');
  const email = container.querySelector('input[name="email"]');
  const phno = container.querySelector('input[name="phone_number"]');

  fireEvent.blur(first_name);
  await wait(() => {
    expect(getByTestId("first-name")).toHaveTextContent(
      "This field is required"
    );
  });
  fireEvent.blur(middle_name);
  await wait(() => {
    expect(getByTestId("middle-name")).toHaveTextContent(
      "This field is required"
    );
  });
  fireEvent.blur(last_name);
  await wait(() => {
    expect(getByTestId("last-name")).toHaveTextContent(
      "This field is required"
    );
  });
  fireEvent.blur(dob);
  await wait(() => {
    expect(getByTestId("dob")).toHaveTextContent("This field is required");
  });
  fireEvent.blur(email);
  await wait(() => {
    expect(getByTestId("email")).toHaveTextContent("This field is required");
  });
});


test("Testing for value binding", async () => {
  const {container,getByTestId} = render(
    <PrimaryInfoFormComponent
      ref = {jest.fn()}
      onSelectedChild={noop}
      onFormErrors={noop}
    />
  );
  let mockPrimaryData = mockPrimaryInfoBuilder();

  const first_name = container.querySelector('input[name="first_name"]');
  const last_name = container.querySelector('input[name="last_name"]');
  const middle_name = container.querySelector('input[name="middle_name"]');
  const dob = container.querySelector('input[type="date"]');
  const email = container.querySelector('input[name="email"]');
  const suffix = container.querySelector('select[name="Suffix"]');
  const hoh = container.querySelector('select[name="hoh"]');
  const phno = container.querySelector('input[name="phone_number"]');
  const phnoChk = container.querySelector('input[name="phone_number_checkbox"]');
  const comPref = container.querySelector('select[name="communication_preference"]');
  
  let fakeDOB = '1990-12-12' 
  fireEvent.change(first_name, { target: { value:mockPrimaryData.firstName } })
  expect(first_name.value).toBe(mockPrimaryData.firstName);

  fireEvent.change(last_name, { target: { value: mockPrimaryData.lastName } })
  expect(last_name.value).toBe(mockPrimaryData.lastName);

  fireEvent.change(middle_name, { target: { value: mockPrimaryData.middleName } })
  expect(middle_name.value).toBe(mockPrimaryData.middleName);

  fireEvent.change(dob, { target: { value: fakeDOB } })
  expect(dob.value).toBe(fakeDOB);

  fireEvent.change(email, { target: { value: mockPrimaryData.email } })
  expect(email.value).toBe(mockPrimaryData.email);

  fireEvent.change(suffix, { target: { value: mockPrimaryData.suffix } })
  expect(suffix.value).toBe(mockPrimaryData.suffix);

  fireEvent.change(hoh, { target: { value: mockPrimaryData.hoh } })
  expect(hoh.value).toBe(mockPrimaryData.hoh);

  fireEvent.change(phnoChk);
  expect(phnoChk.value).toBe('on');

  fireEvent.change(comPref,{ target: { value: mockPrimaryData.comPref } });
  expect(comPref.value).toBe(mockPrimaryData.comPref);

  

  fireEvent.change(phno, { target: { value:mockPrimaryData.phoneNumber  } })
  expect(phno.value).toBe( `${mockPrimaryData.phoneNumber}`);

//  checking whether disable phone option toggles both divs.
fireEvent.click(phnoChk);
await wait(()=>{
  expect(getByTestId('phno-disabled').disabled).toBeTruthy();
});   

fireEvent.click(phnoChk);
await wait(()=>{
  expect(getByTestId('phno-not-disabled').disabled).toBeFalsy();
}); 

// Checking default switch case

fireEvent.change(first_name, { target: { name:'switch_default',value:mockPrimaryData.firstName } });
expect(first_name.value).toBe(mockPrimaryData.firstName );



});