import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BlockWorkResult: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [itemsOfWork, selectItemOfwork] = useState("");
  const [BlockworkStatus, setBlockworkStatus] = useState("");
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
        localStorage.getItem("Blockwork  Inputs") || "{}"
      );

      setBlockworkStatus(localStorage.getItem("Blockwork-and-Brickwork") || "");

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

  //blockwork one
  const BlockQuantity = Area * 10;
  const CementQuantity = Area * 0.26;
  const SandQuantity = Area * 0.13;
  const LabourRequirement = Area * 1.0;
  const BeickLayer = Area * 0.1;

  //blockwork Two
  const BlockQuantityTwo = Area * 10;
  const CementQuantityTwo = Area * 0.25;
  const SandQuantityTwo = Area * 0.13;
  const LabourRequirementTwo = Area * 1.0;
  const BeickLayerTwo = Area * 0.09;

  //blockwork
  // const BlockQuantityTwo = Area * 10
  // const CementQuantityTwo = Area * 0.25
  // const SandQuantityTwo = Area * 0.13
  // const LabourRequirementTwo = Area * 1.00
  // const BeickLayerTwo = Area * 0.09
  //   const Guage = Area * 0.35;
  //   const Bituminous = Area * 1.15;
  //   const manLabour = Area * 0.0;

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

      {BlockworkStatus === '225mm Blockwork(9")' ? (
        <p className="text-black">
          Material requirement for an area of{" "}
          <strong>
            {Area}m<sup>2</sup>
          </strong>{" "}
          with <strong>{BlockworkStatus}</strong>, You will require an estimated
          amount of <strong>{formatter.format(BlockQuantityTwo)}nos</strong> of{" "}
          <strong>{BlockworkStatus}</strong>. Also, to lay these blocks using a
          Mortar mix ratio of 1:6 ( Cement and Sand), you will require an
          estimated amount of
          <strong>{formatter.format(CementQuantityTwo)}</strong> bags of cement
          and <strong>{formatter.format(SandQuantityTwo)}</strong> tons of sharp
          sand. The labour requirement for this item of work, labours
          (Bricklayers and Labour) may be paid per sq. m for the work done.
          Therefore, the total area for this work item is{" "}
          <strong>{formatter.format(LabourRequirementTwo)}</strong>. This may be
          multiplied by the applicable cost per m2 – you may refer here (link to
          material and labour price list/rates). Alternatively, it will take a 1
          manpower gang (1 Bricklayer and labour) an estimated number of{" "}
          <strong> {formatter.format(BeickLayerTwo)} days </strong> to lay{" "}
          <strong>{formatter.format(BlockQuantityTwo)}nos</strong>
          of Blocks.
        </p>
      ) : BlockworkStatus === '150mm Blockwork(6")' ? (
        <p className="text-black">
          Material requirement for an area of{" "}
          <strong>
            {Area}m<sup>2</sup>
          </strong>{" "}
          with <strong>{BlockworkStatus}</strong> , You will require an
          estimated amount of{" "}
          <strong>{formatter.format(BlockQuantity)}nos</strong> of{" "}
          <strong>{BlockworkStatus}</strong> . Also, to lay these blocks using a
          Mortar mix ratio of 1:6 ( Cement and Sand), you will require an
          estimated amount of
          <strong>{formatter.format(CementQuantity)}</strong> bags of cement and{" "}
          <strong>{formatter.format(SandQuantity)}</strong> tons of sharp sand.
          The labour requirement for this item of work, labours (Bricklayers and
          Labour) may be paid per sq. m for the work done. Therefore, the total
          area for this work item is{" "}
          <strong>{formatter.format(LabourRequirement)}</strong>. This may be
          multiplied by the applicable cost per m2 – you may refer here (link to
          material and labour price list/rates). Alternatively, it will take a 1
          manpower gang (1 Bricklayer and labour) an estimated number of{" "}
          <strong> {formatter.format(BeickLayer)} days </strong> to lay{" "}
          <strong>{formatter.format(BlockQuantity)}nos </strong>
          of Blocks.
        </p>
      ) : (
        <p className="text-black">
          Material requirement for an area of{" "}
          <strong>
            {Area}m<sup>2</sup>
          </strong>{" "}
          with <strong>{BlockworkStatus}</strong>, You will require an estimated
          amount of <strong>{formatter.format(BlockQuantity)}nos</strong> of{" "}
          <strong> {BlockworkStatus} </strong> . Also, to lay these blocks using
          a Mortar mix ratio of 1:6 ( Cement and Sand), you will require an
          estimated amount of
          <strong>{formatter.format(CementQuantity)}</strong> bags of cement and{" "}
          <strong>{formatter.format(SandQuantity)}</strong> tons of sharp sand.
          The labour requirement for this item of work, labours (Bricklayers and
          Labour) may be paid per sq. m for the work done. Therefore, the total
          area for this work item is{" "}
          <strong>{formatter.format(LabourRequirement)}</strong>. This may be
          multiplied by the applicable cost per m2 – you may refer here (link to
          material and labour price list/rates). Alternatively, it will take a 1
          manpower gang (1 Bricklayer and labour) an estimated number of{" "}
          <strong> {formatter.format(BeickLayer)} days </strong> to lay{" "}
          <strong>{formatter.format(BlockQuantity)}nos</strong>
          of Blocks.
        </p>
      )}

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

export default BlockWorkResult;
