import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SettingOut: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [data, setData] = useState({
    ItemOfWork: "",
    SettingOutInputs: { sitePerimeter: 0, unit: "Metres" },
    ShapeOfBuilding: "",
  });

  useEffect(() => {
    dispatch(getUser());

    if (typeof window !== "undefined") {
      const storedSettingOutInputs = JSON.parse(
        localStorage.getItem("Setting Out Inputs") || "{}"
      );
      const sitePerimeter = storedSettingOutInputs.sitePerimeter || 0;
      const unit = storedSettingOutInputs.unit || "Metres";

      // Convert the sitePerimeter to meters if the unit is "millimetres"
      const sitePerimeterInMeters =
        unit === "Millimetres" ? sitePerimeter / 1000 : sitePerimeter;

      setData({
        ItemOfWork: localStorage.getItem("ItemOfWork") || "",
        SettingOutInputs: {
          sitePerimeter: sitePerimeterInMeters,
          unit: "Metres",
        },
        ShapeOfBuilding: localStorage.getItem("ShapeOfBuilding") || "",
      });
    }
  }, [dispatch]);

  const { ItemOfWork, SettingOutInputs, ShapeOfBuilding } = data;
  const { sitePerimeter = 0 } = SettingOutInputs;

  const formatter = new Intl.NumberFormat();

  const ThreeSided_PegBundles_InternalBeam = formatter.format(
    Number((sitePerimeter * 0.33).toFixed(2))
  );
  const ThreeSided_TiedRod = formatter.format(
    Number((sitePerimeter * 0.31).toFixed(2))
  );
  const ThreeSided_Nail = formatter.format(
    Number((sitePerimeter * 0.04).toFixed(2))
  );
  const ThreeSided_RopeQuantity = formatter.format(
    Number((sitePerimeter * 7.05).toFixed(2))
  );

  const FourSided_PegBundles_InternalBeam = formatter.format(
    Number((sitePerimeter * 0.43).toFixed(2))
  );
  const Four_Sided_TiedRod = formatter.format(
    Number((sitePerimeter * 0.32).toFixed(2))
  );
  const Four_Sided_Nail = formatter.format(
    Number((sitePerimeter * 0.04).toFixed(2))
  );
  const Four_Sided_RopeQuantity = formatter.format(
    Number((sitePerimeter * 9.05).toFixed(2))
  );

  const Circular_PegBundles_InternalBeam = formatter.format(
    Number((sitePerimeter * 0.63).toFixed(2))
  );
  const Circular_Sided_TiedRod = formatter.format(
    Number((sitePerimeter * 0.33).toFixed(2))
  );
  const Circular_Sided_Nail = formatter.format(
    Number((sitePerimeter * 0.04).toFixed(2))
  );
  const Circular_Sided_RopeQuantity = formatter.format(
    Number((sitePerimeter * 9.05).toFixed(2))
  );

  const response = useSelector((state: RootState) => state.getUser.response);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="md:w-full w-[22rem] ">
      {ShapeOfBuilding === "Three sided shaped like triangle, scalene etc" ? (
        <>
          <h1 className="text-2xl font-bold text-black mb-4">
            {ItemOfWork} Result
          </h1>
          <p className="text-black text-xl mb-2">
            Hi <strong>{response?.name}</strong>,
          </p>

          <div className=" rounded-lg  mb-4 text-black">
            Setting out a structure perimeter of{" "}
            <strong> {sitePerimeter} meters</strong>, you will require a total
            number of
            <strong> {ThreeSided_PegBundles_InternalBeam} bundles</strong> of
            peg which usually comes in 20pcs/ bundle,
            <strong> {ThreeSided_TiedRod} tie rods</strong> nos of Tie-rod or
            12mm x 50mm x 3600mm wood and
            <strong> {ThreeSided_Nail} kg</strong> of 3” nails. Also, you will
            require a carpenter and a labour for this process.
          </div>
          <div className="text-black rounded-lg  mb-4 ">
            This process (use of pegs, Tie-rods and Nails) are used for
            structures with internal beams. For structures without internal
            beams, you will require;{" "}
            <strong> {ThreeSided_RopeQuantity} yards</strong> of rope and not
            more than 1 bundle of peg or if off-cut woods (2x2 or 2x3 woods) or
            off-cut reinforcmeents are available they can be used aswell at
            strategic point.
          </div>
          <p className="text-black mb-4">
            Please note that pegs come in different lengths 900mm/3fts long,
            1200mm/ 4fts long, 1500mm/5fts long. The determining factor that
            dictates the length of peg to be bought is the looseness of the
            soil. The looser the soli the longer the peg required. Also,
            materials purchased here can be re-used.
          </p>
          <p className="text-black mb-6">
            1 construction day = 9 hours. You can check our{" "}
            <Link
              href="/applicable-material-labour-price"
              className="text-blue-900 underline"
            >
              material and labor price list/rates
            </Link>{" "}
            for applicable rates for your project. (the material and labour
            price list/rates should be an automatic link)
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

          <div className=" rounded-lg  mb-4 text-black">
            Setting out a structure perimeter of{" "}
            <strong> {sitePerimeter} meters</strong>, you will require a total
            number of
            <strong> {FourSided_PegBundles_InternalBeam} bundles</strong> of peg
            which usually comes in 20pcs/ bundle,
            <strong> {Four_Sided_TiedRod} tie rods</strong> nos of Tie-rod or
            12mm x 50mm x 3600mm wood and
            <strong> {Four_Sided_Nail} kg</strong> of 3” nails. Also, you will
            require a carpenter and a labour for this process.
          </div>
          <div className="text-black rounded-lg  mb-4 ">
            This process (use of pegs, Tie-rods and Nails) are used for
            structures with internal beams. For structures without internal
            beams, you will require;{" "}
            <strong> {Four_Sided_RopeQuantity} yards</strong> of rope and not
            more than 1 bundle of peg or if off-cut woods (2x2 or 2x3 woods) or
            off-cut reinforcmeents are available they can be used aswell at
            strategic point.
          </div>
          <p className="text-black mb-4">
            Please note that pegs come in different lengths 900mm/3fts long,
            1200mm/ 4fts long, 1500mm/5fts long. The determining factor that
            dictates the length of peg to be bought is the looseness of the
            soil. The looser the soli the longer the peg required. Also,
            materials purchased here can be re-used.
          </p>
          <p className="text-black mb-6">
            1 construction day = 9 hours. You can check our{" "}
            <Link
              href="/applicable-material-labour-price"
              className="text-blue-900 underline"
            >
              material and labor price list/rates
            </Link>{" "}
            for applicable rates for your project. (the material and labour
            price list/rates should be an automatic link)
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

          <div className=" rounded-lg  mb-4 text-black">
            Setting out a structure perimeter of{" "}
            <strong> {sitePerimeter} meters</strong>, you will require a total
            number of
            <strong> {Circular_PegBundles_InternalBeam} bundles</strong> of peg
            which usually comes in 20pcs/ bundle,
            <strong> {Circular_Sided_TiedRod} tie rods</strong> nos of Tie-rod
            or 12mm x 50mm x 3600mm wood and
            <strong> {Circular_Sided_Nail} kg</strong> of 3” nails. Also, you
            will require a carpenter and a labour for this process.
          </div>
          <div className="text-black rounded-lg  mb-4 ">
            This process (use of pegs, Tie-rods and Nails) are used for
            structures with internal beams. For structures without internal
            beams, you will require;{" "}
            <strong> {Circular_Sided_RopeQuantity} yards</strong> of rope and
            not more than 1 bundle of peg or if off-cut woods (2x2 or 2x3 woods)
            or off-cut reinforcmeents are available they can be used aswell at
            strategic point.
          </div>
          <p className="text-black mb-4">
            Please note that pegs come in different lengths 900mm/3fts long,
            1200mm/ 4fts long, 1500mm/5fts long. The determining factor that
            dictates the length of peg to be bought is the looseness of the
            soil. The looser the soli the longer the peg required. Also,
            materials purchased here can be re-used.
          </p>
          <p className="text-black mb-6">
            1 construction day = 9 hours. You can check our{" "}
            <Link
              href="/applicable-material-labour-price"
              className="text-blue-900 underline"
            >
              material and labor price list/rates
            </Link>{" "}
            for applicable rates for your project. (the material and labour
            price list/rates should be an automatic link)
          </p>
        </>
      ) : null}
    </div>
  );
};

export default SettingOut;
