"use client";
import React, { useState } from "react";
import FarmCards from "./FarmCards";
import DashboardLanding from "./DashboardLanding";
import SearchBar from "./Search";

type AllFarmInfoProps = {
  allfarmInfo: {
    id: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    animal: string;
    age: string;
    breed: string;
    gender: string;
    amount: number;
    message: string;
  }[];
};

const Dashboard = ({ allfarmInfo }: AllFarmInfoProps) => {
  const [filterBy, setFilteredBy] = useState({
    name: "",
    value: "",
  });
  const [searchFarmAnimal, setSearchFarmAnimal] = useState("");

  const allfarm = allfarmInfo.filter((eachRoom) => {
    if (searchFarmAnimal) {
      if (filterBy.value === "age") {
        return eachRoom.age.toLowerCase().includes(searchFarmAnimal.toLowerCase());
      } else if (filterBy.value === "animal") {
        return eachRoom.animal.toLowerCase().includes(searchFarmAnimal.toLowerCase());
      } else if (filterBy.value === "breed") {
        return eachRoom.breed.toLowerCase().includes(searchFarmAnimal.toLowerCase());
      } else if (filterBy.value === "amount") {
        return eachRoom.amount
          .toString()
          .toLowerCase()
          .includes(searchFarmAnimal.toLowerCase());
      } else if (filterBy.value === "gender") {
        return eachRoom.gender.toLowerCase().includes(searchFarmAnimal.toLowerCase());
      } else if (filterBy.value === "message") {
        return eachRoom.message
          .toLowerCase()
          .includes(searchFarmAnimal.toLowerCase());
      } else {
        return eachRoom.animal.toLowerCase().includes(searchFarmAnimal.toLowerCase());
      }
    } else {
      return allfarmInfo;
    }
  });
  return (
    <div>
      <DashboardLanding />
      <SearchBar setFilteredBy={setFilteredBy} setSearchFarmAnimal={setSearchFarmAnimal} />
      <FarmCards allfarm={allfarm} />
    </div>
  );
};

export default Dashboard;
