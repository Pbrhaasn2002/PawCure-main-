/* eslint-disable react/prop-types */

import DoctorCard from "./DoctorCard";
import { useState, useEffect } from "react";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
// import { doctors } from "../../assets/data/doctors";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  const { data, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  useEffect(() => {
    if (data && data.doctors) {
      setDoctors(data);
    }
    // console.log(data);
  }, [data, loading, error]);

  // console.log(data);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px]
    lg:mt-[55px]"
        >
          {data.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
