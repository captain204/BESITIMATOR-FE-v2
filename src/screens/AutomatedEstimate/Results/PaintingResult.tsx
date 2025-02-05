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

  //primerPaint
  const PrimerPaint = Area * 0.77;
  const PrimerPainterRequirement = Area * 10.0;
  const PrimerOutputPerday = Area * 0.09;
  const PrimerPriliminaryRequired = "Wall Fillers, water and Standing platform";

  //Silk
  const SilkOnePaint = Area * 0.06;
  const SilkOnePainterRequirement = Area * 1.0;
  const SilkOneOutputPerday = Area * 0.01;
  const SilkOnePriliminaryRequired = "Wall Fillers, Standing platform";

  const SilkTwoPaint = Area * 0.06;
  const SilkTwoPainterRequirement = Area * 1.0;
  const SilkTwoOutputPerday = Area * 0.01;
  const SilkTwoPriliminaryRequired = "Wall Fillers, Standing platform";

  const SilkThreePaint = Area * 0.07;
  const SilkThreePainterRequirement = Area * 1.0;
  const SilkThreeOutputPerday = Area * 0.01;
  const SilkThreePriliminaryRequired = "Wall Fillers, Standing platform";

  //Emultion
  const EmultionOnePaint = Area * 0.08;
  const EmultionOnePainterRequirement = Area * 1.0;
  const EmultionOneOutputPerday = Area * 0.01;
  const EmultionOnePriliminaryRequired = "Wall Fillers, Standing platform";

  const EmultionTwoPaint = Area * 0.1;
  const EmultionTwoPainterRequirement = Area * 1.0;
  const EmultionTwoOutputPerday = Area * 0.01;
  const EmultionTwoPriliminaryRequired = "Wall Fillers, Standing platform";

  const EmultionThreePaint = Area * 0.13;
  const EmultionThreePainterRequirement = Area * 1.0;
  const EmultionThreeOutputPerday = Area * 0.01;
  const EmultionThreePriliminaryRequired = "Wall Fillers, Standing platform";

  //TextCoat
  const TextCoatOnePaint = Area * 0.59;
  const TextCoatOnePainterRequirement = Area * 1.0;
  const TextCoatOneOutputPerday = Area * 0.01;
  const TextCoatOnePriliminaryRequired = "Wall Fillers, Standing platform";

  const TextCoatTwoPaint = Area * 0.1;
  const TextCoatTwoPainterRequirement = Area * 1.0;
  const TextCoatTwoOutputPerday = Area * 0.01;
  const TextCoatTwoPriliminaryRequired = "Wall Fillers, Standing platform";

  const TextCoatThreePaint = Area * 0.83;
  const TextCoatThreePainterRequirement = Area * 1.0;
  const TextCoatThreeOutputPerday = Area * 0.01;
  const TextCoatThreePriliminaryRequired = "Wall Fillers, Standing platform";

  //Gloss
  const GlossOnePaint = Area * 0.1;
  const GlossOnePainterRequirement = Area * 1.0;
  const GlossOneOutputPerday = Area * 0.01;
  const GlossOnePriliminaryRequired =
    "Wall Fillers, Standing platform and Thinner(In some cases)";

  const GlossTwoPaint = Area * 0.13;
  const GlossTwoPainterRequirement = Area * 1.0;
  const GlossTwoOutputPerday = Area * 0.01;
  const GlossTwoPriliminaryRequired =
    "Wall Fillers, Standing platform and Thinner(In some cases)";

  const GlossThreePaint = Area * 0.17;
  const GlossThreePainterRequirement = Area * 1.0;
  const GlossThreeOutputPerday = Area * 0.01;
  const GlossThreePriliminaryRequired =
    "Wall Fillers, Standing platform and Thinner(In some cases)";

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
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount of{" "}
          <strong>{formatter.format(PrimerPaint)}</strong> ltrs of paint. The
          labour requirement for this item of work, painters may be paid per sq.
          m for the work done. Therefore, the total area for this work item is{" "}
          <strong>
            {formatter.format(PrimerPainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Alternatively, it
          will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(PrimerOutputPerday)} days</strong> to screed
          a wall area of <strong>{formatter.format(Area)}</strong>. Also, the
          preliminary required for this item of work are{" "}
          <strong>{PrimerPriliminaryRequired}</strong>
        </p>
      ) : typeOfPaint === "satin/silk paint" ? (
        silkPaint === "One coat" ? (
          //         const SilkOnePaint = Area * 0.06;
          // const SilkOnePainterRequirement = Area * 1.0;
          // const SilkOneOutputPerday = Area * 0.01;
          // const SilkOnePriliminaryRequired = "Wall Fillers, Standing platform";

          <p className="text-black">
            Material requirement for painting an area of{" "}
            <strong>
              {formatter.format(Area)}m<sup>2</sup>
            </strong>
            , using
            <strong>{typeOfPaint}</strong> you will require an estimated amount
            of <strong>{formatter.format(SilkOnePaint)}</strong> ltrs of paint.
            The labour requirement for this item of work, painters may be paid
            per sq. m for the work done. Therefore, the total area for this work
            item is{" "}
            <strong>
              {formatter.format(SilkOnePainterRequirement)}m<sup>2</sup>
            </strong>
            . This may be multiplied by the applicable cost per m2 – you may
            refer here (link to material and labour price list/rates).
            Alternatively, it will take 1 painter an estimated number of{" "}
            <strong>{formatter.format(SilkOneOutputPerday)} days</strong> to
            screed a wall area of <strong>{formatter.format(Area)}</strong>.
            Also, the preliminary required for this item of work are{" "}
            <strong>{SilkOnePriliminaryRequired}</strong>
          </p>
        ) : silkPaint === "Two coats" ? (
          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(SilkTwoPaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(SilkTwoPainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(SilkTwoOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{SilkTwoPriliminaryRequired}</strong>
        </p>
        ) : (
          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(SilkThreePaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(SilkThreePainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(SilkThreeOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{SilkThreePriliminaryRequired}</strong>
        </p>
        )
      ) : typeOfPaint === "Emulsion" ? (
        emulsionPaint === "One coat" ? (

          // const EmultionOnePaint = Area * 0.08;
          // const EmultionOnePainterRequirement = Area * 1.0;
          // const EmultionOneOutputPerday = Area * 0.01;
          // const EmultionOnePriliminaryRequired = "Wall Fillers, Standing plat
          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(EmultionOnePaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(EmultionOnePainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(EmultionOneOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{EmultionOnePriliminaryRequired}</strong>
        </p>
        ) : emulsionPaint === "Two coat" ? (
          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(EmultionTwoPaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(EmultionTwoPainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(EmultionTwoOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{EmultionTwoPriliminaryRequired}</strong>
        </p>
        ) : (
          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(EmultionThreePaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(EmultionThreePainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m<sup>2</sup> – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(EmultionThreeOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{EmultionThreePriliminaryRequired}</strong>
        </p>
        )
      ) : typeOfPaint === "Text coat paint" ? (
        textCoatPaint === "One coat" ? (


          // const TextCoatOnePaint = Area * 0.59;
          // const TextCoatOnePainterRequirement = Area * 1.0;
          // const TextCoatOneOutputPerday = Area * 0.01;
          // const TextCoatOnePriliminaryRequired = "Wall Fillers, Standing platform";

          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(TextCoatOnePaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(TextCoatOnePainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m<sup>2</sup> – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(TextCoatOneOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{TextCoatOnePriliminaryRequired}</strong>
        </p>

        ) : textCoatPaint === "Two coat" ? (
          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(TextCoatTwoPaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(TextCoatTwoPainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m<sup>2</sup> – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(TextCoatTwoOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{TextCoatTwoPriliminaryRequired}</strong>
        </p>
        ) : (
          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(TextCoatThreePaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(TextCoatThreePainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m<sup>2</sup> – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(TextCoatThreeOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{TextCoatThreePriliminaryRequired}</strong>
        </p>
        )
      ) : typeOfPaint === "Gloss paint" ? (
        glossPaint === "One coat" ? (

          // const GlossOnePaint = Area * 0.1;
          // const GlossOnePainterRequirement = Area * 1.0;
          // const GlossOneOutputPerday = Area * 0.01;
          // const GlossOnePriliminaryRequired =
          //   "Wall Fillers, Standing platform and Thinner(In some cases)";

          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(GlossOnePaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(GlossOnePainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m<sup>2</sup> – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(GlossOneOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{GlossOnePriliminaryRequired}</strong>
        </p>
        ) : glossPaint === "Two coat" ? (
          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(GlossTwoPaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(GlossTwoPainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m<sup>2</sup> – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(GlossTwoOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{GlossTwoPriliminaryRequired}</strong>
        </p>
        ) : (
          <p className="text-black">
          Material requirement for painting an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , using
          <strong>{typeOfPaint}</strong> you will require an estimated amount
          of <strong>{formatter.format(GlossThreePaint)}</strong> ltrs of paint.
          The labour requirement for this item of work, painters may be paid
          per sq. m for the work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {formatter.format(GlossThreePainterRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m<sup>2</sup> – you may
          refer here (link to material and labour price list/rates).
          Alternatively, it will take 1 painter an estimated number of{" "}
          <strong>{formatter.format(GlossThreeOutputPerday)} days</strong> to
          screed a wall area of <strong>{formatter.format(Area)}</strong>.
          Also, the preliminary required for this item of work are{" "}
          <strong>{GlossThreePriliminaryRequired}</strong>
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
