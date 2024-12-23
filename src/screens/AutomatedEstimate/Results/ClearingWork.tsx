import Link from "next/link";
import React from "react";

const ClearWorkResult: React.FC = () => {
  const ItemOfWork = localStorage.getItem("ItemOfWork");
  const userName = "User Name";
  const areaToBeCleared = 1;
  const typeOfClearing = "Manual or Mechanical Clearing";
  const landStatus = "Non-water logged/stable land";
  const preliminaryNeeded = "Bulldozer with tyre, bulldozer without tyre";
  const estimatedTime = 2;

  return (
    <div className="text-black">
      {/* <div className="text-center">{ItemOfWork}</div> */}
      <h1 className="text-2xl font-bold text-black mb-4">
        {ItemOfWork} Result
      </h1>
      <p>
        Hi <strong>{userName}</strong>,
      </p>
      <p className="text-black">
        For <strong>{areaToBeCleared} m²</strong> adopting{" "}
        <strong>{typeOfClearing}</strong> where the area is
        <strong> {landStatus}</strong>, you will require{" "}
        <strong>{preliminaryNeeded}</strong> for an estimated time of
        <strong> {estimatedTime} days</strong> to clear{" "}
        <strong>{areaToBeCleared} m²</strong> area of land.
      </p>
      <p>
        Also, please note that for machineries that do not use tyres (i.e.,
        tracks—see picture below), you will require a low-bed truck to help
        transport the material.
      </p>
      <p>
        Please note: 1 construction day = 9 Hours. You can check our
        <Link href="/pricing" className="text-blue-900 underline ml-1 ">
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
      <p className="mt-4">Thank You.</p>
    </div>
  );
};

export default ClearWorkResult;
