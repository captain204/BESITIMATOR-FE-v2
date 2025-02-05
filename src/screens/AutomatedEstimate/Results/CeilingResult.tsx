import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CeilingResult: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [itemsOfWork, selectItemOfwork] = useState("");
  const [ceilingOption, setCelingOption] = useState("");
  const [sizes, setSizes] = useState("");

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
        localStorage.getItem("Ceiling-Inputs") || "{}"
      );

      setCelingOption(localStorage.getItem("Ceiling-options") || "");
      setSizes(localStorage.getItem("Suspended-sizes") || "");

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

  const OneMaterialQty = Area * 0.3;
  const OneLength = Area * 1.0;
  const OneThreaded = Area * 0.6;
  const OneWallAngels = Area * 1.0;
  const OneLabourRequirment = Area * 1.0;
  const OnePreliminary = "standing Platform, tools";

  const TwoMaterialQty = Area * 0.4;
  const TwoLength = Area * 1.0;
  const TwoThreaded = Area * 0.6;
  const TwoWallAngels = Area * 1.0;
  const TwoLabourRequirment = Area * 1.0;
  const TwoPreliminary = "standing Platform, tools";

  const ThreeMaterialQty = Area * 0.36;
  const ThreeLength = Area * 1.0;
  const ThreeThreaded = Area * 0.6;
  const ThreeWallAngels = Area * 1.0;
  const ThreeLabourRequirment = Area * 1.0;
  const ThreePreliminary = "standing Platform, tools";

  const SteelMaterialQty = Area * 2.78;
  const SteelSuspensionWire = Area * 0.05;
  const StealMainRunner = Area * 0.2;
  const StealWallAngle = Area * 0.2;
  const StealFouthCross = Area * 1.4;
  const StealsecondCross = Area * 1.4;
  const StaelAnchorNail = Area * 0.8;
  const StealNail = Area * 0.2;
  const StealLabourRequirement = Area * 1.0;
  const StealPreliminaryRequired = "Standing platform, tools";

  const POPCement = Area * 0.42;
  const Filers = Area * 0.5;
  const GroundnutOil = Area * 0.03;
  const EvaSoup = Area * 0.06;
  const BindingWire = Area * 0.0;
  const TomadoNail = Area * 0.04;
  const LabourRequirement = Area * 1.0;
  const Preliminary = "Standing platform, tools";

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

      {ceilingOption === "SUSPENDED CEILING (PLASTER BOARD)" ? (
        sizes === "3m x 1.2m x 12mm or 10mm" ? (
          <p className="text-black">
            Material requirement for a suspended ceiling work using plaster
            board specification of <strong>{sizes}</strong> size to cover an
            area of{" "}
            <strong>
              {formatter.format(Area)}m<sup>2</sup>
            </strong>
            , you will require an estimated amount of{" "}
            <strong>{formatter.format(OneMaterialQty)}</strong> Nos of boards,{" "}
            <strong>{formatter.format(OneLength)}</strong> lengths of 3mm studs
            that come in 3meters,{" "}
            <strong>{formatter.format(OneThreaded)}</strong> Nos of Threaded
            rods, <strong>{formatter.format(OneWallAngels)}</strong> lengths of
            wall angles that come in 2.5meters per length. The labour
            requirement for this item of work, labours (Installer and Labour)
            may be paid per sq. m for the work done Therefore, the total area
            for this work item is{" "}
            <strong>
              {formatter.format(OneLabourRequirment)}m<sup>2</sup> .
            </strong>
            . This may be multiplied by the applicable cost per m2 – you may
            refer here (link to material and labour price list/rates). Also, the
            preliminary required for this item of work are{" "}
            <strong>{OnePreliminary}</strong>
          </p>
        ) : sizes === "2.4m x 1.2m x 12mm or 10mm" ? (
          <p className="text-black">
            Material requirement for a suspended ceiling work using plaster
            board specification of <strong>{sizes}</strong> size to cover an
            area of{" "}
            <strong>
              {formatter.format(Area)}m<sup>2</sup>
            </strong>
            , you will require an estimated amount of{" "}
            <strong>{formatter.format(TwoMaterialQty)}</strong> Nos of boards,{" "}
            <strong>{formatter.format(TwoLength)}</strong> lengths of 3mm studs
            that come in 3meters,{" "}
            <strong>{formatter.format(TwoThreaded)}</strong> Nos of Threaded
            rods, <strong>{formatter.format(TwoWallAngels)}</strong> lengths of
            wall angles that come in 2.5meters per length. The labour
            requirement for this item of work, labours (Installer and Labour)
            may be paid per sq. m for the work done Therefore, the total area
            for this work item is{" "}
            <strong>
              {formatter.format(TwoLabourRequirment)}m<sup>2</sup> .
            </strong>
            . This may be multiplied by the applicable cost per m2 – you may
            refer here (link to material and labour price list/rates). Also, the
            preliminary required for this item of work are{" "}
            <strong>{TwoPreliminary}</strong>
          </p>
        ) : (
          <p className="text-black">
            Material requirement for a suspended ceiling work using plaster
            board specification of <strong>{sizes}</strong> size to cover an
            area of{" "}
            <strong>
              {formatter.format(Area)}m<sup>2</sup>
            </strong>
            , you will require an estimated amount of{" "}
            <strong>{formatter.format(ThreeMaterialQty)}</strong> Nos of boards,{" "}
            <strong>{formatter.format(ThreeLength)}</strong> lengths of 3mm
            studs that come in 3meters,{" "}
            <strong>{formatter.format(ThreeThreaded)}</strong> Nos of Threaded
            rods, <strong>{formatter.format(ThreeWallAngels)}</strong> lengths
            of wall angles that come in 2.5meters per length. The labour
            requirement for this item of work, labours (Installer and Labour)
            may be paid per sq. m for the work done Therefore, the total area
            for this work item is{" "}
            <strong>
              {formatter.format(ThreeLabourRequirment)}m<sup>2</sup> .
            </strong>
            . This may be multiplied by the applicable cost per m2 – you may
            refer here (link to material and labour price list/rates). Also, the
            preliminary required for this item of work are{" "}
            <strong>{ThreePreliminary}</strong>
          </p>
        )
      ) : ceilingOption ===
        "SUSPENDED CEILING (60 X 60CM) WITH STEEL RUNNERS" ? (
        // const SteelMaterialQty = Area * 2.78;
        // const SteelSuspensionWire = Area * 0.05;
        // const StealMainRunner = Area * 0.2;
        // const StealWallAngle = Area * 0.2;
        // const StealFouthCross = Area * 1.40
        // const  StealsecondCross = Area * 1.40
        // const StaelAnchorNail = Area *0.80
        // const StealNail = Area * 0.20
        // const StealLabourRequirement = Area * 1.00
        // const StealPreliminaryRequired = "Standing platform, tools"

        <p className="text-black">
          Material requirement for a suspended ceiling work using 60 x 60cm
          boards with steel runners to cover an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , you will require an estimated amount of{" "}
          <strong>{formatter.format(SteelMaterialQty)}</strong> Nos of boards,{" "}
          <strong>{formatter.format(SteelSuspensionWire)}</strong> coils
          Suspension wire, <strong>{formatter.format(StealMainRunner)}</strong>{" "}
          lengths of Main runners that come in 3.6meters per length,{" "}
          <strong>{formatter.format(StealWallAngle)}</strong> lengths of wall
          angles that come in 3 meters per length,{" "}
          <strong>{formatter.format(StealFouthCross)}</strong> pieces of 4ft
          cross tee grids,
          <strong>{formatter.format(StealsecondCross)}</strong> pieces of 2ft
          cross tee grids ,<strong>{formatter.format(StaelAnchorNail)}</strong>{" "}
          Nos of anchor nails, <strong>{formatter.format(StealNail)}</strong> kg
          of nails. The type of nail to be used is dependent on the status of
          the area where the ceiling is to be fixed. The labour requirement for
          this item of work, labours (Installer and Labour) may be paid per sq.
          m for the work done Therefore, the total area for this work item is{" "}
          <strong>
            {StealLabourRequirement}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Also, the
          preliminary required for this item of work are{" "}
          <strong>{StealPreliminaryRequired}</strong>
        </p>
      ) : (
        // const POPCement = Area * 0.42;
        // const Filers = Area * 0.50
        // const GroundnutOil = Area * 0.03
        // const EvaSoup = Area * 0.06
        // const BindingWire = Area * 0.00
        // const TomadoNail = Area * 0.04
        // const LabourRequirement = Area * 1.00
        // const Preliminary = "Standing platform, tools";

        <p className="text-black">
          Material requirement for a suspended ceiling (casting)work using that
          will cover an area of{" "}
          <strong>
            {formatter.format(Area)}m<sup>2</sup>
          </strong>
          , you will require an estimated amount of{" "}
          <strong>{formatter.format(POPCement)}</strong> bags of POP cement
          (25kg), <strong>{formatter.format(Filers)}(Kg)</strong> kg of Fillers,{" "}
          <strong>{formatter.format(GroundnutOil)}(ltrs)</strong> Ltrs of ground
          nut oil, <strong>{formatter.format(EvaSoup)}</strong> nos of EVA soap
          bar, <strong>{formatter.format(BindingWire)}</strong> rolls of Binding
          wire, <strong>{formatter.format(TomadoNail)}</strong> packets of
          Tornado Nails. The labour requirement for this item of work, labours
          (Installer and Labour) may be paid per sq. m for the work done
          Therefore, the total area for this work item is{" "}
          <strong>
            {LabourRequirement}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 – you may refer
          here (link to material and labour price list/rates). Also, the
          preliminary required for this item of work are{" "}
          <strong>{Preliminary}</strong>
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

export default CeilingResult;
