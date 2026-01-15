// import React from "react";

// const Timer = () => {
//   const formatTime = (seconds: any) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, "0")}:${mins
//       .toString()
//       .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   };
//   return (
//     <div className="space-y-3 absolute bottom-3 p-4 rounded-lg border border-blue-200 w-full">
//       <div className="flex items-center justify-center">
//         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//           {formatTime(timeSpent)}
//         </div>
//       </div>
//       <div className="flex gap-2">
//         <Button
//           onClick={() => setIsTimerRunning(!isTimerRunning)}
//           className={`flex-1 text-white ${
//             isTimerRunning
//               ? "bg-red-500 hover:bg-red-600"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {isTimerRunning ? (
//             <>
//               <StopCircle className="w-4 h-4 mr-2" />
//               Stop
//             </>
//           ) : (
//             <>
//               <Play className="w-4 h-4 mr-2" />
//               Start
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Timer;
