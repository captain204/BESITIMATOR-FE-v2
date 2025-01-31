import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dampproving: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [excavationIn, setExcavationIn] = useState("");
  const [itemsOfWork, selectItemOfwork] = useState("");
  const [data, setData] = useState({
    ItemOfWork: "",
  });

  const [dataa, setDataa] = useState({
    fillingLevelling: {
      breadth: 0,
      length: 0,
      area: 0,
      unit: "Metres",
    },
  });

  useEffect(() => {
    dispatch(getUser());

    if (typeof window !== "undefined") {
      const DampProvingInputs = JSON.parse(
        localStorage.getItem("Damp Proving  Inputs") || "{}"
      );
      setData({
        ItemOfWork: localStorage.getItem("ItemOfWork") || "",
      });
      setDataa({
        fillingLevelling: {
          ...dataa.fillingLevelling,
          ...DampProvingInputs,
        },
      });

      selectItemOfwork(itemsOfWork);
    }
  }, [dispatch]);

  const { fillingLevelling } = dataa;

  const convertlevellingToMeters = (value: number) =>
    dataa.fillingLevelling.unit === "Millimetres" ? value / 1000 : value;

  // Convert mm to meters if unit is Millimetres

  const convertedLevelingInputs = {
    length: convertlevellingToMeters(fillingLevelling.length),
    breadth: convertlevellingToMeters(fillingLevelling.breadth),
    area:
      dataa.fillingLevelling.unit === "Millimetres"
        ? fillingLevelling.area / 1000_000 // Convert mm³ to m³
        : fillingLevelling.area,
  };

  const Area =
    convertedLevelingInputs.breadth * convertedLevelingInputs.length ||
    convertedLevelingInputs.area;

  const Guage = Area * 0.35;
  const Bituminous = Area * 1.15;
  const manLabour = Area * 0.0;

  // Ensure volume is always a number
  const formatter = new Intl.NumberFormat();

  const response = useSelector((state: RootState) => state.getUser.response);

  return (
    <div className="md:w-full w-80 ">
      <h1 className="text-2xl font-bold text-black mb-4">
        {data.ItemOfWork} Result
      </h1>
      <p className="text-black text-xl mb-5">
        Hi <strong>{response?.name}</strong>,
      </p>

      <p className="text-black mb-4">
        For{" "}
        <strong>
          {formatter.format(Area)}m<sup>2</sup>
        </strong>{" "}
        of Damp proofing/Felting works, you will require an estimated amount of {""}
        <strong>{formatter.format(Guage)}Kg </strong> if using any guage of
        polythene nylon and will take a 1 man labour an estimated number of {" "}
        <strong>{formatter.format(manLabour)} days</strong>. If using Bituminous
        or cementitious felting, you will require an estimated amount of
        <strong>
          {" "}
          {formatter.format(Bituminous)}m<sup>2</sup>
        </strong>{" "}
        which is usually priced by subcontractors as labour and material.
        Alhough, if not priced as labour & Material to apply this, it will take
        a 1 man labour an estimated number of{" "}
        <strong>{formatter.format(manLabour)} days</strong>. Please note that if
        using any guage of nylon for your damp proofing works most especially in
        foundation damp proof membrane works you will be required to add a layer
        of blinding after placing the guage of nylon. Please note 1construction
        day = 9 Hours You can check our material and labour price list/ rates
        for applicable rates for your project. (the material and labour price
        list/rates should be an automatic link)
      </p>
      <p className="text-black mb-6">
        Note: 1 construction day = 9 hours. You can check our{" "}
        <Link href="/pricing" className="text-blue-900 underline">
          material and labour price list/rates
        </Link>{" "}
        for applicable rates for your project.
      </p>
    </div>
  );
};

export default Dampproving;
