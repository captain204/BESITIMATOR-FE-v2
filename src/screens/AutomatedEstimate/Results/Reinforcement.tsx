import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Reinforcement: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [itemsOfWork, selectItemOfwork] = useState("");
  const [reinforcementType, setReinforcementType] = useState("");
  const [lintelType, setLintelType] = useState("");
  const [statusOfConstruction, setStatusOfConstruction] = useState("");
  const [lintelROptions, setLintelROptions] = useState("");
  const [columnStatus, setcolumnStatus] = useState("");
  const [sizeOfSlap, setSizeOfSlap] = useState("");
  const [GroundSuspendedLintel, setGroundSuspendedLintel] = useState({
    GSLintel: {
      siteLength: 0,
      unit: "Metres",
    },
  });

  const [Column, setColumn] = useState({
    colum: {
      total: 0,
      hight: 0,
      unit: "Metres",
    },
  });

  //tryigt to set area for slabs

  const [Slapdata, setSlapdata] = useState({
    SlapInputsData: {
      breadth: 0,
      length: 0,
      area: 0,
      unit: "Metres",
    },
  });

  //

  const [slabs, setSlabs] = useState("");
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

      const ReinforcementSlapInputs = JSON.parse(
        localStorage.getItem("Reinforcement-slaps Inputs") || "{}"
      );

      setcolumnStatus(localStorage.getItem("Slabs-Slaps") || "");

      setSizeOfSlap;
      // Slabs-Slaps

      setReinforcementType(
        localStorage.getItem("Where-you-need-your-reinforcement-for") || ""
      );

      setLintelType(
        localStorage.getItem("material-used-for-your-lintel") || ""
      );

      setStatusOfConstruction(
        localStorage.getItem("Status-of-construction-area") || ""
      );

      const GSLintelInputs = JSON.parse(
        localStorage.getItem("Reinforcement/Iron bending works Inputs") || "{}"
      );

      setLintelROptions(
        localStorage.getItem("Lintel-reinforcement-option") || ""
      );

      setGroundSuspendedLintel({
        GSLintel: {
          ...GroundSuspendedLintel.GSLintel,
          ...GSLintelInputs,
        },
      });

      const ColumnInputs = JSON.parse(
        localStorage.getItem("Reinforcemet-Column Inputs") || "{}"
      );

      setColumn({
        colum: {
          ...Column.colum,
          ...ColumnInputs,
        },
      });

      setSlapdata({
        SlapInputsData: {
          ...Slapdata.SlapInputsData,
          ...ReinforcementSlapInputs,
        },
      });

      // setGroundSuspendedLintel(
      //   localStorage.getItem("Reinforcement/Iron bending works Inputs") || ""
      // );

      setSlabs(localStorage.getItem("Reinforcement-slaps Inputs") || "");

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

  const { GSLintel } = GroundSuspendedLintel;

  const { SlapInputsData } = Slapdata;

  const convertSlapToMeters = (value: number) =>
    Slapdata.SlapInputsData.unit === "Millimetres" ? value / 1000 : value;

  const convertedSlapInputs = {
    length: convertSlapToMeters(SlapInputsData.length),
    breadth: convertSlapToMeters(SlapInputsData.breadth),
    area:
      Slapdata.SlapInputsData.unit === "Millimetres"
        ? SlapInputsData.area / 1000_000 // Convert mm³ to m³
        : SlapInputsData.area,
  };

  const SlapArea =
    convertedSlapInputs.breadth * convertedSlapInputs.length ||
    convertedSlapInputs.area;

  const SlapThelvetons = SlapArea * 0.02;
  const SlapBindinCWire = SlapArea * 0.00003;
  const SlapLabourRequirement = SlapArea * 0.02;

  const SlapThelveTwotons = SlapArea * 0.02;
  const SlapBindinTwoWire = SlapArea * 0.00003;
  const SlapLabourTwoRequirement = SlapArea * 0.02;

  const convertGroundSuspendedLintelToMeters: any = (value: number) =>
    GroundSuspendedLintel.GSLintel.unit === "Millimetres"
      ? value / 1000
      : value;

  const convertedLevelingInputs: any = {
    length: convertGroundSuspendedLintelToMeters(GSLintel.siteLength),
  };

  const { colum } = Column;

  const convertColumnToMeters = (value: number) =>
    Column.colum.unit === "Millimetres" ? value / 1000 : value;

  const convertedColumnInputs: any = {
    total: convertColumnToMeters(colum.total),
    hight: convertColumnToMeters(colum.hight),
  };

  //column inputs
  const ColumntotalNos = convertedColumnInputs.total;
  const ColumnHeight = convertedColumnInputs.hight;
  const CModeratelySixtons = ColumnHeight * 0.01;
  const CModeratelyTentons = ColumnHeight * 0.01;
  const CModeratelyBindinCWire = ColumnHeight * 0.00001;
  const CModeratelyLabourRequirement = ColumnHeight * 0.01;

  const CSixtons = ColumnHeight * 0.01;
  const CTentons = ColumnHeight * 0.01;
  const CBindinCWire = ColumnHeight * 0.00001;
  const CLabourRequirement = ColumnHeight * 0.01;

  // Convert mm to meters if unit is Millimetres

  const GSLintelLength = convertedLevelingInputs.length || 0;

  //moderately
  const GModeratelySixtons = GSLintelLength * 0.01;
  const GModeratelyTwelvetons = GSLintelLength * 0.0;
  const GModeratelyTentons = GSLintelLength * 0.01;
  const GModeratelyBindingWire = GSLintelLength * 0.00003;
  const GModeratelyLabourRequirement = GSLintelLength * 0.02;

  //non-swampy
  const GNonSwampySixtons = GSLintelLength * 0.0;
  const GNonSwampyTwelvetons = GSLintelLength * 0.0;
  const GNonSwampyTentons = GSLintelLength * 0.01;
  const GNonSwampyBindingWire = GSLintelLength * 0.00002;
  const GNonSwampyLabourRequirement = GSLintelLength * 0.01;

  //moderately2
  const GWithFloodingSixtons = GSLintelLength * 0.02;
  const GWithFloodingTwelvetons = GSLintelLength * 0.0;
  const GWithFloodingTentons = GSLintelLength * 0.01;
  const GWithFloodingBindingWire = GSLintelLength * 0.00005;
  const GWithFloodingLabourRequirement = GSLintelLength * 0.03;

  //suspendedbeam
  const GSuspendedBeamSixtons = GSLintelLength * 0.07;
  // const GSuspendedBeamTwelvetons = GSLintelLength * 0.0;
  const GSuspendedBeamTentons = GSLintelLength * 0.01;
  const GSuspendedBeamBindingWire = GSLintelLength * 0.00011;
  const GSuspendedBeamLabourRequirement = GSLintelLength * 0.07;

  //lintelReinforcement 225

  // const GLintelOneSixtons = GSLintelLength * 0.07;
  const GLintelOneTwelvetons = GSLintelLength * 0.0;
  const GLintelOneTentons = GSLintelLength * 0.0;
  const GLintelOneBindingWire = GSLintelLength * 0.00001;
  const GLintelOneLabourRequirement = GSLintelLength * 0.01;

  //lintelReinforcement 150
  const GLintelTwoTwelvetons = GSLintelLength * 0.0;
  const GLintelTwoTentons = GSLintelLength * 0.0;
  const GLintelTwoBindingWire = GSLintelLength * 0.00001;
  const GLintelTwoLabourRequirement = GSLintelLength * 0.01;

  //lintelReinforcement 225 prescard
  const GLintelThreeTwelvetons = GSLintelLength * 0.0;
  const GLintelThreeTentons = GSLintelLength * 0.0;
  const GLintelThreeBindingWire = GSLintelLength * 0.0;
  const GLintelThreeLabourRequirement = GSLintelLength * 0.0;

  //lintelReinforcement 150 prescard
  const GLintelFourTwelvetons = GSLintelLength * 0.0;
  const GLintelFourTentons = GSLintelLength * 0.0;
  const GLintelFourBindingWire = GSLintelLength * 0.0;
  const GLintelFourLabourRequirement = GSLintelLength * 0.0;

  //angle
  const AngleLength = GSLintelLength * 2.0;
  const LabourRequirement = GSLintelLength * 0.01;

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

      {reinforcementType === "Ground beams" ? (
        statusOfConstruction === "Moderately Swampy without footing" ? (
          <p className="text-black">
            Reinforcement requirement for a Ground beam of an average height of
            1m and width of 0.23m in{" "}
            <strong>
              {" "}
              {reinforcementType} (average height of 1m and width 0.23m) area{" "}
            </strong>{" "}
            of Girth/ total length of{" "}
            <strong>{formatter.format(GSLintelLength)}m</strong> , you will
            require an estimated amount of{" "}
            <strong>{formatter.format(GModeratelySixtons)}</strong> tons of 16mm
            reinforcement as the main bars,{" "}
            <strong>{formatter.format(GModeratelyTwelvetons)}</strong> tons of
            12mm reinforcement as the runner,{" "}
            <strong>{formatter.format(GModeratelyTentons)}</strong> tons of 10mm
            reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(GModeratelyBindingWire)}</strong> roll(s)
            of binding wire. For labour requirement for this item of work,
            labours are usually paid per tonnage for the work done. Therefore,
            the total estimated amount of tons used for this work item is{" "}
            <strong>{formatter.format(GModeratelyLabourRequirement)}</strong>{" "}
            tons. This may be multiplied by the applicable per ton rate. You may
            refer to our material and labour price list/rates.
          </p>
        ) : statusOfConstruction === "Non-Swampy" ? (
          <p className="text-black">
            Reinforcement requirement for a Ground beam of an average height of
            1m and width of 0.23m in{" "}
            <strong>
              {" "}
              {reinforcementType} (average height of 1m and width 0.23m) area{" "}
            </strong>{" "}
            of Girth/ total length of{" "}
            <strong>{formatter.format(GSLintelLength)}m</strong> , you will
            require an estimated amount of{" "}
            <strong>{formatter.format(GNonSwampySixtons)}</strong> tons of 16mm
            reinforcement as the main bars,{" "}
            <strong>{formatter.format(GNonSwampyTwelvetons)}</strong> tons of
            12mm reinforcement as the runner,{" "}
            <strong>{formatter.format(GNonSwampyTentons)}</strong> tons of 10mm
            reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(GNonSwampyBindingWire)}</strong> roll(s)
            of binding wire. For labour requirement for this item of work,
            labours are usually paid per tonnage for the work done. Therefore,
            the total estimated amount of tons used for this work item is{" "}
            <strong>{formatter.format(GNonSwampyLabourRequirement)}</strong>{" "}
            tons. This may be multiplied by the applicable per ton rate. You may
            refer to our material and labour price list/rates.
          </p>
        ) : (
          <p className="text-black">
            Reinforcement requirement for a Ground beam of an average height of
            1m and width of 0.23m in{" "}
            <strong>
              {" "}
              {reinforcementType} (average height of 1m and width 0.23m) area{" "}
            </strong>{" "}
            of Girth/ total length of{" "}
            <strong>{formatter.format(GSLintelLength)}m</strong> , you will
            require an estimated amount of{" "}
            <strong>{formatter.format(GWithFloodingSixtons)}</strong> tons of
            16mm reinforcement as the main bars,{" "}
            <strong>{formatter.format(GWithFloodingTwelvetons)}</strong> tons of
            12mm reinforcement as the runner,{" "}
            <strong>{formatter.format(GWithFloodingTentons)}</strong> tons of
            10mm reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(GWithFloodingBindingWire)}</strong>{" "}
            roll(s) of binding wire. For labour requirement for this item of
            work, labours are usually paid per tonnage for the work done.
            Therefore, the total estimated amount of tons used for this work
            item is{" "}
            <strong>{formatter.format(GWithFloodingLabourRequirement)}</strong>{" "}
            tons. This may be multiplied by the applicable per ton rate. You may
            refer to our material and labour price list/rates.
          </p>
        )
      ) : reinforcementType === "Suspected beams" ? (
        <p className="text-black">
          Reinforcement requirement for a Suspended beam of an average height of
          1m and width of 0.23m of Girth/ total length of{" "}
          <strong>{formatter.format(GSLintelLength)}m</strong> you will require
          an estimated amount of{" "}
          <strong>{formatter.format(GSuspendedBeamSixtons)}</strong> tons of
          16mm reinforcement as the main bars,{" "}
          <strong>{formatter.format(GSuspendedBeamTentons)}</strong> tons of
          10mm reinforcement as the stirrups/rings and{" "}
          <strong>{formatter.format(GSuspendedBeamBindingWire)}</strong> roll(s)
          of binding wire. For labour requirement for this item of work, labours
          are usually paid per tonnage for the work done. Therefore, the total
          estimated amount of tons used for this work item is{" "}
          <strong>{formatter.format(GSuspendedBeamLabourRequirement)}</strong>{" "}
          tons. This may be multiplied by the applicable per ton rate. You may
          refer to our material and labour price list/rates.
        </p>
      ) : reinforcementType === "Column" ? (
        // columnStatus
        columnStatus === "225mm x225mm column sizes" ? (
          <p className="text-black">
            requirement for a Column of column size{" "}
            <strong>{columnStatus}</strong> which has a total height of{" "}
            <strong>{formatter.format(ColumnHeight)}m</strong> and consisting of{" "}
            <strong>{formatter.format(ColumntotalNos)} nos</strong>, you will
            require an estimated amount of{" "}
            <strong>{formatter.format(CModeratelySixtons)} </strong> tons of
            16mm reinforcement as the main bars,{" "}
            <strong>{formatter.format(CModeratelyTentons)}</strong> tons of 10mm
            reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(CModeratelyBindinCWire)} roll(s)</strong>{" "}
            of binding wire. For labour requirement for this item of work,
            labours are usually paid per tonnage for the work done. Therefore,
            the total estimated amount of tons used for this work item is{" "}
            <strong>{formatter.format(CModeratelyLabourRequirement)}</strong>{" "}
            tons. This may be multiplied by the applicable per ton rate. You may
            refer to our material and labour price list/rates.
          </p>
        ) : columnStatus === "225mm x 450mm column sizes" ? (
          <p className="text-black">
            requirement for a Column of column size{" "}
            <strong>{columnStatus}</strong> which has a total height of{" "}
            <strong>{formatter.format(ColumnHeight)}m</strong> and consisting of{" "}
            <strong>{formatter.format(ColumntotalNos)} nos</strong>, you will
            require an estimated amount of{" "}
            <strong>{formatter.format(CSixtons)} </strong> tons of 16mm
            reinforcement as the main bars,{" "}
            <strong>{formatter.format(CTentons)}</strong> tons of 10mm
            reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(CBindinCWire)} roll(s)</strong> of binding
            wire. For labour requirement for this item of work, labours are
            usually paid per tonnage for the work done. Therefore, the total
            estimated amount of tons used for this work item is{" "}
            <strong>{formatter.format(CLabourRequirement)}</strong> tons. This
            may be multiplied by the applicable per ton rate. You may refer to
            our material and labour price list/rates.
          </p>
        ) : (
          <p className="text-black">
            requirement for a Column of column size{" "}
            <strong>{columnStatus}</strong> which has a total height of{" "}
            <strong>{formatter.format(ColumnHeight)}m</strong> and consisting of{" "}
            <strong>{formatter.format(ColumntotalNos)} nos</strong>, you will
            require an estimated amount of{" "}
            <strong>{formatter.format(CModeratelySixtons)} </strong> tons of
            16mm reinforcement as the main bars,{" "}
            <strong>{formatter.format(CModeratelyTentons)}</strong> tons of 10mm
            reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(CModeratelyBindinCWire)} roll(s)</strong>{" "}
            of binding wire. For labour requirement for this item of work,
            labours are usually paid per tonnage for the work done. Therefore,
            the total estimated amount of tons used for this work item is{" "}
            <strong>{formatter.format(CModeratelyLabourRequirement)}</strong>{" "}
            tons. This may be multiplied by the applicable per ton rate. You may
            refer to our material and labour price list/rates.
          </p>
        )
      ) : reinforcementType === "Slabs" ? (
        <p className="text-black">
          Reinforcement requirement for a Slab/ Suspended slab where the{" "}
          <strong> {columnStatus} </strong> ans the area of the slab is{" "}
          <strong>{formatter.format(SlapArea)}m<sup>2</sup></strong>, you will require an
          estimated amount of{" "}
          <strong>{formatter.format(SlapThelvetons)}tons</strong>  of 12mm
          reinforcement and {" "}
          <strong>{formatter.format(SlapBindinCWire)}roll(s)</strong>  of
          binding wire. For labour requirement for this item of work, labours
          are usually paid per tonnage for the work done. Therefore, the total
          estimated amount of tons used for this work item is{" "}
          <strong>{formatter.format(SlapLabourRequirement)}tons</strong>. This
          may be multiplied by the applicable per ton rate. You may refer to our
          material and labour price list/rates.
        </p>
      ) : lintelType === "Reinforcement" ? (
        lintelROptions === "in situ casted (width 225mm)" ? (
          <p className="text-black">
            Reinforcement requirement for a Lintel of *Lintel approach and size*
            which has a total Length of{" "}
            <strong>{formatter.format(GSLintelLength)}m</strong> you will
            require an estimated amount of{" "}
            <strong>{formatter.format(GLintelOneTwelvetons)}</strong> tons of
            12mm reinforcement as the main bars,{" "}
            <strong>{formatter.format(GLintelOneTentons)}</strong> tons of 10mm
            reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(GLintelOneBindingWire)}</strong> roll(s)
            of binding wire. For labour requirement for this item of work,
            labours are usually paid per tonnage for the work done. Therefore,
            the total estimated amount of tons used for this work item is
            <strong>
              {formatter.format(GLintelOneLabourRequirement)}
            </strong>{" "}
            tons. This may be multiplied by the applicable per ton rate. You may
            refer to our material and labour price list/rates.
          </p>
        ) : lintelROptions === "in situ casted (width 150mm)" ? (
          <p className="text-black">
            Reinforcement requirement for a Lintel of *Lintel approach and size*
            which has a total Length of{" "}
            <strong>{formatter.format(GSLintelLength)}m</strong> you will
            require an estimated amount of{" "}
            <strong>{formatter.format(GLintelTwoTwelvetons)}</strong> tons of
            12mm reinforcement as the main bars,{" "}
            <strong>{formatter.format(GLintelTwoTentons)}</strong> tons of 10mm
            reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(GLintelTwoBindingWire)}</strong> roll(s)
            of binding wire. For labour requirement for this item of work,
            labours are usually paid per tonnage for the work done. Therefore,
            the total estimated amount of tons used for this work item is
            <strong>
              {formatter.format(GLintelTwoLabourRequirement)}
            </strong>{" "}
            tons. This may be multiplied by the applicable per ton rate. You may
            refer to our material and labour price list/rates.
          </p>
        ) : lintelROptions === "in situ casted (width 150mm)" ? (
          <p className="text-black">
            Reinforcement requirement for a Lintel of *Lintel approach and size*
            which has a total Length of{" "}
            <strong>{formatter.format(GSLintelLength)}m</strong> you will
            require an estimated amount of{" "}
            <strong>{formatter.format(GLintelThreeTwelvetons)}</strong> tons of
            12mm reinforcement as the main bars,{" "}
            <strong>{formatter.format(GLintelThreeTentons)}</strong> tons of
            10mm reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(GLintelThreeBindingWire)}</strong> roll(s)
            of binding wire. For labour requirement for this item of work,
            labours are usually paid per tonnage for the work done. Therefore,
            the total estimated amount of tons used for this work item is
            <strong>
              {formatter.format(GLintelThreeLabourRequirement)}
            </strong>{" "}
            tons. This may be multiplied by the applicable per ton rate. You may
            refer to our material and labour price list/rates.
          </p>
        ) : (
          <p className="text-black">
            Reinforcement requirement for a Lintel of *Lintel approach and size*
            which has a total Length of{" "}
            <strong>{formatter.format(GSLintelLength)}m</strong> you will
            require an estimated amount of{" "}
            <strong>{formatter.format(GLintelFourTwelvetons)}</strong> tons of
            12mm reinforcement as the main bars,{" "}
            <strong>{formatter.format(GLintelFourTentons)}</strong> tons of 10mm
            reinforcement as the stirrups/rings and{" "}
            <strong>{formatter.format(GLintelFourBindingWire)}</strong> roll(s)
            of binding wire. For labour requirement for this item of work,
            labours are usually paid per tonnage for the work done. Therefore,
            the total estimated amount of tons used for this work item is
            <strong>
              {formatter.format(GLintelFourLabourRequirement)}
            </strong>{" "}
            tons. This may be multiplied by the applicable per ton rate. You may
            refer to our material and labour price list/rates.
          </p>
        )
      ) : (
        <p className="text-black">
          Angle Iron requirement for a Lintel which has a total Length of{" "}
          <strong>{formatter.format(GSLintelLength)}m</strong>, you will require
          an estimated amount of{" "}
          <strong>{formatter.format(AngleLength)}m</strong>. This will take a 1
          man labour an estimated number of{" "}
          <strong>{formatter.format(LabourRequirement)}</strong> days. Please
          note 1construction day = 9 Hours
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

export default Reinforcement;
