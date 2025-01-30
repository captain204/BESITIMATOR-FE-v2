import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Excavation: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [disposalMaterial, setDisposalMaterial] = useState("");
  const [lengthToBeShored, setLengthToBeShored] = useState("");
  const [wouldYou, setWouldYou] = useState("");
  const [excavationIn, setExcavationIn] = useState("");
  const [disposable, setDisposable] = useState("");
  const [data, setData] = useState({
    ItemOfWork: "",
    ExcavationInputs: {
      sitePerimeter: 0,
      unit: "Metres",
      depth: 0,
      height: 0,
      length: 0,
      radius: 0,
      width: 0,
      type: "Circular",
      volume: 0,
    },
  });

  useEffect(() => {
    dispatch(getUser());

    if (typeof window !== "undefined") {
      const storedSettingOutInputs = JSON.parse(
        localStorage.getItem("Excavation Inputs") || "{}"
      );

      const disposalOfExcavatedMaterials =
        localStorage.getItem("Disposal-of-Excavated-Materials") || "";

      const lengthToBeShored =
        localStorage.getItem("length-to-be-shored") || "";

      const would =
        localStorage.getItem("Would-your-excavation-require-shoring") || "";

      const excavationIn = localStorage.getItem("excavation-in") || "";

      const disposable =
        localStorage.getItem("Disposal-of-Excavated-Materials") || "";

      setData({
        ItemOfWork: localStorage.getItem("ItemOfWork") || "",
        ExcavationInputs: {
          ...data.ExcavationInputs,
          ...storedSettingOutInputs,
        },
      });
      setDisposalMaterial(disposalOfExcavatedMaterials);
      setLengthToBeShored(lengthToBeShored);
      setWouldYou(would);
      setExcavationIn(excavationIn);
      setDisposable(disposable);
    }
  }, [dispatch]);

  const { ExcavationInputs } = data;

  // Convert mm to meters if unit is Millimetres
  const convertToMeters = (value: number) =>
    data.ExcavationInputs.unit === "Millimetres" ? value / 1000 : value;

  const convertedInputs = {
    sitePerimeter: convertToMeters(ExcavationInputs.sitePerimeter),
    depth: convertToMeters(ExcavationInputs.depth),
    height: convertToMeters(ExcavationInputs.height),
    length: convertToMeters(ExcavationInputs.length),
    radius: convertToMeters(ExcavationInputs.radius),
    width: convertToMeters(ExcavationInputs.width),
    type: ExcavationInputs.type,
    volume:
      data.ExcavationInputs.unit === "Millimetres"
        ? ExcavationInputs.volume / 1_000_000_000 // Convert mm³ to m³
        : ExcavationInputs.volume,
  };

  // Calculate volume dynamically based on the type
  const calculateVolume = () => {
    if (convertedInputs.type === "Circular") {
      const calculatedVolume =
        3.14 * Math.pow(convertedInputs.radius, 2) * convertedInputs.height;
      return isNaN(calculatedVolume) || calculatedVolume <= 0
        ? convertedInputs.volume
        : calculatedVolume;
    } else if (convertedInputs.type === "Square or Rectangular") {
      const calculatedVolume =
        convertedInputs.length * convertedInputs.width * convertedInputs.depth;
      return isNaN(calculatedVolume) || calculatedVolume <= 0
        ? convertedInputs.volume
        : calculatedVolume;
    }
    return 0; // Default fallback for unsupported types
  };

  // Ensure volume is always a number
  const formatter = new Intl.NumberFormat();

  const volume = Number(calculateVolume()) || 0;
  const formattedVolume = formatter.format(volume); // Formatting the volume
  const manLabourOutputPerDay = formatter.format(volume * 0.83);
  const preliminaryRequired =
    "Excavator with Hydraulic hammer, Jack hammer, Blasting process";

  const moderatelyManLabourOutputPerDay = formatter.format(volume * 0.11);
  const moderatelyPreliminaryRequired = "Digger and Shovel";
  const nonrockyManLabourOutputPerDay = formatter.format(volume * 0.06);
  const nonrockyPreliminaryRequired = "Shovels";

  const DisposalmanLabourOutputPerDay = formatter.format(volume * 0.1);
  const DisposalmanLabourOutputPerDaytwo = formatter.format(volume * 0.12);
  const DisposalpreliminaryRequired = "Wheel Barrow, Shovel";
  const numericLengthToBeShored = Number(lengthToBeShored) || 0;

  // Shoring calculations
  const shoringFirstWood = formatter.format(numericLengthToBeShored * 0.61);
  const shoringSecondWood = formatter.format(numericLengthToBeShored * 0.61);
  const shoringNail = formatter.format(numericLengthToBeShored * 0.14);
  const shoringLabourRequired = "Carpenter and labour";
  const shoringLabourperday = formatter.format(numericLengthToBeShored);

  const response = useSelector((state: RootState) => state.getUser.response);

  return (
    <div className="md:w-full w-80 ">
      <h1 className="text-2xl font-bold text-black mb-4">Excavation Result</h1>
      <p className="text-black">
        Hi <strong>{response?.name}</strong>,
      </p>

      {excavationIn === "Excavation in Rocky areas" ? (
        <p className="text-black mb-4">
          For a<strong> {formattedVolume}m<sup>3</sup></strong>, you will require 1 man labour for
          an estimated number of{" "}
          <strong> {manLabourOutputPerDay} days</strong>, and they
          will require <strong> {DisposalpreliminaryRequired} </strong> to carry
          out the excavation work. For excavation work above 250m<sup>3</sup>, adopting a
          mechanical approach using an excavator is more cost-effective.
        </p>
      ) : excavationIn ===
        "Excavation in Moderately rocky Areas (hard ground: Mix of Stones and sandy matter)" ? (
        <p className="text-black mb-4">
          For a<strong> {formattedVolume}m<sup>3</sup></strong>, you will require 1 man labour for
          an estimated number of{" "}
          <strong> {moderatelyManLabourOutputPerDay} days</strong>,
          and they will require{" "}
          <strong> {moderatelyPreliminaryRequired} </strong> to carry out the
          excavation work. For excavation work above 250m<sup>3</sup>, adopting a
          mechanical approach using an excavator is more cost-effective.
        </p>
      ) : (
        <p className="text-black mb-4">
          For a<strong> {formattedVolume}m<sup>3</sup></strong>, you will require 1 man labour for
          an estimated number of{" "}
          <strong> {nonrockyManLabourOutputPerDay} days</strong>, and
          they will require <strong> {nonrockyPreliminaryRequired} </strong> to
          carry out the excavation work. For excavation work above 250m<sup>3</sup>,
          adopting a mechanical approach using an excavator is more
          cost-effective.
        </p>
      )}

      <div className="text-black mb-4">
        <p>Disposal</p>
        <p>
          To dispose <strong> {formatter.format(volume)}m<sup>3</sup></strong> of excavated material, if the
          disposal distance is <strong> {disposalMaterial} </strong>, you will
          require 1 man labour for an estimated number of{" "}
          <strong>
            {disposable === "Within 10m to Disposal"
              ? DisposalmanLabourOutputPerDay
              : DisposalmanLabourOutputPerDaytwo}{" "}
            days
          </strong>{" "}
          using
          <strong> {preliminaryRequired} </strong>.
        </p>
      </div>

      {wouldYou === "yes" ? (
        <div className="bg-black rounded-lg p-4 mb-4">
          <p>Shoring</p>
          <p>
            If shoring is required during this excavation process for a length
            of
            <strong>{numericLengthToBeShored}</strong> m, you will require an
            estimated number of
            {shoringFirstWood} pcs of 1" x 12" or 25mm x 300mm x 3600mm wood,{" "}
            <strong> {shoringSecondWood} </strong> nos of 2" x 2" or 50mm x 50mm
            x 3600mm wood and <strong>{shoringNail}</strong> (kg) 4" & 5"* kg of
            4” and 5” Nail. Also, you will require {shoringLabourRequired} for
            an estimated number of {shoringLabourperday} days.
          </p>
        </div>
      ) : null}

      <p className="text-black mb-6">
        Note: 1 construction day = 9 hours. You can check our
        <Link href="/pricing" className="text-blue-900 underline">
          material and labour price list/rates
        </Link>{" "}
        for applicable rates for your project.
      </p>
    </div>
  );
};

