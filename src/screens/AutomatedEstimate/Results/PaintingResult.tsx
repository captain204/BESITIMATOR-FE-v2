import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PaintingResult: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [itemsOfWork, selectItemOfwork] = useState("");
  const [BlockworkStatus, setBlockworkStatus] = useState("");
  const [ratioStatus, setRatioStatus] = useState("");
  const [screedingStatus, setScreedingStatus] = useState("");
  const [typeOfPaint, setTypeOfPaint] = useState("");
  const [silkPaint, setSilkPaint] = useState("");
  const [emulsionPaint, setEmultionPaint] = useState("");
  const [textCoatPaint, setTextCoatPaint] = useState("");
  const [glossPaint, setglossPaint] = useState("");
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

      setBlockworkStatus(localStorage.getItem("Wall-screedingstat") || "");
      setRatioStatus(localStorage.getItem("ratio-of-screeding") || "");
      setTypeOfPaint(localStorage.getItem("Painting-select") || "");
      setSilkPaint(localStorage.getItem("Silkoptions") || "");
      setEmultionPaint(localStorage.getItem("EmulsionPaint") || "");
      setTextCoatPaint(localStorage.getItem("TextCoatPaint") || "");
      setglossPaint(localStorage.getItem("gloss-select") || "");
      //
      //   Wall-screeding-status
      //gloss-select

      //   thickness-of-floor-screeding
      setScreedingStatus(localStorage.getItem("Wall-screeding-status") || "");

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
  const RatioOneCementQuantity = Area * 0.38;
  const RatioOneSandPaint = Area * 0.07;
  const RatioOneTopBond = Area * 0.17;
  const RatioOneLabourRequirement = Area * 1.0;
  const RatioOneTilerLabourRequirement = Area * 0.03;
  const RatioOneScreederOutput = Area * 0.01;
  const RatioOnePreliminary = "HeadPans,Shovel";

  //blockwork one RatioOne
  const RatioTwoCementQuantity = Area * 0.35;
  const RatioTwoSandPaint = Area * 0.07;
  const RatioTwoTopBond = Area * 0.17;
  const RatioTwoLabourRequirement = Area * 1.0;
  const RatioTwoTilerLabourRequirement = Area * 0.03;
  const RatioTwoScreederOutput = Area * 0.01;
  const RatioTwoPreliminary = "HeadPans,Shovel";

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

      {typeOfPaint === "primer" ? (
        <p className="text-black">
          Material requirement for painting an area of *Area(M2)* m2 , using
          *Type of paint and no of coats* you will require an estimated amount
          of *paint (ltrs)* ltrs of paint. The labour requirement for this item
          of work, painters may be paid per sq. m for the work done. Therefore,
          the total area for this work item is *Painter requirement m2* m2. This
          may be multiplied by the applicable cost per m2 – you may refer here
          (link to material and labour price list/rates). Alternatively, it will
          take 1 painter an estimated number of *1 painter out output per day
          (days)* days to screed a wall area of *Area (m2) * m2. Also, the
          preliminary required for this item of work are *preliminary required*
        </p>
      ) : typeOfPaint === "satin/silk paint" ? (
        silkPaint === "One coat" ? (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        ) : silkPaint === "Two coats" ? (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        ) : (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        )
      ) : typeOfPaint === "Emulsion" ? (
        emulsionPaint === "One coat" ? (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        ) : emulsionPaint === "Two coat" ? (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        ) : (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        )
      ) : typeOfPaint === "Text coat paint" ? (
        textCoatPaint === "One coat" ? (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        ) : textCoatPaint === "Two coat" ? (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        ) : (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        )
      ) : typeOfPaint === "Gloss paint" ? (
        glossPaint === "One coat" ? (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        ) : glossPaint === "Two coat" ? (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        ) : (
          <p className="text-black">
            Material requirement for painting an area of *Area(M2)* m2 , using
            *Type of paint and no of coats* you will require an estimated amount
            of *paint (ltrs)* ltrs of paint. The labour requirement for this
            item of work, painters may be paid per sq. m for the work done.
            Therefore, the total area for this work item is *Painter requirement
            m2* m2. This may be multiplied by the applicable cost per m2 – you
            may refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of *1
            painter out output per day (days)* days to screed a wall area of
            *Area (m2) * m2. Also, the preliminary required for this item of
            work are *preliminary required*
          </p>
        )
      ) : null}

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

export default PaintingResult;
