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

  const [BeamColumndata, setFormworkBeamdata] = useState({
    formWorkBeamInputsData: {
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

      const BeamFormworkInputs = JSON.parse(
        localStorage.getItem("GroundBeamSuspendedFormworkForm Inputs") || "{}"
      );

      setcolumnStatus(localStorage.getItem("Slabs-Slaps") || "");

      setSizeOfSlap;
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
            <strong>{formatter.format(GupFootstandsMarineBorad)} Nos</strong> and if
            using 1” x 12” (25mm x 300mm) plank,{" "}
            <strong>{formatter.format(GupFootstandsWoodone)}nos </strong>. Also, you
            require an estimated amount of{" "}
            <strong>{formatter.format(GupFootstandsWoodTwo)} nos</strong> of 2” x 3”
            (50mm x 75mm) wood,{" "}
            <strong>{formatter.format(GupFootstandsPegs)}</strong>
            Bundles of Wooden pegs,{" "}
            <strong>{formatter.format(GupFootstandsNail)}kg</strong> of 4’’ and 5”
            sized wooden nails and{" "}
            <strong>{formatter.format(GupFootstandsBindingwire)} roll(s)</strong>
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
        <p className="text-black">
          Formwork requirement for *Area of Work* of an Area of *Area of
          Formwork(m2)* m2, you will require an estimated amount of; If using
          marine boards, *Marine Board (Nos)* Nos and if using 1” x 12” (25mm x
          300mm) plank, *1 x 12 wood (nos)* nos. Also, you require an estimated
          amount of *2 x 3 Woods (nos)* nos of 2” x 3” (50mm x 75mm) wood, *2” x
          4” Wood (nos) * nos of 2” x 4” (50mm x 100mm) wood, *Nail (kg) 3”, 4”
          and 5” size (kg)* kg of 3”, 4’’ and 5” sized wooden nails and
          *Acro-props/bamboo (nos)* nos of Acroprops or bamboo. However, in the
          cases of unframed structures, you may require little or next to no
          Acro-props or bamboo because the bottom of the beams are supported by
          blockworks. For labour requirement for this item of work, labours may
          be paid per Lin. m for the work done. Therefore, the total length for
          this work item is *Labour requirement* m. This may be multiplied by
          the applicable cost per m rate – you may refer here (link to material
          and labour price list/rates). Alternatively, if decided to pay the
          manpower for this job per day, it will take an estimated number of *1
          carpenter and Labour output per day (days)* days for 1 carpenter and a
          labour to complete this task. .
        </p>
      ) : reinformworkType === "Column" ? (
        // columnStatus

        <p className="text-black">
          Formwork requirement for a Column of column size *Column Size* which
          has a total area of *Area of formwork(m2)* m2 and consisting of *Nos
          of Columns* nos, you will require an estimated amount of; If using
          marine. boards, *Marine Board (Nos)* Nos, if using 1” x 12” (25mm x
          300mm) plank, *1 x 12 wood (nos)* nos and if using column boxes
          *column boxes* nos of same sized boxes. Also, you require an estimated
          amount of *2 x 3 Woods (nos)* nos of 2” x 3” (50mm x 75mm) wood to
          form boxes if using marine board and column boxes, *Nail (kg) 4” and
          5” size (kg)* kg of 4’’ and 5” sized wooden nails and *2x6 wood of
          50mm x 200mm wood (nos)* nos of 2” x 6” (50mm x 200mm) wood as side
          supports or shoring. However, in the cases of using column boxes or 1”
          x 12” plank, you may require *Binding wire* rolls of binding wire for
          extra bracing. For labour requirement for this item of work, labours
          may be paid per column for the work done. Therefore, the total nos of
          column for this work item is *Labour requirement (per column)* nos.
          This may be multiplied by the applicable cost per m column – you may
          refer here (link to material and labour price list/rates).
          Alternatively, if decided to pay the manpower for this job per day, it
          will take an estimated number of *1 carpenter and Labour output per
          day (days)* days for 1 carpenter and a labour to complete this task.
        </p>
      ) : reinformworkType === "Slabs" ? (
        <p className="text-black">
          Formwork requirement for *Area of Work* of an Area of *Area of
          Formwork(m2)* m2 and or *perimeter of slab* m for the sides, you will
          require an estimated amount of; If using marine boards, *Marine Board
          (Nos)* Nos and if using 1” x 12” (25mm x 300mm) plank, *1 x 12 wood
          (nos)* nos. Also, you require an estimated amount of *2 x 3 Woods
          (nos)* nos of 2” x 3” (50mm x 75mm) wood spaced at 40mm c/c, *2” x 4”
          Wood (nos) * nos of 2” x 4” (50mm x 100mm) wood spaced at 600mm c/c ,
          *Nail (kg) 3”, 4” and 5” size (kg)* kg of 3”, 4’’ and 5” sized wooden
          nails and if using acro props as support, *Acro-props (nos)* nos and
          if using Bamboo as support, * bamboo (nos)* nos of bamboo. For labour
          requirement for this item of work, labours may be paid per sqm for
          work done. Therefore, the total area for this work item is *Labour
          requirement per m2* m2. This may be multiplied by the applicable cost
          per m2 rate – you may refer here (link to material and labour price
          list/rates). Alternatively, if decided to pay the manpower for this
          job per day, it will take an estimated number of *1 carpenter and
          Labour output per day (days)* days for 1 carpenter and a labour to
          complete this t
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
