import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ClearWorkResult: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const response = useSelector((state: RootState) => state.getUser.response);

  const [data, setData] = useState({
    ItemOfWork: "",
    ClearingWorksInputs: { length: 0, breadth: 0, area: 0 },
    typeOfClearing: "",
    landStatus: "Non-water logged/stable land",
    landAreaComposition: "",
    clearworks: "",
  });

  useEffect(() => {
    dispatch(getUser());

    // Ensure localStorage is only accessed in the browser
    if (typeof window !== "undefined") {
      setData({
        ItemOfWork: localStorage.getItem("ItemOfWork") || "",
        ClearingWorksInputs: JSON.parse(
          localStorage.getItem("Clearing Works  Inputs") || "{}"
        ),
        typeOfClearing: localStorage.getItem("typeOfClearing") || "",
        landStatus:
          localStorage.getItem("IsTheLandArea") ||
          "Non-water logged/stable land",
        landAreaComposition: localStorage.getItem("landAreaComposition") || "",
        clearworks: localStorage.getItem("clearing works") || "",
      });
    }
  }, [dispatch]);

  const {
    ItemOfWork,
    ClearingWorksInputs,
    typeOfClearing,
    landStatus,
    landAreaComposition,
    clearworks,
  } = data;
  const { length = 0, breadth = 0, area = 0 } = ClearingWorksInputs;

  const preliminaryNeeded = "Bulldozer with tyre, bulldozer without tyre";
  const estimatedTime = area > 0 ? area * 0.01 : length * breadth * 0.01;
  const amount = area * 28 || length * breadth * 28;

  return (
    <div className="text-black md:w-full  w-[20rem]">
      <h1 className="text-2xl font-bold text-black mb-4">
        {ItemOfWork} Result
      </h1>
      <p className="mb-4">
        Hi <strong className="font-bold text-xl  ">{response?.name}</strong>,
      </p>
      {clearworks === "manual" ? (
        <>
          <p className="text-black">
            For <strong className="text-yellow-900">{area || length * breadth} m²</strong> adopting{" "}
           <strong>{clearworks} </strong> 
            {/* <strong>{typeOfClearing}</strong>  */}
            
            where the area is composed of{" "}
            <strong>{landAreaComposition}</strong>, it will cost you an
            estimated amount of <strong> {amount.toFixed(2)} naira</strong> to
            clear <strong>{area || length * breadth} m²</strong> area of land. Usually, this{" "}
            <strong>{area || length * breadth} m²</strong> will take a 1 man
            labour an estimated time of <strong> {estimatedTime.toFixed(2)} </strong> days to
            clear. Also, for areas mainly composed of trees, you will require a
            chain saw to cut trees.
          </p>
          <p>
            Please note: 1 construction day = 9 Hours. You can check our
            <Link href="/applicable-material-labour-price" className="text-blue-900 underline ml-1 ">
              material and labor price list/rates
            </Link>{" "}
            for applicable rates for your project.
          </p>
        </>
      ) : (
        <>
          <>
            <p className="text-black">
              For <strong>{area || length * breadth} m²</strong> adopting{" "}
              {/* <strong>{typeOfClearing}</strong>  */}
              <strong>{clearworks} </strong> 
              
              where the area is {" "}
              <strong>{landStatus}</strong>, you will require{" "}
              <strong>{preliminaryNeeded}</strong> for an estimated amount of{" "}
              <strong>{amount.toFixed(2)} naira</strong> to clear{" "}
              <strong>{area || length * breadth} m²</strong> area of land. Usually, this{" "}
              <strong>{area || length * breadth} m²</strong> will take a 1 man
              labour an estimated time of <strong>{estimatedTime.toFixed(2)} </strong> days to
              clear. 
            </p>
            <p>
              Also, please note that for machineries that do not use tyres
              (i.e., tracks—see picture below), you will require a low-bed truck
              to help transport the material.
            </p>
          </>
          <p>
            Please note: 1 construction day = 9 Hours. You can check our
            <Link href="/applicable-material-labour-price" className="text-blue-900 underline ml-1 ">
              material and labor price list/rates
            </Link>{" "}
            for applicable rates for your project.
          </p>
          <div className="mt-4">
            <h2 className="text-xl font-bold">Picture of Preliminary Item</h2>
            <p>Item that requires a low bed for transportation:</p>
            <img
              src="/yes.jpg" // Replace with actual image path
              alt="Preliminary item requiring a low bed for transportation"
              className="w-full h-auto rounded-lg border"
            />
          </div>
        </>
      )}

      <p className="mt-4">Thank You.</p>
    </div>
  );
};

export default ClearWorkResult;

// import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
// import { AppDispatch, RootState } from "@/Globals/store/store";
// import Link from "next/link";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const ClearWorkResult: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();

//   const response = useSelector((state: RootState) => state.getUser.response);

//   useEffect(() => {
//     {
//       dispatch(getUser());
//     }
//   }, [dispatch]);

