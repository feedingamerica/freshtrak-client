import React from 'react';
import { render,fireEvent, wait} from '@testing-library/react';
import MemberInfoComponent from '../MemberInfoComponent';
import {noop} from '../../../Testing'

test("should populate data correctly", async () => {

	const mockData={
        memberData:[{
                id:'First Adult',
                first_name:'Adult 01',
                last_name:'Adams',
                middle_name:'Adams',
                dob:'1990-12-12',
                gender:'Male',
                suffix:'Jr'
            },{
                id:'Second Adult',
                first_name:'Mark Mohinokof',
                last_name:'Simson',
                middle_name:'Simson',
                dob:'1990-12-12',
                gender:'Female',
                suffix:'Jr'
            }]

        
    }
    const { container, getByTestId, getByText,baseElement } = render(
        <MemberInfoComponent
            ref = {noop}
            memberData = {mockData}
        />);

    expect(container.querySelector(`input[value="${mockData.memberData[0].first_name}"]`)).toBeTruthy();
    expect(container.querySelector(`input[value="${mockData.memberData[1].first_name}"]`)).toBeTruthy();
    expect(container.querySelector(`input[value="${mockData.memberData[0].last_name}"]`)).toBeTruthy();
    expect(container.querySelector(`input[value="${mockData.memberData[1].last_name}"]`)).toBeTruthy();
    expect(container.querySelector(`input[value="${mockData.memberData[0].middle_name}"]`)).toBeTruthy();
    expect(container.querySelector(`input[value="${mockData.memberData[1].middle_name}"]`)).toBeTruthy();
    expect(container.querySelector(`input[value="${mockData.memberData[0].dob}"]`)).toBeTruthy();
    expect(container.querySelector(`input[value="${mockData.memberData[1].dob}"]`)).toBeTruthy();
    expect(container.querySelector(`select[id="gender_0"]`).value).toBe(mockData.memberData[0].gender);
    expect(container.querySelector(`select[id="gender_1"]`).value).toBe(mockData.memberData[1].gender);
    expect(container.querySelector(`select[id="suffix_0"]`).value).toBe(mockData.memberData[0].suffix);
    expect(container.querySelector(`select[id="suffix_1"]`).value).toBe(mockData.memberData[1].suffix);

//testing first few input elements are being binded or not.

    fireEvent.change(container.querySelector(`input[value="${mockData.memberData[0].first_name}"]`),{target:{value:'Phil'}});
    expect(container.querySelector(`input[value="${mockData.memberData[0].first_name}"]`)).toBeFalsy();

    fireEvent.change(container.querySelector(`input[value="${mockData.memberData[1].first_name}"]`),{target:{value:'Norman'}});
    expect(container.querySelector(`input[value="${mockData.memberData[1].first_name}"]`)).toBeFalsy();
    fireEvent.change(container.querySelector(`select[id="gender_0"]`),{target:{value:'Female'}});
    expect(container.querySelector(`select[id="gender_0"]`).value).toBe('Female');
  });