export default Excavation;







// import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
// import { AppDispatch, RootState } from "@/Globals/store/store";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const Excavation: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const [disposalMaterial, setDisposalMaterial] = useState("");
//   const [lengthToBeShored, setLengthToBeShored] = useState("");
//   const [wouldYou, setwouldYou] = useState("");
//   const [excavationIn, setExcavationIn] = useState("");
//   const [disposable, setDisposable] = useState("");
//   const [data, setData] = useState({
//     ItemOfWork: "",
//     ExcavationInputs: {
//       sitePerimeter: 0,
//       unit: "Metres",
//       depth: 0,
//       height: 0,
//       length: 0,
//       radius: 0,
//       width: 0,
//       type: "Circular",
//       volume: 0,
//     },
//   });

//   useEffect(() => {
//     dispatch(getUser());

//     if (typeof window !== "undefined") {
//       const storedSettingOutInputs = JSON.parse(
//         localStorage.getItem("Excavation Inputs") || "{}"
//       );

//       const disposalOfExcavatedMaterials =
//         localStorage.getItem("Disposal-of-Excavated-Materials") || "";

//       const lengthToBeShored =
//         localStorage.getItem("length-to-be-shored") || "";

//       const would =
//         localStorage.getItem("Would-your-excavation-require-shoring") || "";

