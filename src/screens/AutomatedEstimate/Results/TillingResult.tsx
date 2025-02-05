import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TillingResult: React.FC = () => {
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

  const convertlevellingToMeters:any = (value: number) =>
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

  const WallMateriaQuantity = Area * 1.12;
  const WallCement = Area * 1.1;
  const WallGlue = Area * 0;
  const WallLabourRequirement = Area * 1.0;
  const WallOutPutPerDay = Area * 0.07;
  const WallPreliminary = "Headpans, Shovels and Spacers";

  const FloorMateriaQuantity = Area * 1.12;
  const FloorCement = Area * 0.07;
  const FloorGlue = Area * 0;
  const FloorLabourRequirement = Area * 1.0;
  const FloorOutPutPerDay = Area * 0.04;
  const FloorPreliminary = "Headpans, Shovels and Spacers";

  const GraniteMateriaQuantity = Area * 1.0;
  const GraniteCement = Area * 0.08;
  const GraniteGlue = Area * 0;
  const GraniteLabourRequirement = Area * 1.0;
  const GraniteOutPutPerDay = Area * 0.04;
  const GranitePreliminary = "Headpans and Spacers";

  const FacingMateriaQuantity = Area * 1.12;
  const FacingCement = Area * 1.1;
  const FacingGlue = Area * 0;
  const FacingLabourRequirement = Area * 1.0;
  const FacingOutPutPerDay = Area * 0.07;
  const FacingPreliminary = "Headpans and Spacers";

  const ParquetMateriaQuantity = Area * 1.12;
  const ParquetCement = Area * 0;
  const ParquetGlue = Area * 1.21;
  const ParquetLabourRequirement = Area * 1.0;
  const ParquetOutPutPerDay = Area * 0.04;
  const ParquetPreliminary = "Spacers";

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

      {tillingOption === "Wall Tiles" ? (
        // const WallMateriaQuantity = Area * 1.12;
        // const WallCement = Area * 1.1;
        // const WallGlue = Area * 0;
        // const WallLabourRequirement = Area * 1.0;
        // const WallOutPutPerDay = Area * 0.07;
        // const WallPreliminary = "Headpans, Shovels and Spacers";

        <p className="text-black">
          Material requirement for <strong>{tillingOption}</strong> an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , you will require an estimated amount of{" "}
          <strong>
            {formatter.format(WallMateriaQuantity)}m<sup>2</sup>
          </strong>{" "}
          of <strong>{tillingOption}</strong>, if using cement as adhesive,{" "}
          <strong>{formatter.format(WallCement)} bags</strong> of cement and if
          using glue as adhesive,{" "}
          <strong>{formatter.format(WallGlue)} ltrs</strong> of Glue/Gum. The
          labour requirement for this item of work, labours (Installer and
          Labour) may be paid per sq. m for the work done but for Staircase
          Granite slab works and other tiling design works, this work item is
          usually charged. Therefore, the total area for this work item is{" "}
          <strong>
            {formatter.format(WallLabourRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Alternatively, it
          will take a 1 manpower gang (1 Tiler and labour) an estimated number
          of <strong>{formatter.format(WallOutPutPerDay)} days</strong> to
          finish an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          . Also, the preliminary required for this item of work are{" "}
          <strong>{WallPreliminary}</strong>
        </p>
      ) : tillingOption === "Floor Tiles" ? (
        <p className="text-black">
          Material requirement for <strong>{tillingOption}</strong> an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , you will require an estimated amount of{" "}
          <strong>
            {formatter.format(FloorMateriaQuantity)}m<sup>2</sup>
          </strong>{" "}
          of <strong>{tillingOption}</strong>, if using cement as adhesive,{" "}
          <strong>{formatter.format(FloorCement)} bags</strong> of cement and if
          using glue as adhesive,{" "}
          <strong>{formatter.format(FloorGlue)} ltrs</strong> of Glue/Gum. The
          labour requirement for this item of work, labours (Installer and
          Labour) may be paid per sq. m for the work done but for Staircase
          Granite slab works and other tiling design works, this work item is
          usually charged. Therefore, the total area for this work item is{" "}
          <strong>
            {formatter.format(FloorLabourRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Alternatively, it
          will take a 1 manpower gang (1 Tiler and labour) an estimated number
          of <strong>{formatter.format(FloorOutPutPerDay)} days</strong> to
          finish an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          . Also, the preliminary required for this item of work are{" "}
          <strong>{FloorPreliminary}</strong>
        </p>
      ) : tillingOption === "Granite Slab" ? (
        <p className="text-black">
          Material requirement for <strong>{tillingOption}</strong> an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , you will require an estimated amount of{" "}
          <strong>
            {formatter.format(GraniteMateriaQuantity)}m<sup>2</sup>
          </strong>{" "}
          of <strong>{tillingOption}</strong>, if using cement as adhesive,{" "}
          <strong>{formatter.format(GraniteCement)} bags</strong> of cement and
          if using glue as adhesive,{" "}
          <strong>{formatter.format(GraniteGlue)} ltrs</strong> of Glue/Gum. The
          labour requirement for this item of work, labours (Installer and
          Labour) may be paid per sq. m for the work done but for Staircase
          Granite slab works and other tiling design works, this work item is
          usually charged. Therefore, the total area for this work item is{" "}
          <strong>
            {formatter.format(GraniteLabourRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Alternatively, it
          will take a 1 manpower gang (1 Tiler and labour) an estimated number
          of <strong>{formatter.format(GraniteOutPutPerDay)} days</strong> to
          finish an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          . Also, the preliminary required for this item of work are{" "}
          <strong>{GranitePreliminary}</strong>
        </p>
      ) : tillingOption === "Facing bricks" ? (
        <p className="text-black">
          Material requirement for <strong>{tillingOption}</strong> an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , you will require an estimated amount of{" "}
          <strong>
            {formatter.format(FacingMateriaQuantity)}m<sup>2</sup>
          </strong>{" "}
          of <strong>{tillingOption}</strong>, if using cement as adhesive,{" "}
          <strong>{formatter.format(FacingCement)} bags</strong> of cement and
          if using glue as adhesive,{" "}
          <strong>{formatter.format(FacingGlue)} ltrs</strong> of Glue/Gum. The
          labour requirement for this item of work, labours (Installer and
          Labour) may be paid per sq. m for the work done but for Staircase
          Granite slab works and other tiling design works, this work item is
          usually charged. Therefore, the total area for this work item is{" "}
          <strong>
            {formatter.format(FacingLabourRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Alternatively, it
          will take a 1 manpower gang (1 Tiler and labour) an estimated number
          of <strong>{formatter.format(FacingOutPutPerDay)} days</strong> to
          finish an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          . Also, the preliminary required for this item of work are{" "}
          <strong>{FacingPreliminary}</strong>
        </p>
      ) : tillingOption === "Parquet/Wooden floor" ? (
        <p className="text-black">
          Material requirement for <strong>{tillingOption}</strong> an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , you will require an estimated amount of{" "}
          <strong>
            {formatter.format(ParquetMateriaQuantity)}m<sup>2</sup>
          </strong>{" "}
          of <strong>{tillingOption}</strong>, if using cement as adhesive,{" "}
          <strong>{formatter.format(ParquetCement)} bags</strong> of cement and
          if using glue as adhesive,{" "}
          <strong>{formatter.format(ParquetGlue)} ltrs</strong> of Glue/Gum. The
          labour requirement for this item of work, labours (Installer and
          Labour) may be paid per sq. m for the work done but for Staircase
          Granite slab works and other tiling design works, this work item is
          usually charged. Therefore, the total area for this work item is{" "}
          <strong>
            {formatter.format(ParquetLabourRequirement)}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Alternatively, it
          will take a 1 manpower gang (1 Tiler and labour) an estimated number
          of <strong>{formatter.format(ParquetOutPutPerDay)} days</strong> to
          finish an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          . Also, the preliminary required for this item of work are{" "}
          <strong>{ParquetPreliminary}</strong>
        </p>
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

export default TillingResult;
