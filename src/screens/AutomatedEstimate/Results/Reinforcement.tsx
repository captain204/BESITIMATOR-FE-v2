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

      setReinforcementType(
        localStorage.getItem("Where-you-need-your-reinforcement-for") || ""
      );

      setLintelType(
        localStorage.getItem("material-used-for-your-lintel") || ""
      );

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

  const Guage = Area * 0.35;
  const Bituminous = Area * 1.15;
  const manLabour = Area * 0.0;

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
        <p className="text-black">
          Reinforcement requirement for a Ground beam of an average height of 1m
          and width of 0.23m in *Ground beam (average height of 1m and width
          0.23m) area* of Girth/ total length of *Girth/total Length (m)* m, you
          will require an estimated amount of *16mm (tons)* tons of 16mm
          reinforcement as the main bars, *12mm (tons)* tons of 12mm
          reinforcement as the runner, *10mm (tons)* tons of 10mm reinforcement
          as the stirrups/rings and *Binding wire (20kg) roll* roll(s) of
          binding wire. For labour requirement for this item of work, labours
          are usually paid per tonnage for the work done. Therefore, the total
          estimated amount of tons used for this work item is *Labour
          requirement* tons. This may be multiplied by the applicable per ton
          rate. You may refer to our material and labour price list/rates.
        </p>
      ) : reinforcementType === "Suspected beams" ? (
        <p className="text-black">
          Reinforcement requirement for a Suspended beam of an average height of
          1m and width of 0.23m of Girth/ total length of *Girth/total Length
          (m)* m, you will require an estimated amount of *16mm (tons)* tons of
          16mm reinforcement as the main bars, *10mm (tons)* tons of 10mm
          reinforcement as the stirrups/rings and *Binding wire (20kg) roll*
          roll(s) of binding wire. For labour requirement for this item of work,
          labours are usually paid per tonnage for the work done. Therefore, the
          total estimated amount of tons used for this work item is *Labour
          requirement* tons. This may be multiplied by the applicable per ton
          rate. You may refer to our material and labour price list/rates.
        </p>
      ) : reinforcementType === "Column" ? (
        <p className="text-black">
          Reinforcement requirement for a Column of column size *Column Size*
          which has a total height of *Total Height (m)* m and consisting of
          *Nos of Columns* nos, you will require an estimated amount of *16mm
          (tons)* tons of 16mm reinforcement as the main bars, *10mm (tons)*
          tons of 10mm reinforcement as the stirrups/rings and *Binding wire
          (20kg) roll* roll(s) of binding wire. For labour requirement for this
          item of work, labours are usually paid per tonnage for the work done.
          Therefore, the total estimated amount of tons used for this work item
          is *Labour requirement* tons. This may be multiplied by the applicable
          per ton rate. You may refer to our material and labour price
          list/rates.
        </p>
      ) : reinforcementType === "Slabs" ? (
        <p className="text-black">
          Reinforcement requirement for a Slab/ Suspended slab where the *size
          of slab* ans the area of the slab is *Area (m2)* m2, you will require
          an estimated amount of *12mm (tons)* tons of 12mm reinforcement and
          *Binding wire (20kg) roll* roll(s) of binding wire. For labour
          requirement for this item of work, labours are usually paid per
          tonnage for the work done. Therefore, the total estimated amount of
          tons used for this work item is *Labour requirement* tons. This may be
          multiplied by the applicable per ton rate. You may refer to our
          material and labour price list/rates.
        </p>
      ) : lintelType === "Reinforcement" ? (
        <p className="text-black">
          Reinforcement requirement for a Lintel of *Lintel approach and size*
          which has a total Length of *Total Length (m)* m, you will require an
          estimated amount of *12mm (tons)* tons of 12mm reinforcement as the
          main bars, *10mm (tons)* tons of 10mm reinforcement as the
          stirrups/rings and *Binding wire (20kg) roll* roll(s) of binding wire.
          For labour requirement for this item of work, labours are usually paid
          per tonnage for the work done. Therefore, the total estimated amount
          of tons used for this work item is *Labour requirement* tons. This may
          be multiplied by the applicable per ton rate. You may refer to our
          material and labour price list/rates.
        </p>
      ) : (
        <p className="text-black">
          Angle Iron requirement for a Lintel which has a total Length of *Total
          Length (m)* m, you will require an estimated amount of *Angle Iron
          Length (m)* m. This will take a 1 man labour an estimated number of *1
          man labour out put per day (days)* days. Please note 1construction day
          = 9 Hours
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