//       const excavationIn = localStorage.getItem("excavation-in") || "";

//       const disposable =
//         localStorage.getItem("Disposal-of-Excavated-Materials") || "";

//       setData({
//         ItemOfWork: localStorage.getItem("ItemOfWork") || "",
//         ExcavationInputs: {
//           ...data.ExcavationInputs,
//           ...storedSettingOutInputs,
//         },
//       });
//       setDisposalMaterial(disposalOfExcavatedMaterials);
//       setLengthToBeShored(lengthToBeShored);
//       setwouldYou(would);
//       setExcavationIn(excavationIn);
//       setDisposable(disposable);
//     }
//   }, [dispatch]);

//   const { ExcavationInputs } = data;

//   // Calculate volume dynamically based on the type
//   const calculateVolume = () => {
//     if (ExcavationInputs.type === "Circular") {
//       const calculatedVolume =
//         3.14 * Math.pow(ExcavationInputs.radius, 2) * ExcavationInputs.height;
//       return isNaN(calculatedVolume) || calculatedVolume <= 0
//         ? ExcavationInputs.volume
//         : calculatedVolume;
//     } else if (ExcavationInputs.type === "Square or Rectangular") {
//       const calculatedVolume =
//         ExcavationInputs.length *
//         ExcavationInputs.width *
//         ExcavationInputs.depth;
//       return isNaN(calculatedVolume) || calculatedVolume <= 0
//         ? ExcavationInputs.volume
//         : calculatedVolume;
//     }
//     return 0; // Default fallback for unsupported types
//   };

//   // Ensure volume is always a number
//   const formatter = new Intl.NumberFormat();

//   const volume = Number(calculateVolume()) || 0;
//   const formattedVolume = formatter.format(volume); // Formatting the volume
//   const manLabourOutputPerDay = formatter.format(volume * 0.83);
//   const preliminaryRequired = "Excavator with Hydraulic hammer, Jack hammer, Blasting process";
  
//   const moderatelyManLabourOutputPerDay = formatter.format(volume * 0.11);
//   const moderatelyPreliminaryRequired = "Digger and Shovel";
//   const nonrockyManLabourOutputPerDay = formatter.format(volume * 0.06);
//   const nonrockyPreliminaryRequired = "Shovels";
  
//   const DisposalmanLabourOutputPerDay = formatter.format(volume * 0.1);
//   const DisposalmanLabourOutputPerDaytwo = volume * 0.12;
//   const DisposalpreliminaryRequired = "Wheel Barrow, Shovel";
//   const numericLengthToBeShored = Number(lengthToBeShored) || 0;
  
