import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SettingOut: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [data, setData] = useState({
    ItemOfWork: "",
    SettingOutInputs: { sitePerimeter: 0 },
    ShapeOfBuilding: "",
  });

  useEffect(() => {
    dispatch(getUser());

    if (typeof window !== "undefined") {
      setData({
        ItemOfWork: localStorage.getItem("ItemOfWork") || "",
        SettingOutInputs: JSON.parse(
          localStorage.getItem("Setting Out Inputs") || "{}"
        ),
        ShapeOfBuilding: localStorage.getItem("ShapeOfBuilding") || "",
      });
    }
  }, [dispatch]);

  const { ItemOfWork, SettingOutInputs, ShapeOfBuilding } = data;
  const { sitePerimeter = 0 } = SettingOutInputs;

  const ThreeSided_PegBundles_InternalBeam = (sitePerimeter * 0.33).toFixed(2);
  const ThreeSided_TiedRod = (sitePerimeter * 0.31).toFixed(2);
  const ThreeSided_Nail = (sitePerimeter * 0.04).toFixed(2);
  const ThreeSided_RopeQuantity = (sitePerimeter * 7.05).toFixed(2);

  const FourSided_PegBundles_InternalBeam = (sitePerimeter * 0.43).toFixed(2);
  const Four_Sided_TiedRod = (sitePerimeter * 0.32).toFixed(2);
  const Four_Sided_Nail = (sitePerimeter * 0.04).toFixed(2);
  const Four_Sided_RopeQuantity = (sitePerimeter * 9.05).toFixed(2);

  const Circular_PegBundles_InternalBeam = (sitePerimeter * 0.63).toFixed(2);
  const Circular_Sided_TiedRod = (sitePerimeter * 0.33).toFixed(2);
  const Circular_Sided_Nail = (sitePerimeter * 0.04).toFixed(2);
  const Circular_Sided_RopeQuantity = (sitePerimeter * 9.05).toFixed(2);

  const response = useSelector((state: RootState) => state.getUser.response);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="md:w-full w-[22rem] ">
      {ShapeOfBuilding === "Three sided shaped like triangle, scalene etc" ? (
        <>
          <h1 className="text-2xl font-bold text-black mb-4">
            Setting Out Result
          </h1>
          <p className="text-black text-xl mb-2">
            Hi <strong>{response?.name}</strong>,
          </p>
          <p className="text-black mb-4">
            Setting out involves marking out the area based on the project plan.
            It ensures accuracy and alignment for the construction.
          </p>
          <div className=" rounded-lg  mb-4 text-black">
            Setting out a structure perimeter of{" "}
            <strong> {sitePerimeter} meters</strong>, you will require:{" "}
            <strong> {ThreeSided_PegBundles_InternalBeam} bundles</strong> of
            peg (20 pieces per bundle)
            <strong> {ThreeSided_TiedRod} tie rods</strong> (12mm x 50mm x
            3600mm wood)
            <strong> {ThreeSided_Nail} kg</strong> of 3” nails Additionally, you
            will require a carpenter and a laborer for this process.
          </div>
          <div className="text-black rounded-lg  mb-4 ">
            For structures without internal beams, you will require
            <strong> {ThreeSided_RopeQuantity} yards</strong> of rope Not more
            than 1 bundle of pegs Off-cut woods (2x2 or 2x3) or off-cut
            reinforcements if available
          </div>
          <p className="text-black mb-4">
            Note: Pegs come in different lengths: 900mm (3 feet), 1200mm (4
            feet), 1500mm (5 feet). The looser the soil, the longer the peg
            required. Materials purchased here can be reused.
          </p>
          <p className="text-black mb-6">
            1 construction day = 9 hours. You can check our{" "}
            <Link
              href="/applicable-material-labour-price"
              className="text-blue-900 underline"
            >
              material and labor price list/rates
            </Link>{" "}
            for applicable rates for your project.
          </p>
        </>
      ) : ShapeOfBuilding === "Four sided shaped like square, rectangle etc" ? (
        // Similar block for Four Sided
        <>
          <h1 className="text-2xl font-bold text-black mb-4">
            Setting Out Result
          </h1>
          <p className="text-black text-xl mb-2">
            Hi <strong>{response?.name}</strong>,
          </p>
          <p className="text-black mb-4">
            Setting out involves marking out the area based on the project plan.
            It ensures accuracy and alignment for the construction.
          </p>
          <div className=" rounded-lg  mb-4 text-black">
            Setting out a structure perimeter of{" "}
            <strong> {sitePerimeter} meters</strong>, you will require:{" "}
            <strong> {FourSided_PegBundles_InternalBeam} bundles</strong> of peg
            (20 pieces per bundle)
            <strong> {Four_Sided_TiedRod} tie rods</strong> (12mm x 50mm x
            3600mm wood)
            <strong> {Four_Sided_Nail} kg</strong> of 3” nails Additionally, you
            will require a carpenter and a laborer for this process.
          </div>
          <div className="text-black rounded-lg  mb-4 ">
            For structures without internal beams, you will require
            <strong> {Four_Sided_RopeQuantity} yards</strong> of rope Not more
            than 1 bundle of pegs Off-cut woods (2x2 or 2x3) or off-cut
            reinforcements if available
          </div>
          <p className="text-black mb-4">
            Note: Pegs come in different lengths: 900mm (3 feet), 1200mm (4
            feet), 1500mm (5 feet). The looser the soil, the longer the peg
            required. Materials purchased here can be reused.
          </p>
          <p className="text-black mb-6">
            1 construction day = 9 hours. You can check our{" "}
            <Link
              href="/applicable-material-labour-price"
              className="text-blue-900 underline"
            >
              material and labor price list/rates
            </Link>{" "}
            for applicable rates for your project.
          </p>
        </>
      ) : ShapeOfBuilding === "Circular shaped" ? (
        // Handle other shapes similarly
        <>
          <h1 className="text-2xl font-bold text-black mb-4">
            Setting Out Result
          </h1>
          <p className="text-black text-xl mb-2">
            Hi <strong>{response?.name}</strong>,
          </p>
          <p className="text-black mb-4">
            Setting out involves marking out the area based on the project plan.
            It ensures accuracy and alignment for the construction.
          </p>
          <div className=" rounded-lg  mb-4 text-black">
            Setting out a structure perimeter of{" "}
            <strong> {sitePerimeter} meters</strong>, you will require:{" "}
            <strong> {Circular_PegBundles_InternalBeam} bundles</strong> of peg
            (20 pieces per bundle)
            <strong> {Circular_Sided_TiedRod} tie rods</strong> (12mm x 50mm x
            3600mm wood)
            <strong> {Circular_Sided_Nail} kg</strong> of 3” nails Additionally,
            you will require a carpenter and a laborer for this process.
          </div>
          <div className="text-black rounded-lg  mb-4 ">
            For structures without internal beams, you will require
            <strong> {Circular_Sided_RopeQuantity} yards</strong> of rope Not
            more than 1 bundle of pegs Off-cut woods (2x2 or 2x3) or off-cut
            reinforcements if available
          </div>
          <p className="text-black mb-4">
            Note: Pegs come in different lengths: 900mm (3 feet), 1200mm (4
            feet), 1500mm (5 feet). The looser the soil, the longer the peg
            required. Materials purchased here can be reused.
          </p>
          <p className="text-black mb-6">
            1 construction day = 9 hours. You can check our{" "}
            <Link
              href="/applicable-material-labour-price"
              className="text-blue-900 underline"
            >
              material and labor price list/rates
            </Link>{" "}
            for applicable rates for your project.
          </p>
        </>
      ) : null}
    </div>
  );
};

export default SettingOut;
