import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Formwork: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [itemsOfWork, selectItemOfwork] = useState("");
  const [reinformworkType, setFormWorkType] = useState("");
  const [lintelType, setLintelType] = useState("");
  const [FormworkStatus, setFormworkStatus] = useState("");
  const [lintelROptions, setLintelROptions] = useState("");
  const [columnStatus, setcolumnStatus] = useState("");
  const [ccolumnStatus, setccolumnStatus] = useState("");
  const [suspended, setSuspended] = useState("");
  const [GroundSuspendedLintel, setGroundSuspendedLintel] = useState({
    GSLintel: {
      siteLength: 0,
      unit: "Metres",
    },
  });

  const [formWorkColumnData, setFormWorkColumnData] = useState({
    Columnformwork: {
      hight: 0,
      total: 0,
      perimetre: 0,
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

  const [BeamColumndata, setFormworkBeamdata] = useState({
    formWorkBeamInputsData: {
      breadth: 0,
      length: 0,
      area: 0,
      unit: "Metres",
    },
  });

  const [Slapdata, setSlapdata] = useState({
    SlapInputData: {
      breadth: 0,
      length: 0,
      area: 0,
      unit: "Metres",
      perimetre: 0,
    },
  });

  const [SuspendedFormworkdata, setSuspendedFormworkdata] = useState({
    formWorkSuspendedInputsData: {
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

      const SlapInputs = JSON.parse(
        localStorage.getItem("SlapsFormworkForm-Inputs") || "{}"
      );

      const coLumnFormworkInputs = JSON.parse(
        localStorage.getItem("formwork-Column Inputs") || "{}"
      );

      const BeamFormworkInputs = JSON.parse(
        localStorage.getItem("GroundBeamSuspendedFormworkForm Inputs") || "{}"
      );

      setcolumnStatus(localStorage.getItem("Slabs-Slaps") || "");
      setccolumnStatus(localStorage.getItem("formWorkColumnStatus") || "");

      // Suspended-beams-formework
      // // setSizeOfSlap;
      // Slabs-Slaps

      setFormWorkType(
        localStorage.getItem("Formwork/Carpentry-works-sub") || ""
      );

      setLintelType(
        localStorage.getItem("material-used-for-your-lintel") || ""
      );

      setFormworkStatus(localStorage.getItem("(a)Ground Beams") || "");

      const GSLintelInputs = JSON.parse(
        localStorage.getItem("Reinforcement/Iron bending works Inputs") || "{}"
      );

      setLintelROptions(
        localStorage.getItem("Lintel-reinforcement-option") || ""
      );

      setSuspended(localStorage.getItem("Suspended-beams-formework") || "");
      //setSuspended

      setGroundSuspendedLintel({
        GSLintel: {
          ...GroundSuspendedLintel.GSLintel,
          ...GSLintelInputs,
        },
      });

      setSlapdata({
        SlapInputData: {
          ...Slapdata.SlapInputData,
          ...SlapInputs,
        },
      });

      setFormWorkColumnData({
        Columnformwork: {
          ...formWorkColumnData.Columnformwork,
          ...coLumnFormworkInputs,
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

      setFormworkBeamdata({
        formWorkBeamInputsData: {
          ...BeamColumndata.formWorkBeamInputsData,
          ...BeamFormworkInputs,
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

  const { formWorkBeamInputsData } = BeamColumndata;

  const { Columnformwork } = formWorkColumnData;

  //Slapdata
  const { SlapInputData } = Slapdata;

  const SlapToMeters = (value: number) =>
    Slapdata.SlapInputData.unit === "Millimetres" ? value / 1000 : value;

  const convertedSlapInputs = {
    length: SlapToMeters(SlapInputData.length),
    breadth: SlapToMeters(SlapInputData.breadth),
    perimetre: SlapToMeters(SlapInputData.perimetre),
    area:
      Slapdata.SlapInputData.unit === "Millimetres"
        ? SlapInputData.area / 1000_000 // Convert mm³ to m³
        : SlapInputData.area,
  };

  const slapArea = convertedSlapInputs.area;
  const slapPerimetre = convertedSlapInputs.perimetre;

  const SlapMarineBored = slapArea * 0.36;
  const SlapWoodone = slapArea * 1.05;
  const SlapWoodTwo = slapArea * 0.83;
  const SlapWoodThree = slapArea * 0.61;
  const SlapBoxes = slapArea * 1.0;
  const SlapNail = slapArea * 0.19;
  const SlapBindingwire = slapArea * 0.02;
  const SlapLabour = slapArea * 1.0;
  const SlapLabourCapenter = slapArea * 0.03;
  const SlapAcro = slapArea * 1.13;
  const BamboSlap = slapArea * 1.85;

  const convertColumnformworkToMeters = (value: number) =>
    formWorkColumnData.Columnformwork.unit === "Millimetres"
      ? value / 1000
      : value;

  const ColumnHight = convertColumnformworkToMeters(Columnformwork.hight);
  const ColumnTotal = convertColumnformworkToMeters(Columnformwork.total);
  const Perimetre = convertColumnformworkToMeters(Columnformwork.perimetre);
  const AreaOFColumFormwork = Perimetre * ColumnHight * ColumnTotal;

  const AreaOFColumMarineBored = AreaOFColumFormwork * 0.36;
  const AreaOFColumWoodone = AreaOFColumFormwork * 1.05;
  const AreaOFColumWoodTwo = AreaOFColumFormwork * 3.49;
  const AreaOFColumWoodThree = AreaOFColumFormwork * 4.0;
  const AreaOFColumBoxes = AreaOFColumFormwork * 1.0;
  const AreaOFColumNail = AreaOFColumFormwork * 0.19;
  const AreaOFColumBindingwire = AreaOFColumFormwork * 0.02;
  const AreaOFColumLabour = AreaOFColumFormwork * 1.0;
  const AreaOFColumLabourCapenter = AreaOFColumFormwork * 0.04;

  const AreaOFSecondColumMarineBored = AreaOFColumFormwork * 0.36;
  const AreaOFSecondColumWoodone = AreaOFColumFormwork * 1.05;
  const AreaOFSecondColumWoodTwo = AreaOFColumFormwork * 3.49;
  const AreaOFSecondColumWoodThree = AreaOFColumFormwork * 4.0;
  const AreaOFSecondColumBoxes = AreaOFColumFormwork * 1.0;
  const AreaOFSecondColumNail = AreaOFColumFormwork * 0.19;
  const AreaOFSecondColumBindingwire = AreaOFColumFormwork * 0.02;
  const AreaOFSecondColumLabour = AreaOFColumFormwork * 1.0;
  const AreaOFSecondColumLabourCapenter = AreaOFColumFormwork * 0.05;

  const AreaOFThirdColumMarineBored = AreaOFColumFormwork * 0.36;
  const AreaOFThirdColumWoodone = AreaOFColumFormwork * 1.05;
  const AreaOFThirdColumWoodTwo = AreaOFColumFormwork * 3.49;
  const AreaOFThirdColumWoodThree = AreaOFColumFormwork * 4.0;
  const AreaOFThirdColumBoxes = AreaOFColumFormwork * 1.0;
  const AreaOFThirdColumNail = AreaOFColumFormwork * 0.19;
  const AreaOFThirdColumBindingwire = AreaOFColumFormwork * 0.02;
  const AreaOFThirdColumLabour = AreaOFColumFormwork * 1.0;
  const AreaOFThirdColumLabourCapenter = AreaOFColumFormwork * 0.06;

  const AreaOFFouthColumMarineBored = AreaOFColumFormwork * 0.18;
  const AreaOFFouthColumWoodone = AreaOFColumFormwork * 1.53;
  const AreaOFFouthColumWoodTwo = AreaOFColumFormwork * 3.49;
  const AreaOFFouthColumWoodThree = AreaOFColumFormwork * 4.0;
  const AreaOFFouthColumBoxes = AreaOFColumFormwork * 1.0;
  const AreaOFFouthColumNail = AreaOFColumFormwork * 0.19;
  const AreaOFFouthColumBindingwire = AreaOFColumFormwork * 0.02;
  const AreaOFFouthColumLabour = AreaOFColumFormwork * 1.0;
  const AreaOFFouthColumLabourCapenter = AreaOFColumFormwork * 0.06;

  const AreaOFFifthColumMarineBored = AreaOFColumFormwork * 0.18;
  const AreaOFFifthColumWoodone = AreaOFColumFormwork * 2.11;
  const AreaOFFifthColumWoodTwo = AreaOFColumFormwork * 3.49;
  const AreaOFFifthColumWoodThree = AreaOFColumFormwork * 4.0;
  const AreaOFFifthColumBoxes = AreaOFColumFormwork * 1.0;
  const AreaOFFifthColumNail = AreaOFColumFormwork * 0.19;
  const AreaOFFifthColumBindingwire = AreaOFColumFormwork * 0.02;
  const AreaOFFifthColumLabour = AreaOFColumFormwork * 1.0;
  const AreaOFFifthColumLabourCapenter = AreaOFColumFormwork * 0.06;

  const AreaOFSixthColumMarineBored = AreaOFColumFormwork * 0.18;
  const AreaOFSixthColumWoodone = AreaOFColumFormwork * 0.53;
  const AreaOFSixthColumWoodTwo = AreaOFColumFormwork * 3.49;
  const AreaOFSixthColumWoodThree = AreaOFColumFormwork * 4.0;
  const AreaOFSixthColumBoxes = AreaOFColumFormwork * 1.0;
  const AreaOFSixthColumNail = AreaOFColumFormwork * 0.19;
  const AreaOFSixthColumBindingwire = AreaOFColumFormwork * 0.02;
  const AreaOFSixthColumLabour = AreaOFColumFormwork * 1.0;
  const AreaOFSixthColumLabourCapenter = AreaOFColumFormwork * 0.06;

  // hight: 0,
  // total: 0,
  // perimetre: 0

  const convertFormworkColumnToMeters = (value: number) =>
    BeamColumndata.formWorkBeamInputsData.unit === "Millimetres"
      ? value / 1000
      : value;

  ///columbeam formwork

  const convertedFormworkColumInputs = {
    length: convertFormworkColumnToMeters(formWorkBeamInputsData.length),
    breadth: convertFormworkColumnToMeters(formWorkBeamInputsData.breadth),
    area:
      BeamColumndata.formWorkBeamInputsData.unit === "Millimetres"
        ? formWorkBeamInputsData.area / 1000_000 // Convert mm³ to m³
        : formWorkBeamInputsData.area,
  };

  const FormworkColumnArea =
    convertedFormworkColumInputs.breadth *
      convertedFormworkColumInputs.length || convertedFormworkColumInputs.area;

  // GroundBeam upstands
  const GupstandsMarineBorad = FormworkColumnArea * 0.36;
  const GupstandsWoodone = FormworkColumnArea * 1.05;
  const GupstandsWoodTwo = FormworkColumnArea * 2.14;
  const GupstandsPegs = FormworkColumnArea * 0.07;
  const GupstandsNail = FormworkColumnArea * 0.19;
  const GupstandsBindingwire = FormworkColumnArea * 0.02;
  const GupstandsLabour = FormworkColumnArea * 1.0;
  const GupstandsLabourCapenter = FormworkColumnArea * 0.05;

  //GroundBeam footing

  const GupFootstandsMarineBorad = FormworkColumnArea * 0.36;
  const GupFootstandsWoodone = FormworkColumnArea * 1.05;
  const GupFootstandsWoodTwo = FormworkColumnArea * 2.14;
  const GupFootstandsPegs = FormworkColumnArea * 0.07;
  const GupFootstandsNail = FormworkColumnArea * 0.19;
  const GupFootstandsBindingwire = FormworkColumnArea * 0.02;
  const GupFootstandsLabour = FormworkColumnArea * 1.0;
  const GupFootstandsLabourCapenter = FormworkColumnArea * 0.05;

  //suspendedBeam

  const SuspendedMarineBorad = FormworkColumnArea * 0.36;
  const SuspendedWoodone = FormworkColumnArea * 1.05;
  const SuspendedWoodTwo = FormworkColumnArea * 3.0;
  const SuspendedWoodThree = FormworkColumnArea * 1.76;
  // const SuspendedPegs = FormworkColumnArea * 0.07;
  const SuspendedNail = FormworkColumnArea * 0.19;

  // const SuspendedLabour = FormworkColumnArea * 1.0;
  const SuspendedLabourCapenter = FormworkColumnArea * 0.07;
  const AcroProps = FormworkColumnArea * 4.8;

  const SSuspendedMarineBorad = FormworkColumnArea * 0.36;
  const SSuspendedWoodone = FormworkColumnArea * 1.05;
  const SSuspendedWoodTwo = FormworkColumnArea * 2.0;
  const SSuspendedWoodThree = FormworkColumnArea * 0.4;
  // const SuspendedPegs = FormworkColumnArea * 0.07;
  const SSuspendedNail = FormworkColumnArea * 0.19;
  // const SuspendedLabour = FormworkColumnArea * 1.0;
  const SSuspendedLabourCapenter = FormworkColumnArea * 0.04;
  const SAcroProps = FormworkColumnArea * 0.0;

  // const SlapThelvetons = SlapArea * 0.02;
  // const SlapBindinCWire = SlapArea * 0.00003;
  // const SlapLabourRequirement = SlapArea * 0.02;

  // const SlapThelveTwotons = SlapArea * 0.02;
  // const SlapBindinTwoWire = SlapArea * 0.00003;
  // const SlapLabourTwoRequirement = SlapArea * 0.02;

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

      {reinformworkType === "Ground beams" ? (
        FormworkStatus === "Ground Beams Upstands" ? (
          <p className="text-black">
            Formwork requirement for <strong>{FormworkStatus}</strong> of an
            Area of{" "}
            <strong>
              {formatter.format(FormworkColumnArea)} m<sup>2</sup>
            </strong>
            , you will require an estimated amount of; If using marine boards,{" "}
            <strong>{formatter.format(GupstandsMarineBorad)} Nos</strong> and if
            using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(GupstandsWoodone)}nos </strong>. Also, you
            require an estimated amount of{" "}
            <strong>{formatter.format(GupstandsWoodTwo)} nos</strong> of 2” x 3”
            (50mm x 75mm) wood,{" "}
            <strong>{formatter.format(GupstandsPegs)}</strong>
            Bundles of Wooden pegs,{" "}
            <strong>{formatter.format(GupstandsNail)}kg</strong> of 4’’ and 5”
            sized wooden nails and{" "}
            <strong>{formatter.format(GupstandsBindingwire)} roll(s)</strong>
            of binding wire. For labour requirement for this item of work,
            labours may be paid per sq. m for the work done. Therefore, the
            total area for this work item is{" "}
            <strong>
              {formatter.format(GupstandsLabour)}m<sup>3</sup>
            </strong>{" "}
            . This may be multiplied by the applicable cost per m2 rate – you
            may refer here (link to material and labour price list/rates).
            Alternatively, if decided to pay the manpower for this job per day,
            it will take an estimated number of{" "}
            <strong>{GupstandsLabourCapenter}</strong>
            days for 1 carpenter and a labour to complete this task. You may
            refer to our material and labour price list/rates.
          </p>
        ) : (
          <p className="text-black">
            Formwork requirement for <strong>{FormworkStatus}</strong> of an
            Area of{" "}
            <strong>
              {formatter.format(FormworkColumnArea)} m<sup>2</sup>
            </strong>
            , you will require an estimated amount of; If using marine boards,{" "}
            <strong>{formatter.format(GupFootstandsMarineBorad)} Nos</strong>{" "}
            and if using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(GupFootstandsWoodone)}nos </strong>. Also,
            you require an estimated amount of{" "}
            <strong>{formatter.format(GupFootstandsWoodTwo)} nos</strong> of 2”
            x 3” (50mm x 75mm) wood,{" "}
            <strong>{formatter.format(GupFootstandsPegs)}</strong>
            Bundles of Wooden pegs,{" "}
            <strong>{formatter.format(GupFootstandsNail)}kg</strong> of 4’’ and
            5” sized wooden nails and{" "}
            <strong>
              {formatter.format(GupFootstandsBindingwire)} roll(s)
            </strong>
            of binding wire. For labour requirement for this item of work,
            labours may be paid per sq. m for the work done. Therefore, the
            total area for this work item is{" "}
            <strong>
              {formatter.format(GupFootstandsLabour)}m<sup>3</sup>
            </strong>{" "}
            . This may be multiplied by the applicable cost per m2 rate – you
            may refer here (link to material and labour price list/rates).
            Alternatively, if decided to pay the manpower for this job per day,
            it will take an estimated number of{" "}
            <strong>{GupFootstandsLabourCapenter}</strong>
            days for 1 carpenter and a labour to complete this task. You may
            refer to our material and labour price list/rates.
          </p>
        )
      ) : reinformworkType === "Suspended beams" ? (
        suspended === "framed structure av. Height 300mm" ? (
          <p className="text-black">
            Formwork requirement for <strong>{FormworkStatus}</strong> of an
            Area of {formatter.format(FormworkColumnArea)} m<sup>2</sup>, you
            will require an estimated amount of; If using marine boards,{" "}
            <strong>{formatter.format(SuspendedMarineBorad)} Nos</strong> and if
            using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(SuspendedWoodone)}nos</strong>. Also, you
            require an estimated amount of{" "}
            <strong>{formatter.format(SuspendedWoodTwo)}nos</strong> of 2” x 3”
            (50mm x 75mm) wood,{" "}
            <strong>{formatter.format(SuspendedWoodThree)}nos</strong> of 2” x
            4” (50mm x 100mm) wood,{" "}
            <strong>{formatter.format(SuspendedNail)}</strong> kg of 3”, 4’’ and
            5” sized wooden nails and
            <strong>{formatter.format(AcroProps)}nos</strong> of Acroprops or
            bamboo. However, in the cases of unframed structures, you may
            require little or next to no Acro-props or bamboo because the bottom
            of the beams are supported by blockworks. For labour requirement for
            this item of work, labours may be paid per Lin. m for the work done.
            Therefore, the total length for this work item is *Labour
            requirement* m. This may be multiplied by the applicable cost per m
            rate – you may refer here (link to material and labour price
            list/rates). Alternatively, if decided to pay the manpower for this
            job per day, it will take an estimated number of{" "}
            <strong>{formatter.format(SuspendedLabourCapenter)} days</strong>{" "}
            for 1 carpenter and a labour to complete this task. .
          </p>
        ) : (
          <p className="text-black">
            Formwork requirement for <strong>{FormworkStatus}</strong> of an
            Area of {formatter.format(FormworkColumnArea)} m<sup>2</sup>, you
            will require an estimated amount of; If using marine boards,{" "}
            <strong>{formatter.format(SSuspendedMarineBorad)} Nos</strong> and
            if using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(SSuspendedWoodone)}nos</strong>. Also, you
            require an estimated amount of{" "}
            <strong>{formatter.format(SSuspendedWoodTwo)}nos</strong> of 2” x 3”
            (50mm x 75mm) wood,{" "}
            <strong>{formatter.format(SSuspendedWoodThree)}nos</strong> of 2” x
            4” (50mm x 100mm) wood,{" "}
            <strong>{formatter.format(SSuspendedNail)}</strong> kg of 3”, 4’’
            and 5” sized wooden nails and
            <strong>{formatter.format(SAcroProps)}nos</strong> of Acroprops or
            bamboo. However, in the cases of unframed structures, you may
            require little or next to no Acro-props or bamboo because the bottom
            of the beams are supported by blockworks. For labour requirement for
            this item of work, labours may be paid per Lin. m for the work done.
            Therefore, the total length for this work item is *Labour
            requirement* m. This may be multiplied by the applicable cost per m
            rate – you may refer here (link to material and labour price
            list/rates). Alternatively, if decided to pay the manpower for this
            job per day, it will take an estimated number of{" "}
            <strong>{formatter.format(SSuspendedLabourCapenter)} days</strong>{" "}
            for 1 carpenter and a labour to complete this task. .
          </p>
        )
      ) : reinformworkType === "Column" ? (
        // columnStatus
        ccolumnStatus === "225mm x 225mm in framed structure " ? (
          <p className="text-black">
            Formwork requirement for a Column of column size{" "}
            <strong>{ccolumnStatus}</strong> which has a total area of{" "}
            <strong>
              {formatter.format(AreaOFColumFormwork)}m<sup>2</sup>
            </strong>{" "}
            and consisting of{" "}
            <strong> {formatter.format(ColumnTotal)} nos</strong>, you will
            require an estimated amount of; If using marine. boards,{" "}
            <strong>{formatter.format(AreaOFColumMarineBored)}Nos</strong> , if
            using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(AreaOFColumWoodone)}nos</strong> and if
            using column boxes{" "}
            <strong>{formatter.format(AreaOFColumBoxes)}nos</strong> of same
            sized boxes. Also, you require an estimated amount of{" "}
            <strong>{formatter.format(AreaOFColumWoodTwo)} nos</strong>
            of 2” x 3” (50mm x 75mm) wood to form boxes if using marine board
            and column boxes,{" "}
            <strong>{formatter.format(AreaOFColumNail)}</strong> kg of 4’’ and
            5” sized wooden nails and{" "}
            <strong>{formatter.format(AreaOFColumWoodThree)}nos</strong> of 2” x
            6” (50mm x 200mm) wood as side supports or shoring. However, in the
            cases of using column boxes or 1” x 12” plank, you may require
            <strong>{formatter.format(AreaOFColumBindingwire)} rolls</strong> of
            binding wire for extra bracing. For labour requirement for this item
            of work, labours may be paid per column for the work done.
            Therefore, the total nos of column for this work item is{" "}
            <strong>{formatter.format(AreaOFColumLabour)}</strong> nos. This may
            be multiplied by the applicable cost per m column – you may refer
            here (link to material and labour price list/rates). Alternatively,
            if decided to pay the manpower for this job per day, it will take an
            estimated number of{" "}
            <strong>{formatter.format(AreaOFColumLabourCapenter)} days</strong>{" "}
            for 1 carpenter and a labour to complete this task.
          </p>
        ) : ccolumnStatus === "225mm x 450mm in framed structure" ? (
          <p className="text-black">
            Formwork requirement for a Column of column size *Column Size* which
            has a total area of{" "}
            <strong>
              {formatter.format(AreaOFColumFormwork)}m<sup>2</sup>
            </strong>{" "}
            and consisting of{" "}
            <strong> {formatter.format(ColumnTotal)} nos</strong>, you will
            require an estimated amount of; If using marine. boards,{" "}
            <strong>{formatter.format(AreaOFSecondColumMarineBored)}Nos</strong>{" "}
            , if using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(AreaOFSecondColumWoodone)}nos</strong> and
            if using column boxes{" "}
            <strong>{formatter.format(AreaOFSecondColumBoxes)}nos</strong> of
            same sized boxes. Also, you require an estimated amount of{" "}
            <strong>{formatter.format(AreaOFSecondColumWoodTwo)} nos</strong>
            of 2” x 3” (50mm x 75mm) wood to form boxes if using marine board
            and column boxes,{" "}
            <strong>{formatter.format(AreaOFSecondColumNail)}</strong> kg of 4’’
            and 5” sized wooden nails and{" "}
            <strong>{formatter.format(AreaOFSecondColumWoodThree)}nos</strong>{" "}
            of 2” x 6” (50mm x 200mm) wood as side supports or shoring. However,
            in the cases of using column boxes or 1” x 12” plank, you may
            require
            <strong>
              {formatter.format(AreaOFSecondColumBindingwire)} rolls
            </strong>{" "}
            of binding wire for extra bracing. For labour requirement for this
            item of work, labours may be paid per column for the work done.
            Therefore, the total nos of column for this work item is{" "}
            <strong>{formatter.format(AreaOFSecondColumLabour)}</strong> nos.
            This may be multiplied by the applicable cost per m column – you may
            refer here (link to material and labour price list/rates).
            Alternatively, if decided to pay the manpower for this job per day,
            it will take an estimated number of{" "}
            <strong>
              {formatter.format(AreaOFSecondColumLabourCapenter)} days
            </strong>{" "}
            for 1 carpenter and a labour to complete this task.
          </p>
        ) : ccolumnStatus === "225mm x 450mm in unframed structure" ? (
          <p className="text-black">
            Formwork requirement for a Column of column size{" "}
            <strong>{ccolumnStatus}</strong> which has a total area of{" "}
            <strong>
              {formatter.format(AreaOFColumFormwork)}m<sup>2</sup>
            </strong>{" "}
            and consisting of{" "}
            <strong> {formatter.format(ColumnTotal)} nos</strong>, you will
            require an estimated amount of; If using marine. boards,{" "}
            <strong>{formatter.format(AreaOFThirdColumMarineBored)}Nos</strong>{" "}
            , if using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(AreaOFThirdColumWoodone)}nos</strong> and
            if using column boxes{" "}
            <strong>{formatter.format(AreaOFThirdColumBoxes)}nos</strong> of
            same sized boxes. Also, you require an estimated amount of{" "}
            <strong>{formatter.format(AreaOFThirdColumWoodTwo)} nos</strong>
            of 2” x 3” (50mm x 75mm) wood to form boxes if using marine board
            and column boxes,{" "}
            <strong>{formatter.format(AreaOFThirdColumNail)}</strong> kg of 4’’
            and 5” sized wooden nails and{" "}
            <strong>{formatter.format(AreaOFThirdColumWoodThree)}nos</strong> of
            2” x 6” (50mm x 200mm) wood as side supports or shoring. However, in
            the cases of using column boxes or 1” x 12” plank, you may require
            <strong>
              {formatter.format(AreaOFThirdColumBindingwire)} rolls
            </strong>{" "}
            of binding wire for extra bracing. For labour requirement for this
            item of work, labours may be paid per column for the work done.
            Therefore, the total nos of column for this work item is{" "}
            <strong>{formatter.format(AreaOFThirdColumLabour)}</strong> nos.
            This may be multiplied by the applicable cost per m column – you may
            refer here (link to material and labour price list/rates).
            Alternatively, if decided to pay the manpower for this job per day,
            it will take an estimated number of{" "}
            <strong>
              {formatter.format(AreaOFThirdColumLabourCapenter)} days
            </strong>{" "}
            for 1 carpenter and a labour to complete this task.
          </p>
        ) : ccolumnStatus === "225mm x 225mm in unframed structure" ? (
          <p className="text-black">
            Formwork requirement for a Column of column size{" "}
            <strong>{ccolumnStatus}</strong> which has a total area of{" "}
            <strong>
              {formatter.format(AreaOFColumFormwork)}m<sup>2</sup>
            </strong>{" "}
            and consisting of{" "}
            <strong> {formatter.format(ColumnTotal)} nos</strong>, you will
            require an estimated amount of; If using marine. boards,{" "}
            <strong>{formatter.format(AreaOFFouthColumMarineBored)}Nos</strong>{" "}
            , if using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(AreaOFFouthColumWoodone)}nos</strong> and
            if using column boxes{" "}
            <strong>{formatter.format(AreaOFFouthColumBoxes)}nos</strong> of
            same sized boxes. Also, you require an estimated amount of{" "}
            <strong>{formatter.format(AreaOFFouthColumWoodTwo)} nos</strong>
            of 2” x 3” (50mm x 75mm) wood to form boxes if using marine board
            and column boxes,{" "}
            <strong>{formatter.format(AreaOFFouthColumNail)}</strong> kg of 4’’
            and 5” sized wooden nails and{" "}
            <strong>{formatter.format(AreaOFFouthColumWoodThree)}nos</strong> of
            2” x 6” (50mm x 200mm) wood as side supports or shoring. However, in
            the cases of using column boxes or 1” x 12” plank, you may require
            <strong>
              {formatter.format(AreaOFFouthColumBindingwire)} rolls
            </strong>{" "}
            of binding wire for extra bracing. For labour requirement for this
            item of work, labours may be paid per column for the work done.
            Therefore, the total nos of column for this work item is{" "}
            <strong>{formatter.format(AreaOFFouthColumLabour)}</strong> nos.
            This may be multiplied by the applicable cost per m column – you may
            refer here (link to material and labour price list/rates).
            Alternatively, if decided to pay the manpower for this job per day,
            it will take an estimated number of{" "}
            <strong>
              {formatter.format(AreaOFFouthColumLabourCapenter)} days
            </strong>{" "}
            for 1 carpenter and a labour to complete this task.
          </p>
        ) : ccolumnStatus === "450mm x 450mm in unframed structure" ? (
          <p className="text-black">
            Formwork requirement for a Column of column size{" "}
            <strong>{ccolumnStatus}</strong> which has a total area of{" "}
            <strong>
              {formatter.format(AreaOFColumFormwork)}m<sup>2</sup>
            </strong>{" "}
            and consisting of{" "}
            <strong> {formatter.format(ColumnTotal)} nos</strong>, you will
            require an estimated amount of; If using marine. boards,{" "}
            <strong>{formatter.format(AreaOFFifthColumMarineBored)}Nos</strong>{" "}
            , if using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(AreaOFFifthColumWoodone)}nos</strong> and
            if using column boxes{" "}
            <strong>{formatter.format(AreaOFFifthColumBoxes)}nos</strong> of
            same sized boxes. Also, you require an estimated amount of{" "}
            <strong>{formatter.format(AreaOFFifthColumWoodTwo)} nos</strong>
            of 2” x 3” (50mm x 75mm) wood to form boxes if using marine board
            and column boxes,{" "}
            <strong>{formatter.format(AreaOFFifthColumNail)}</strong> kg of 4’’
            and 5” sized wooden nails and{" "}
            <strong>{formatter.format(AreaOFFifthColumWoodThree)}nos</strong> of
            2” x 6” (50mm x 200mm) wood as side supports or shoring. However, in
            the cases of using column boxes or 1” x 12” plank, you may require
            <strong>
              {formatter.format(AreaOFFifthColumBindingwire)} rolls
            </strong>{" "}
            of binding wire for extra bracing. For labour requirement for this
            item of work, labours may be paid per column for the work done.
            Therefore, the total nos of column for this work item is{" "}
            <strong>{formatter.format(AreaOFFifthColumLabour)}</strong> nos.
            This may be multiplied by the applicable cost per m column – you may
            refer here (link to material and labour price list/rates).
            Alternatively, if decided to pay the manpower for this job per day,
            it will take an estimated number of{" "}
            <strong>
              {formatter.format(AreaOFFifthColumLabourCapenter)} days
            </strong>{" "}
            for 1 carpenter and a labour to complete this task.
          </p>
        ) : (
          <p className="text-black">
            Formwork requirement for a Column of column size{" "}
            <strong>{ccolumnStatus}</strong> which has a total area of{" "}
            <strong>
              {formatter.format(AreaOFColumFormwork)}m<sup>2</sup>
            </strong>{" "}
            and consisting of{" "}
            <strong> {formatter.format(ColumnTotal)} nos</strong>, you will
            require an estimated amount of; If using marine. boards,{" "}
            <strong>{formatter.format(AreaOFSixthColumMarineBored)}Nos</strong>{" "}
            , if using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(AreaOFSixthColumWoodone)}nos</strong> and
            if using column boxes{" "}
            <strong>{formatter.format(AreaOFSixthColumBoxes)}nos</strong> of
            same sized boxes. Also, you require an estimated amount of{" "}
            <strong>{formatter.format(AreaOFSixthColumWoodTwo)} nos</strong>
            of 2” x 3” (50mm x 75mm) wood to form boxes if using marine board
            and column boxes,{" "}
            <strong>{formatter.format(AreaOFSixthColumNail)}</strong> kg of 4’’
            and 5” sized wooden nails and{" "}
            <strong>{formatter.format(AreaOFSixthColumWoodThree)}nos</strong> of
            2” x 6” (50mm x 200mm) wood as side supports or shoring. However, in
            the cases of using column boxes or 1” x 12” plank, you may require
            <strong>
              {formatter.format(AreaOFSixthColumBindingwire)} rolls
            </strong>{" "}
            of binding wire for extra bracing. For labour requirement for this
            item of work, labours may be paid per column for the work done.
            Therefore, the total nos of column for this work item is{" "}
            <strong>{formatter.format(AreaOFSixthColumLabour)}</strong> nos.
            This may be multiplied by the applicable cost per m column – you may
            refer here (link to material and labour price list/rates).
            Alternatively, if decided to pay the manpower for this job per day,
            it will take an estimated number of{" "}
            <strong>
              {formatter.format(AreaOFSixthColumLabourCapenter)} days
            </strong>{" "}
            for 1 carpenter and a labour to complete this task.
          </p>
        )
      ) : reinformworkType === "Slabs" ? (
        <p className="text-black">
          Formwork requirement for *Area of Work* of an Area of{" "}
          <strong>
            {formatter.format(slapArea)}m<sup>2</sup>
          </strong>
          m2 and or <strong>{formatter.format(slapPerimetre)}</strong> m for the
          sides, you will require an estimated amount of; If using marine
          boards, <strong>{formatter.format(SlapMarineBored)}Nos</strong>
          and if using 1” x 12” (25mm x 300mm) plank,{" "}
          <strong>{formatter.format(SlapWoodone)} nos</strong>. Also, you
          require an estimated amount of <strong>{SlapWoodTwo} nos</strong> of
          2” x 3” (50mm x 75mm) wood spaced at 40mm c/c,{" "}
          <strong>{formatter.format(SlapWoodThree)} nos</strong>
          of 2” x 4” (50mm x 100mm) wood spaced at 600mm c/c ,{" "}
          <strong>{formatter.format(SlapNail)}</strong> kg of 3”, 4’’ and 5”
          sized wooden nails and if using acro props as support,{" "}
          <strong>{formatter.format(SlapAcro)}</strong> nos and if using Bamboo
          as support, <strong>{formatter.format(BamboSlap)}</strong> nos of
          bamboo. For labour requirement for this item of work, labours may be
          paid per sqm for work done. Therefore, the total area for this work
          item is{" "}
          <strong>
            {SlapLabour}m<sup>2</sup>
          </strong>
          . This may be multiplied by the applicable cost per m2 rate – you may
          refer here (link to material and labour price list/rates).
          Alternatively, if decided to pay the manpower for this job per day, it
          will take an estimated number of{" "}
          <strong>{formatter.format(SlapLabourCapenter)}</strong> days for 1
          carpenter and a labour to complete this t
        </p>
      ) : reinformworkType === "Staircase" ? (
        <p>
          Formwork requirement for a staircase where its soffit of beam, flights
          and landing has an Area of *Area of Formwork(m2)* m2 and the sides of
          the flight and steps has a Total length of *Total length(m)* m, you
          will require an estimated amount of; If using marine boards, *Marine
          Board (Nos)* Nos and if using 1” x 12” (25mm x 300mm) plank, *1 x 12
          wood (nos)* nos. Also, you require an estimated amount of *2 x 3 Woods
          (nos)* nos of 2” x 3” (50mm x 75mm) wood, *Nail (kg) 4” and 5” size
          (kg)* kg of 4’’ and 5” sized wooden nails and if using acro props as
          support, *Acro-props (nos)* nos and if using Bamboo as support, *
          bamboo (nos)* nos of bamboo. For labour requirement for this item of
          work, labours may be paid as charges – Staircase from floor to Floor.
          You may refer here (link to material and labour price list/rates).
          Alternatively, if decided to pay the manpower for this job per day the
          daily rates for carpentry and Labour output may also be may be seen in
          material and labour pricelist/rates. (link to material and labour
          price list/rates).
        </p>
      ) : (
        <p>
          Formwork requirement for a Lintel of size *Lintel Size* which has a
          total width of *Width of opening(m)* m and consisting of *Total Nos*
          nos, you will require an estimated amount of; If using marine boards,
          *Marine Board (Nos)* Nos, if using 1” x 12” (25mm x 300mm) plank, *1 x
          12 wood (nos)* nos. Also, you require an estimated amount *Nail (kg)
          3” and 4” size (kg)* kg of 3’’ and 4” sized wooden nails and require
          *Binding wire* rolls of binding wire for extra bracing. For labour
          requirement for this item of work, labours may be paid per sq. m for
          the work done. Therefore, the total area for this work item is *Labour
          requirement m2* m2. This may be multiplied by the applicable cost per
          m2 – you may refer here (link to material and labour price
          list/rates).
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

export default Formwork;