//   //shoring
//   const shoringFirstWood = numericLengthToBeShored * 0.61;
//   const shoringSecondWood = numericLengthToBeShored * 0.61;
//   const shoringNail = numericLengthToBeShored * 0.14;
//   const shoringLabourRequired = "Carpenter and labour";
//   const shoringLabourperday = numericLengthToBeShored;
  

//   const response = useSelector((state: RootState) => state.getUser.response);

//   return (
//     <div className="md:w-full w-80 ">
//       <h1 className="text-2xl font-bold text-black mb-4">Excavation Result</h1>
//       <p className="text-black">
//         Hi <strong>{response?.name}</strong>,
//       </p>

//       {excavationIn === "Excavation in Rocky areas" ? (
//         <p className="text-black mb-4">
//           For a<strong> {formattedVolume} m3</strong>, you will require 1 man labour for
//           an estimated number of{" "}
//           <strong> {manLabourOutputPerDay} days</strong>, and they
//           will require <strong> {DisposalpreliminaryRequired} </strong> to carry
//           out the excavation work. For excavation work above 250m3, adopting a
//           mechanical approach using an excavator is more cost-effective.
//         </p>
//       ) : excavationIn ===
//         "Excavation in Moderately rocky Areas (hard ground: Mix of Stones and sandy matter)" ? (
//         <p className="text-black mb-4">
//           For a<strong> {formattedVolume} m3</strong>, you will require 1 man labour for
//           an estimated number of{" "}
//           <strong> {moderatelyManLabourOutputPerDay} days</strong>,
//           and they will require{" "}
//           <strong> {moderatelyPreliminaryRequired} </strong> to carry out the
//           excavation work. For excavation work above 250m3, adopting a
//           mechanical approach using an excavator is more cost-effective.
//         </p>
//       ) : (
//         <p className="text-black mb-4">
//           For a<strong> {formattedVolume} m3</strong>, you will require 1 man labour for
//           an estimated number of{" "}
//           <strong> {nonrockyManLabourOutputPerDay.toFixed(2)} days</strong>, and
//           they will require <strong> {nonrockyPreliminaryRequired} </strong> to
//           carry out the excavation work. For excavation work above 250m3,
//           adopting a mechanical approach using an excavator is more
//           cost-effective.
//         </p>
//       )}

//       <div className="text-black mb-4">
//         <p>Disposal</p>
//         <p>
//           To dispose <strong> {volume} m3</strong> of excavated material, if the
//           disposal distance is <strong> {disposalMaterial} </strong>, you will
//           require 1 man labour for an estimated number of{" "}
//           <strong>
//             {disposable === "Within 10m to Disposal"
//               ? DisposalmanLabourOutputPerDay.toFixed(2)
//               : DisposalmanLabourOutputPerDaytwo.toFixed(2)}{" "}
//             days
//           </strong>{" "}
//           using
//           <strong> {preliminaryRequired} </strong>.
//         </p>
//       </div>

//       {wouldYou === "yes" ? (
//         <div className="bg-black rounded-lg p-4 mb-4">
//           <p>Shoring</p>
//           <p>
//             If shoring is required during this excavation process for a length
//             of
//             <strong>{numericLengthToBeShored}</strong> m, you will require an
//             estimated number of
//             {shoringFirstWood} pcs of 1" x 12" or 25mm x 300mm x 3600mm wood,{" "}
//             <strong> {shoringSecondWood} </strong> nos of 2" x 2" or 50mm x 50mm
//             x 3600mm wood and <strong>{shoringNail}</strong> (kg) 4" & 5"* kg of
//             4” and 5” Nail. Also, you will require {shoringLabourRequired} for
//             an estimated number of {shoringLabourperday} days.
//           </p>
//         </div>
//       ) : null}

//       <p className="text-black mb-6">
//         Note: 1 construction day = 9 hours. You can check our
//         <Link href="/pricing" className="text-blue-900 underline">
//           material and labour price list/rates
//         </Link>{" "}
//         for applicable rates for your project.
//       </p>
//     </div>
//   );
// };

// export default Excavation;
