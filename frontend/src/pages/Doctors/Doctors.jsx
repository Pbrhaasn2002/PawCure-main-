/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import { doctors } from "./../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());

    console.log("handle search");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  // const {
  //   data: doctor,
  //   loading,
  //   error,
  // } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  const [doctors, setDoctors] = useState([]);

  const { data, loading, error } = useFetchData(
    `${BASE_URL}/doctors?query=${debounceQuery}`
  );

  useEffect(() => {
    if (data && data.doctors) {
      setDoctors(data);
    }
    // console.log(data);
  }, [data, loading, error]);

  return (
    <>
      <section className="bg-[#fff9ea] find_Doc_sec">
        <div className="container text-center">
          <h2 className="heading find-doc-page-head">Discover Expert Veterinary Care Near You </h2>
          <p className="text-gray-5 find-doc-page-subhead">Connect with skilled and compassionate veterinarians dedicated to the health and well-being of your beloved pets.</p>
          <div
            className="max-w-[570px] mt-[30px] mx-auto bg-[#9999992c] rounded-md flex items-center
                            justify-between"
          >
            <input
              type="search"
              name=""
              id=""
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none
                cursor-pointer nplaceholder:text-textColor"
              placeholder="Search Doctor by name or by specification"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button className="btn mt-0 rounded-[0px] rounded-r-md onClick={handleSearch}">
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
              {/* {doctors.map((doctor, index) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))} */}

              {data.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
