import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PavingWorksResult: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [itemsOfWork, selectItemOfwork] = useState("");
  const [tillingOption, setTillingOption] = useState("");

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
        localStorage.getItem("Painting-Inputs") || "{}"
      );

      setTillingOption(localStorage.getItem("Tilling-0ptions") || "");

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

  const convertlevellingToMeters: any = (value: number) =>
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

  const MaterialQuantity = Area * 10.0;
  const NyLon = Area * 2.63;
  const LabourRequirement = Area * 0;
  const Preliminary = "Headpans and Shovels";
  //blockwork one
  //smooth

  //primerPaint

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

      <p className="text-black">
        Material requirement for Paving works which comes in different shapes,
        sizes and strengths for an area of{" "}
        <strong>
          {formatter.format(Area)}m<sup>2</sup>
        </strong>
        , you will require an estimated amount of{" "}
        <strong>
          {formatter.format(MaterialQuantity)}m<sup>2</sup>
        </strong>
        , <strong>{formatter.format(NyLon)}</strong> Kg of Nylon. The labour
        requirement for this item of work, labours (Installer and Labour) may be
        paid per sq. m for the work done Therefore, the total area for this work
        item is{" "}
        <strong>
          {formatter.format(LabourRequirement)}m<sup>2</sup>
        </strong>
        . This may be multiplied by the applicable cost per m<sup>2</sup> – you may refer
        here (link to material and labour price list/rates). Also, the
        preliminary required for this item of work are <strong>{Preliminary}</strong>
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

export default PavingWorksResult;
