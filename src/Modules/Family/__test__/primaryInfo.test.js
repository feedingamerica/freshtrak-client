import React from "react";

import { fake,oneOf } from "test-data-bot";
import { render, fireEvent, wait } from "@testing-library/react";
import PrimaryInfoFormComponent from "../PrimaryInfoFormComponent";
import { noop, mockPrimaryInfoBuilder } from "../../../Testing";

import { create, act } from "react-test-renderer";
// import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// configure({ adapter: new Adapter() });
test("should render", () => {
  expect(() => {
    render(
      <PrimaryInfoFormComponent onSelectedChild={noop} onFormErrors={noop} />
    );
  }).not.toThrowError();
});

test("should show validation errors", async () => {
  const { container, getByTestId, getByText } = render(
    <PrimaryInfoFormComponent
      onSelectedChild={mockPrimaryInfoBuilder}
      onFormErrors={noop}
    />
  );
  const first_name = container.querySelector('input[name="first_name"]');
  const last_name = container.querySelector('input[name="last_name"]');
  const middle_name = container.querySelector('input[name="middle_name"]');
  const dob = container.querySelector('input[name="dob"]');
  const email = container.querySelector('input[name="email"]');
  const hoh = container.querySelector('input[name="hoh"]');
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
  fireEvent.blur(phno);
  await wait(() => {
    expect(getByTestId("phno")).toHaveTextContent("This field is required");
  });

  // Validation testing still pending
});




test("Testing for value binding", async () => {
  const {container,getByTestId} = render(
    <PrimaryInfoFormComponent
      onSelectedChild={mockPrimaryInfoBuilder}
      onFormErrors={noop}
    />
  );

// Generate fake data
  const fakeEmail = fake((f) => f.internet.email()).generate(1);
  const fakeDOB = '2019-03-29';
  const fakeFname = fake((f) => f.name.firstName()).generate(1);
  const fakeLname = fake((f) => f.name.lastName()).generate(1);
  const fakeMname = fake((f) => f.name.lastName()).generate(1);
  const fakeSuffix = oneOf('Jr','Sr').generate(1);
  const fakeHoh = oneOf('Yes','No').generate(1);
  const fakePhno = '123456789';
  const fakeChk = oneOf('true','false').generate(1);
  const fakeComPref = oneOf('Email','Phone').generate(1);





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
  
  fireEvent.change(first_name, { target: { value: fakeFname } })
  expect(first_name.value).toBe(fakeFname);

  fireEvent.change(last_name, { target: { value: fakeLname } })
  expect(last_name.value).toBe(fakeLname);

  fireEvent.change(middle_name, { target: { value: fakeMname } })
  expect(middle_name.value).toBe(fakeMname);

  fireEvent.change(dob, { target: { value: fakeDOB } })
  expect(dob.value).toBe(fakeDOB);

  fireEvent.change(email, { target: { value: fakeEmail } })
  expect(email.value).toBe(fakeEmail);

  fireEvent.change(suffix, { target: { value: fakeSuffix } })
  expect(suffix.value).toBe(fakeSuffix);

  fireEvent.change(hoh, { target: { value: fakeHoh } })
  expect(hoh.value).toBe(fakeHoh);

  fireEvent.change(phnoChk);
  expect(phnoChk.value).toBe('on');

  fireEvent.change(comPref,{ target: { value: fakeComPref } });
  expect(comPref.value).toBe(fakeComPref);

  

  fireEvent.change(phno, { target: { value:fakePhno  } })
  expect(phno.value).toBe(fakePhno);

//  checking whether disable phone option toggles both divs.
fireEvent.click(phnoChk);
await wait(()=>{
  expect(getByTestId('phno-disabled').disabled).toBeTruthy();
});   

fireEvent.click(phnoChk);
await wait(()=>{
  expect(getByTestId('phno-not-disabled').disabled).toBeFalsy();
}); 
});

test('checking if handleError function binded properly',()=>{
  const {container,getByTestId} = render(
    <PrimaryInfoFormComponent
     ref = {jest.fn()}
      onSelectedChild={mockPrimaryInfoBuilder}
      onFormErrors={noop}
    />
  );

// Generate fake data
  // const fakeEmail = fake((f) => f.internet.email()).generate(1);
  // const fakeDOB = '2019-03-29';
  const fakeFname = fake((f) => f.name.firstName()).generate(1);
  // const fakeLname = fake((f) => f.name.lastName()).generate(1);
  // const fakeMname = fake((f) => f.name.lastName()).generate(1);
  // const fakeSuffix = oneOf('Jr','Sr').generate(1);
  // const fakeHoh = oneOf('Yes','No').generate(1);
  // const fakePhno = '123456789';
  // const fakeChk = oneOf('true','false').generate(1);
  // const fakeComPref = oneOf('Email','Phone').generate(1);





  const fname = container.querySelector('input[name="first_name"]');
  // const last_name = container.querySelector('input[name="last_name"]');
  // const middle_name = container.querySelector('input[name="middle_name"]');
  // const dob = container.querySelector('input[type="date"]');
  // const email = container.querySelector('input[name="email"]');
  // const suffix = container.querySelector('select[name="Suffix"]');
  // const hoh = container.querySelector('select[name="hoh"]');
  // const phno = container.querySelector('input[name="phone_number"]');
  // const phnoChk = container.querySelector('input[name="phone_number_checkbox"]');
  // const comPref = container.querySelector('select[name="communication_preference"]');

  fireEvent.blur(fname,{ target: { value: fakeFname } });
  
  

});