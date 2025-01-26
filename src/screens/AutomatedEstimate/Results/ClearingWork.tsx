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
    ClearingWorksInputs: { length: 0, breadth: 0, area: 0, unit: "Metres" },
    typeOfClearing: "",
    landStatus: "Non-water logged/stable land",
    landAreaComposition: "",
    clearworks: "",
  });

  useEffect(() => {
    dispatch(getUser());

    if (typeof window !== "undefined") {
      const clearingWorksInputs = JSON.parse(
        localStorage.getItem("Clearing Works  Inputs") || "{}"
      );

      const {
        length = 0,
        breadth = 0,
        area = 0,
        unit = "Metres",
      } = clearingWorksInputs;

      // Perform conversion based on the unit
      let convertedInputs;
      if (unit === "Millimetres") {
        convertedInputs = {
          length: length / 1000, // Convert length to metres
          breadth: breadth / 1000, // Convert breadth to metres
          area: area / 1_000_000, // Convert area to square metres
          unit: "Metres",
        };
      } else {
        convertedInputs = clearingWorksInputs;
      }

      setData({
        ItemOfWork: localStorage.getItem("ItemOfWork") || "",
        ClearingWorksInputs: convertedInputs,
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
  const calculatedArea = area || length * breadth;
  const estimatedTime = calculatedArea * 0.01;
  const amount = calculatedArea * 28;

  // Format amount, area, and estimated time with separators
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);

  const formattedArea = new Intl.NumberFormat().format(calculatedArea);
  const formattedEstimatedTime = new Intl.NumberFormat().format(
    Number(estimatedTime.toFixed(2))
  );

  return (
    <div className="text-black md:w-full w-[19.7rem]">
      <h1 className="text-2xl font-bold text-black mb-4">
        {ItemOfWork} Result
      </h1>
      <p className="mb-4">
        Hi <strong className="font-bold text-xl">{response?.name}</strong>,
      </p>
      {clearworks === "manual" ? (
        <>
          <p className="text-black">
            For{" "}
            <strong>
              {formattedArea}m<sup>2</sup>
            </strong>{" "}
            adopting <strong>{clearworks}</strong>, where the area is composed
            of <strong>{landAreaComposition}</strong>, it will cost you an
            estimated amount of <strong>{formattedAmount}</strong> to clear{" "}
            <strong>
              {formattedArea}m<sup>2</sup>
            </strong>{" "}
            area of land. Usually, this{" "}
            <strong>
              {formattedArea} m<sup>2</sup>
            </strong>{" "}
            will take a 1-man labour an estimated time of{" "}
            <strong>{formattedEstimatedTime}</strong> days to clear. Also, for
            areas mainly composed of trees, you will require a chain saw to cut
            trees.
          </p>
          <p>
            Please note: 1 construction day = 9 Hours. You can check our
            <Link
              href="/applicable-material-labour-price"
              className="text-blue-900 underline ml-1"
            >
              material and labor price list/rates
            </Link>{" "}
            for applicable rates for your project.
          </p>
        </>
      ) : (
        <>
          <p className="text-black">
            For{" "}
            <strong>
              {formattedArea} m<sup>2</sup>
            </strong>{" "}
            adopting <strong>{clearworks}</strong>, where the area is{" "}
            <strong>{landStatus}</strong>, you will require{" "}
            <strong>{preliminaryNeeded}</strong> for an estimated amount of{" "}
            <strong>{formattedAmount}</strong> to clear{" "}
            <strong>
              {formattedArea} m<sup>2</sup>
            </strong>{" "}
            area of land. Usually, this{" "}
            <strong>
              {formattedArea} m<sup>2</sup>
            </strong>{" "}
            will take a 1-man labour an estimated time of{" "}
            <strong>{formattedEstimatedTime}</strong> days to clear.
          </p>
          <p>
            Also, please note that for machinery that does not use tyres (i.e.,
            tracks—see picture below), you will require a low-bed truck to help
            transport the material.
          </p>
          <p>
            Please note: 1 construction day = 9 Hours. You can check our
            <Link
              href="/applicable-material-labour-price"
              className="text-blue-900 underline ml-1"
            >
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
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const ClearWorkResult: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const response = useSelector((state: RootState) => state.getUser.response);

//   const [data, setData] = useState({
//     ItemOfWork: "",
//     ClearingWorksInputs: { length: 0, breadth: 0, area: 0 },
//     typeOfClearing: "",
//     landStatus: "Non-water logged/stable land",
//     landAreaComposition: "",
//     clearworks: "",
//   });

//   useEffect(() => {
//     dispatch(getUser());

//     // Ensure localStorage is only accessed in the browser
//     if (typeof window !== "undefined") {
//       setData({
//         ItemOfWork: localStorage.getItem("ItemOfWork") || "",
//         ClearingWorksInputs: JSON.parse(
//           localStorage.getItem("Clearing Works  Inputs") || "{}"
//         ),
//         typeOfClearing: localStorage.getItem("typeOfClearing") || "",
//         landStatus:
//           localStorage.getItem("IsTheLandArea") ||
//           "Non-water logged/stable land",
//         landAreaComposition: localStorage.getItem("landAreaComposition") || "",
//         clearworks: localStorage.getItem("clearing works") || "",
//       });
//     }
//   }, [dispatch]);

//   const {
//     ItemOfWork,
//     ClearingWorksInputs,
//     typeOfClearing,
//     landStatus,
//     landAreaComposition,
//     clearworks,
//   } = data;
//   const { length = 0, breadth = 0, area = 0 } = ClearingWorksInputs;

//   const preliminaryNeeded = "Bulldozer with tyre, bulldozer without tyre";
//   const estimatedTime = area > 0 ? area * 0.01 : length * breadth * 0.01;
//   const amount = area * 28 || length * breadth * 28;

//   // Format amount, area, and estimated time with separators
//   const formattedAmount = new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 2,
//   }).format(amount);

//   const formattedArea = new Intl.NumberFormat().format(
//     area || length * breadth
//   );
//   const formattedEstimatedTime = new Intl.NumberFormat().format(
//     Number(estimatedTime.toFixed(2))
//   );

//   return (
//     <div className="text-black md:w-full w-[19.7rem]">
//       <h1 className="text-2xl font-bold text-black mb-4">
//         {ItemOfWork} Result
//       </h1>
//       <p className="mb-4">
//         Hi <strong className="font-bold text-xl">{response?.name}</strong>,
//       </p>
//       {clearworks === "manual" ? (
//         <>
//           <p className="text-black">
//             For{" "}
//             <strong>
//               {formattedArea}m<sup>2</sup>
//             </strong>{" "}
//             adopting <strong>{clearworks}</strong>, where the area is composed
//             of <strong>{landAreaComposition}</strong>, it will cost you an
//             estimated amount of <strong>{formattedAmount}</strong> to clear{" "}
//             <strong>
//               {formattedArea}m<sup>2</sup>
//             </strong>{" "}
//             area of land. Usually, this{" "}
//             <strong>
//               {formattedArea} m<sup>2</sup>
//             </strong>{" "}
//             will take a 1-man labour an estimated time of{" "}
//             <strong>{formattedEstimatedTime}</strong> days to clear. Also, for
//             areas mainly composed of trees, you will require a chain saw to cut
//             trees.
//           </p>
//           <p>
//             Please note: 1 construction day = 9 Hours. You can check our
//             <Link
//               href="/applicable-material-labour-price"
//               className="text-blue-900 underline ml-1"
//             >
//               material and labor price list/rates
//             </Link>{" "}
//             for applicable rates for your project.
//           </p>
//         </>
//       ) : (
//         <>
//           <p className="text-black">
//             For{" "}
//             <strong>
//               {formattedArea} m<sup>2</sup>
//             </strong>{" "}
//             adopting <strong>{clearworks}</strong>, where the area is{" "}
//             <strong>{landStatus}</strong>, you will require{" "}
//             <strong>{preliminaryNeeded}</strong> for an estimated amount of{" "}
//             <strong>{formattedAmount}</strong> to clear{" "}
//             <strong>
//               {formattedArea} m<sup>2</sup>
//             </strong>{" "}
//             area of land. Usually, this{" "}
//             <strong>
//               {formattedArea} m<sup>2</sup>
//             </strong>{" "}
//             will take a 1-man labour an estimated time of{" "}
//             <strong>{formattedEstimatedTime}</strong> days to clear.
//           </p>
//           <p>
//             Also, please note that for machinery that does not use tyres (i.e.,
//             tracks—see picture below), you will require a low-bed truck to help
//             transport the material.
//           </p>
//           <p>
//             Please note: 1 construction day = 9 Hours. You can check our
//             <Link
//               href="/applicable-material-labour-price"
//               className="text-blue-900 underline ml-1"
//             >
//               material and labor price list/rates
//             </Link>{" "}
//             for applicable rates for your project.
//           </p>
//           <div className="mt-4">
//             <h2 className="text-xl font-bold">Picture of Preliminary Item</h2>
//             <p>Item that requires a low bed for transportation:</p>
//             <img
//               src="/yes.jpg" // Replace with actual image path
//               alt="Preliminary item requiring a low bed for transportation"
//               className="w-full h-auto rounded-lg border"
//             />
//           </div>
//         </>
//       )}
//       <p className="mt-4">Thank You.</p>
//     </div>
//   );
// };

// export default ClearWorkResult;
