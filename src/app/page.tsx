"use client";

import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from "react";
import {advocateData} from "@/db/seed/advocates";

type advocateDataType = typeof advocateData
type advocateType = advocateDataType[number];
type advocateStateType = Array<advocateType | undefined>

export default function Home() {
  const [advocates, setAdvocates] = useState<advocateStateType>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<advocateStateType>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchTerm = e.target.value;
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate?.firstName.toLocaleLowerCase().includes(searchTerm) ||
        advocate?.lastName.toLocaleLowerCase().includes(searchTerm) ||
        advocate?.city.toLocaleLowerCase().includes(searchTerm) ||
        advocate?.degree.toLocaleLowerCase().includes(searchTerm) ||
        advocate?.specialties.find((item) => item.toLocaleLowerCase().includes(searchTerm)) ||
        // Return an advocate if their years of experience is gte the desired amount
        advocate?.yearsOfExperience && advocate?.yearsOfExperience >= parseInt(searchTerm) ||
        advocate?.phoneNumber.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    const searchInput = document.getElementById("search-input") as HTMLInputElement;
    searchInput.value = "";
    // Reset the filtered advocates to the original list
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="font-bold">Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p className="inline-block mr-2">Search</p>
        <input id="search-input" className="border-black border-2 border-solid rounded-md mr-2 py-2 px-2 text-sm h-10" onChange={onChange} />
        <button onClick={onClick} className="border-black border-2 border-solid mr-2 rounded-md px-2 py-1 text-sm h-10">Reset Search</button>
      </div>
      <br />
      <br />
      <div className="table-wrp block max-h-96 overflow-y-auto rounded-md">
      <table className="table-auto w-full">
        <thead className="sticky top-0">
          <tr>
            <th className="p-2 bg-blue-200">First Name</th>
            <th className="p-2 bg-blue-200">Last Name</th>
            <th className="p-2 bg-blue-200">City</th>
            <th className="p-2 bg-blue-200">Degree</th>
            <th className="p-2 bg-blue-200">Specialties</th>
            <th className="p-2 bg-blue-200">Years of Experience</th>
            <th className="p-2 bg-blue-200">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr className="even:bg-white odd:bg-blue-50" key={`${advocate?.firstName}-${advocate?.lastName}`}>
                <td className="p-2">{advocate?.firstName}</td>
                <td className="p-2">{advocate?.lastName}</td>
                <td className="p-2">{advocate?.city}</td>
                <td className="p-2">{advocate?.degree}</td>
                <td className="p-2">
                  {advocate?.specialties.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td className="p-2">{advocate?.yearsOfExperience}</td>
                <td className="p-2">{advocate?.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </main>
  );
}
