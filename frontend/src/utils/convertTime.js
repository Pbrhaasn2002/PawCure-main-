// const convertTime = (time) => {
//   //timeParts will return an array

//   const timeParts = time.split(":");
//   let hours = parseInt(timeParts[0]);
//   const minutes = parseInt(timeParts[1]);

//   let meridiem = "am";

//   if (hours >= 12) {
//     meridiem = "pm";
//     if (hours > 12) {
//       hours -= 12;
//     }
//   }
//   return (
//     hours.toString.padStart(2) + ":" +
//     minutes.toString().padStart(2, "0") +
//     " " +
//     meridiem
//   );
// };
// export default convertTime;


const convertTime = (time) => {
  //timeParts will return an array
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  let meridiem = "am";

  if (hours >= 12) {
    meridiem = "pm";
    if (hours > 12) {
      hours -= 12;
    }
  }
  return (
    hours.toString().padStart(2, "0") + ":" +
    minutes.toString().padStart(2, "0") +
    " " +
    meridiem
  );
};
export default convertTime;



// convertTime.js

// const convertTime = (time) => {
//   const hours = Math.floor(time / 60);
//   const minutes = time % 60;
//   const formattedHours = hours.toString().padStart(2, '0'); // Ensure proper padding for hours
//   const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure proper padding for minutes
//   return `${formattedHours}:${formattedMinutes}`;
// };

// export default convertTime;
