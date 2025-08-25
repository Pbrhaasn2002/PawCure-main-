import { useState, useEffect } from "react";
// import { token } from "../config";

const useFetchData = (url) => {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },

          // headers: {
          //   Authorization: "Bearer " + localStorage.getItem("token"),
          // },
        });
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message + "🤢");
        }

        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);

  return {
    data: data,
    loading,
    error,
  };
};

export default useFetchData;
