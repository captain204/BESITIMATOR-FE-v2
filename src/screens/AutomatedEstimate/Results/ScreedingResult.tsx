import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ScreedingResult: React.FC = () => {
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
        localStorage.getItem("Screeding  Inputs") || "{}"
      );

      setBlockworkStatus(localStorage.getItem("Wall-screedingstat") || "");

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
  //smooth
  const smoothCementQuantity = Area * 0.03;
  const smoothScreedingPaint = Area * 0.03;
  const smoothTopBond = Area * 0.17;
  const smoothLabourRequirement = Area * 1.0;
  const smoothScreederOutput = Area * 0.01;
  const smoothPreliminary = "Standing Platform, Bucket";

  //blockwork one
  //rough
  const roughCementQuantity = Area * 0.03;
  const roughScreedingPaint = Area * 0.04;
  const roughTopBond = Area * 0.17;
  const roughLabourRequirement = Area * 1.0;
  const roughScreederOutput = Area * 0.01;
  const roughPreliminary = "Standing Platform, Bucket";

  //blockwork one RatioOne
  const RatioOneroughCementQuantity = Area * 0.03;
  const RatioOneroughScreedingPaint = Area * 0.04;
  const RatioOneroughTopBond = Area * 0.17;
  const RatioOneroughLabourRequirement = Area * 1.0;
  const RatioOneroughScreederOutput = Area * 0.01;
  const RatioOneroughPreliminary = "Standing Platform, Bucket";

  //blockwork one RatioOne
  const RatioTworoughCementQuantity = Area * 0.03;
  const RatioTworoughScreedingPaint = Area * 0.04;
  const RatioTworoughTopBond = Area * 0.17;
  const RatioTworoughLabourRequirement = Area * 1.0;
  const RatioTworoughScreederOutput = Area * 0.01;
  const RatioTworoughPreliminary = "Standing Platform, Bucket";

  //   const BlockQuantity = Area * 10;
  //   const CementQuantity = Area * 0.26;
  //   const SandQuantity = Area * 0.13;
  //   const LabourRequirement = Area * 1.0;
  //   const BeickLayer = Area * 0.1;

  //blockwork Two

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

      {BlockworkStatus === "Smooth wall" ? (
        <p className="text-black">
          Material requirement for wall screeding an area of{" "}
          <strong>
            {Area}m<sup>2</sup>
          </strong>{" "}
          , if the wall is <strong>{BlockworkStatus}</strong> you will require
          an estimated amount of <strong>{formatter.format(smoothCementQuantity)}</strong> bags of
          cement (either POP cement/ Black Cement),{" "}
          <strong>{formatter.format(smoothScreedingPaint)}</strong> 20 litre bucket of Screeding
          paint and <strong>{formatter.format(smoothTopBond)}</strong> kg of Topbond glue. The
          labour requirement for this item of work, labours (Screeder) may be
          paid per sq. m for the work done. Therefore, the total area for this
          work item is{" "}
          <strong>
            {formatter.format(smoothLabourRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Alternatively, it
          will take a 1 manpower gang (1 Screeder) an estimated number of{" "}
          <strong>{formatter.format(smoothScreederOutput)}days</strong> to screed a wall area of{" "}
          <strong>
            {Area}m<sup>2</sup>
          </strong>
          . Also, the preliminary required for this item of work are{" "}
          <strong>{smoothPreliminary}</strong>
        </p>
      ) : (
        <p className="text-black">
          Material requirement for wall screeding an area of{" "}
          <strong>
            {Area}m<sup>2</sup>
          </strong>{" "}
          , if the wall is <strong>{BlockworkStatus}</strong> you will require
          an estimated amount of <strong>{formatter.format(roughCementQuantity)}</strong> bags of
          cement (either POP cement/ Black Cement),{" "}
          <strong>{formatter.format(roughScreedingPaint)}</strong> 20 litre bucket of Screeding
          paint and <strong>{formatter.format(roughTopBond)}</strong> kg of Topbond glue. The
          labour requirement for this item of work, labours (Screeder) may be
          paid per sq. m for the work done. Therefore, the total area for this
          work item is{" "}
          <strong>
            {formatter.format(roughLabourRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Alternatively, it
          will take a 1 manpower gang (1 Screeder) an estimated number of{" "}
          <strong>{formatter.format(roughScreederOutput)}days</strong> to screed a wall area of{" "}
          <strong>
            {Area}m<sup>2</sup>
          </strong>
          . Also, the preliminary required for this item of work are{" "}
          <strong>{roughPreliminary}</strong>
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

export default ScreedingResult;