//   // Fetching data from localStorage
//   const ItemOfWork = localStorage.getItem("ItemOfWork");
//   const ClearingWorksInputs = JSON.parse(
//     localStorage.getItem("Clearing Works  Inputs") || "{}"
//   );
//   const typeOfClearing = localStorage.getItem("typeOfClearing");
//   const landStatus =
//     localStorage.getItem("IsTheLandArea") || "Non-water logged/stable land";
//   const landAreaComposition = localStorage.getItem("landAreaComposition");
//   const preliminaryNeeded = "Bulldozer with tyre, bulldozer without tyre";

//   // Destructuring Clearing Works Inputs
//   const { length = 0, breadth = 0, area = 0 } = ClearingWorksInputs;

//   // Calculating estimated time
//   const estimatedTime = area > 0 ? area * 0.01 : length * breadth * 0.01;

//   return (
//     <div className="text-black">
//       <h1 className="text-2xl font-bold text-black mb-4">
//         {ItemOfWork} Result
//       </h1>
//       <p>
//         Hi <strong className="font-bold">{response?.name}</strong>,
//       </p>
//       <p className="text-black">
//         For <strong>{area || length * breadth} m²</strong> adopting{" "}
//         <strong>{typeOfClearing}</strong> where the area is composed of{" "}
//         <strong>
//           {ItemOfWork === "mechanical" ? landStatus : landAreaComposition}
//         </strong>
//         , you will require <strong>{preliminaryNeeded}</strong> for an estimated
//         time of
//         <strong> {estimatedTime.toFixed(2)} days</strong> to clear{" "}
//         <strong>{area} m²</strong> area of land.
//       </p>
//       <p>
//         Also, please note that for machineries that do not use tyres (i.e.,
//         tracks—see picture below), you will require a low-bed truck to help
//         transport the material.
//       </p>
//       <p>
//         Please note: 1 construction day = 9 Hours. You can check our
//         <Link href="/pricing" className="text-blue-900 underline ml-1 ">
//           material and labor price list/rates
//         </Link>{" "}
//         for applicable rates for your project.
//       </p>
//       <div className="mt-4">
//         <h2 className="text-xl font-bold">Picture of Preliminary Item</h2>
//         <p>Item that requires a low bed for transportation:</p>
//         <img
//           src="/yes.jpg" // Replace with actual image path
//           alt="Preliminary item requiring a low bed for transportation"
//           className="w-full h-auto rounded-lg border"
//         />
//       </div>
//       <p className="mt-4">Thank You.</p>
//     </div>
//   );
// };

// export default ClearWorkResult;

// import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
// import { AppDispatch, RootState } from "@/Globals/store/store";
// import Link from "next/link";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const ClearWorkResult: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();

//   const response = useSelector((state: RootState) => state.getUser.response);

//   useEffect(() => {
//     {
//       dispatch(getUser());
//     }
//   }, [dispatch]);

//   const ItemOfWork = localStorage.getItem("ItemOfWork");
//   const areaToBeCleared = 1;
//   const typeOfClearing = "Manual or Mechanical Clearing";
//   const landStatus = "Non-water logged/stable land";
//   const preliminaryNeeded = "Bulldozer with tyre, bulldozer without tyre";
//   const estimatedTime = 2;

//   return (
//     <div className="text-black">
//       {/* <div className="text-center">{ItemOfWork}</div> */}
//       <h1 className="text-2xl font-bold text-black mb-4">
//         {ItemOfWork} Result
//       </h1>
//       <p>
//         Hi <strong className="font-bold">{response?.name}</strong>,
//       </p>
//       <p className="text-black">
//         For <strong>{areaToBeCleared} m²</strong> adopting{" "}
//         <strong>{typeOfClearing}</strong> where the area is
//         <strong> {landStatus}</strong>, you will require{" "}
//         <strong>{preliminaryNeeded}</strong> for an estimated time of
//         <strong> {estimatedTime} days</strong> to clear{" "}
//         <strong>{areaToBeCleared} m²</strong> area of land.
//       </p>
//       <p>
//         Also, please note that for machineries that do not use tyres (i.e.,
//         tracks—see picture below), you will require a low-bed truck to help
//         transport the material.
//       </p>
//       <p>
//         Please note: 1 construction day = 9 Hours. You can check our
//         <Link href="/pricing" className="text-blue-900 underline ml-1 ">
//           material and labor price list/rates
//         </Link>{" "}
//         for applicable rates for your project.
//       </p>
//       <div className="mt-4">
//         <h2 className="text-xl font-bold">Picture of Preliminary Item</h2>
//         <p>Item that requires a low bed for transportation:</p>
//         <img
//           src="/yes.jpg" // Replace with actual image path
//           alt="Preliminary item requiring a low bed for transportation"
//           className="w-full h-auto rounded-lg border"
//         />
//       </div>
//       <p className="mt-4">Thank You.</p>
//     </div>
//   );
// };

// export default ClearWorkResult;
