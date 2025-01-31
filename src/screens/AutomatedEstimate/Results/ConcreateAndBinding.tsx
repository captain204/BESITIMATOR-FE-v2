import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Excavation: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [mixType, setMixType] = useState("");
  const [whatarea, setWhatArea] = useState("");

  const [data, setData] = useState({
    ItemOfWork: "",
    ConcretInputs: {
      sitePerimeter: 0,
      unit: "Metres",
      depth: 0,
      height: 0,
      length: 0,
      radius: 0,
      width: 0,
      type: "Circular",
      volume: 0,
    },
  });

  useEffect(() => {
    dispatch(getUser());

    if (typeof window !== "undefined") {
      const concretInputs = JSON.parse(
        localStorage.getItem("Concrete-Binding works Inputs") || "{}"
      );

      const typeOfMix = localStorage.getItem("What-type-of-concrete-mix") || "";
      const whatArea =
        localStorage.getItem(" What-area-do-you-require-concrete-for") || "";

      setData({
        ItemOfWork: localStorage.getItem("ItemOfWork") || "",
        ConcretInputs: {
          ...data.ConcretInputs,
          ...concretInputs,
        },
      });
      setMixType(typeOfMix);
      setWhatArea(whatArea);
    }
  }, [dispatch]);

  const { ConcretInputs } = data;

  // Convert mm to meters if unit is Millimetres
  const convertToMeters = (value: number) =>
    data.ConcretInputs.unit === "Millimetres" ? value / 1000 : value;

  const convertedInputs = {
    sitePerimeter: convertToMeters(ConcretInputs.sitePerimeter),
    depth: convertToMeters(ConcretInputs.depth),
    height: convertToMeters(ConcretInputs.height),
    length: convertToMeters(ConcretInputs.length),
    radius: convertToMeters(ConcretInputs.radius),
    width: convertToMeters(ConcretInputs.width),
    type: ConcretInputs.type,
    volume:
      data.ConcretInputs.unit === "Millimetres"
        ? ConcretInputs.volume / 1000_000_000 // Convert mm³ to m³
        : ConcretInputs.volume,
  };

  // Calculate volume dynamically based on the type
  const calculateVolume = () => {
    if (convertedInputs.type === "Circular") {
      const calculatedVolume =
        3.14 * Math.pow(convertedInputs.radius, 2) * convertedInputs.height;
      return isNaN(calculatedVolume) || calculatedVolume <= 0
        ? convertedInputs.volume
        : calculatedVolume;
    } else if (convertedInputs.type === "Square or Rectangular") {
      const calculatedVolume =
        convertedInputs.length * convertedInputs.width * convertedInputs.depth;
      return isNaN(calculatedVolume) || calculatedVolume <= 0
        ? convertedInputs.volume
        : calculatedVolume;
    }
    return 0; // Default fallback for unsupported types
  };

  const formatter = new Intl.NumberFormat();

  const volume = Number(calculateVolume()) || 0;
  const formattedVolume = formatter.format(volume); // Formatting the volume

  //Grade M7.5(1:4:8)
  const gradeOneCementbags = formatter.format(volume * 3.0);
  const gradeOneSand = formatter.format(volume * 0.8);
  const gradeOnegranite = formatter.format(volume * 1.45);
  const gradeOnePreliminaryRequired = "Water, Shovels, Head Pan, Pok";
  const gradeOneLabourPerson = formatter.format(volume * 0.85);

  //Grade M10(1:3:6)

  const gradeTwoCementbags = formatter.format(volume * 4.0);
  const gradeTwoSand = formatter.format(volume * 0.75);
  const gradeTwogranite = formatter.format(volume * 1.38);
  const gradeTwoPreliminaryRequired = "Water, Shovels, Head Pan, Pok";
  const gradeTwoLabourPerson = formatter.format(volume * 0.85);

  //Grade M10(1:2:4)

  const gradeThreeCementbags = formatter.format(volume * 6.0);
  const gradeThreeSand = formatter.format(volume * 0.7);
  const gradeThreegranite = formatter.format(volume * 1.31);
  const gradeThreePreliminaryRequired = "Water, Shovels, Head Pan, Pok";

  //Grade M10(1:1:5:3)
  const gradeFourCementbags = formatter.format(volume * 8.0);
  const gradeFourSand = formatter.format(volume * 0.67);
  const gradeFourgranite = formatter.format(volume * 1.26);
  const gradeFourPreliminaryRequired = "Water, Shovels, Head Pan, Pok";

  //Grade M10(1:1:2)
  const gradeFiveCementbags = formatter.format(volume * 11.0);
  const gradeFiveSand = formatter.format(volume * 0.64);
  const gradeFivegranite = formatter.format(volume * 1.2);
  const gradeFivePreliminaryRequired = "Water, Shovels, Head Pan, Pok";

  const response = useSelector((state: RootState) => state.getUser.response);

  return (
    <div className="md:w-full w-80 ">
      <h1 className="text-2xl font-bold text-black mb-4">
        {data.ItemOfWork} Result
      </h1>
      <p className="text-black text-xl mb-5">
        Hi <strong>{response?.name}</strong>,
      </p>

      {mixType === "Grade M7.5(1:4:8)" ? (
        <>
          <p className="text-black mb-4">
            To cast a concrete/ Blinding work of{" "}
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M, at <strong>{whatarea}</strong> area, using a Grade/
            concrete mix of <strong>{mixType}</strong>, you will require an
            estimated amount of <strong>{gradeOneCementbags}</strong> bags of
            cement, <strong>{gradeOneSand}</strong> tons of sand (Fine
            Aggregate), <strong>{gradeOnegranite}</strong>
            tons of Granite (Coarse aggregate). The preliminary required to
            achieve this will be <strong>{gradeOnePreliminaryRequired}</strong>.
            However, it is usually advised to get a concrete mixer to achieve
            even mix of the concrete constituents and in other cases when the
            volume of concrete to be casted is less than 8 cubic. M, Hand mixing
            may be adopted.
          </p>
          <p className="text-black">
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M volume of concrete will require an estimated number of{" "}
            <strong>{gradeOneLabourPerson}</strong> man power, which will and
            may include- Bricklayers, Forwarders (when large volume of concrete
            is going on), Backwarders (when large volume of concrete is going
            on) and Machine operators. Also, to avoid the use of extensive
            numbers of labour and to mechanise the process better therby making
            it faster, you may require a concrete pump.
          </p>
        </>
      ) : mixType === "Grade M10(1:3:6)" ? (
        <>
          <p className="text-black mb-4">
            To cast a concrete/ Blinding work of{" "}
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M, at <strong>{whatarea}</strong> area, using a Grade/
            concrete mix of <strong>{mixType}</strong>, you will require an
            estimated amount of <strong>{gradeTwoCementbags}</strong> bags of
            cement, <strong>{gradeTwoSand}</strong> tons of sand (Fine
            Aggregate), <strong>{gradeTwogranite}</strong>
            tons of Granite (Coarse aggregate). The preliminary required to
            achieve this will be <strong>{gradeTwoPreliminaryRequired}</strong>.
            However, it is usually advised to get a concrete mixer to achieve
            even mix of the concrete constituents and in other cases when the
            volume of concrete to be casted is less than 8 cubic. M, Hand mixing
            may be adopted.
          </p>
          <p className="text-black">
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M volume of concrete will require an estimated number of
            <strong>{gradeOneLabourPerson}</strong> man power, which will and
            may include- Bricklayers, Forwarders (when large volume of concrete
            is going on), Backwarders (when large volume of concrete is going
            on) and Machine operators. Also, to avoid the use of extensive
            numbers of labour and to mechanise the process better therby making
            it faster, you may require a concrete pump.
          </p>
        </>
      ) : mixType === "Grade M10(1:2:4)" ? (
        <>
          <p className="text-black mb-4">
            To cast a concrete/ Blinding work of{" "}
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M, at <strong>{whatarea}</strong> area, using a Grade/
            concrete mix of <strong>{mixType}</strong>, you will require an
            estimated amount of <strong>{gradeThreeCementbags}</strong> bags of
            cement, <strong>{gradeThreeSand}</strong> tons of sand (Fine
            Aggregate), <strong>{gradeThreegranite}</strong>
            tons of Granite (Coarse aggregate). The preliminary required to
            achieve this will be{" "}
            <strong>{gradeThreePreliminaryRequired}</strong>. However, it is
            usually advised to get a concrete mixer to achieve even mix of the
            concrete constituents and in other cases when the volume of concrete
            to be casted is less than 8 cubic. M, Hand mixing may be adopted.
          </p>
          <p className="text-black">
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M volume of concrete will require an estimated number of
            <strong>{gradeOneLabourPerson}</strong> man power, which will and
            may include- Bricklayers, Forwarders (when large volume of concrete
            is going on), Backwarders (when large volume of concrete is going
            on) and Machine operators. Also, to avoid the use of extensive
            numbers of labour and to mechanise the process better therby making
            it faster, you may require a concrete pump.
          </p>
        </>
      ) : mixType === "Grade M10(1:1:5:3)" ? (
        <>
          <p className="text-black mb-4">
            To cast a concrete/ Blinding work of{" "}
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M, at <strong>{whatarea}</strong> area, using a Grade/
            concrete mix of <strong>{mixType}</strong>, you will require an
            estimated amount of <strong>{gradeFourCementbags}</strong> bags of
            cement, <strong>{gradeFourSand}</strong> tons of sand (Fine
            Aggregate), <strong>{gradeFourgranite}</strong>
            tons of Granite (Coarse aggregate). The preliminary required to
            achieve this will be <strong>{gradeFourPreliminaryRequired}</strong>
            . However, it is usually advised to get a concrete mixer to achieve
            even mix of the concrete constituents and in other cases when the
            volume of concrete to be casted is less than 8 cubic. M, Hand mixing
            may be adopted.
          </p>
          <p className="text-black">
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M volume of concrete will require an estimated number of
            <strong>{gradeOneLabourPerson}</strong> man power, which will and
            may include- Bricklayers, Forwarders (when large volume of concrete
            is going on), Backwarders (when large volume of concrete is going
            on) and Machine operators. Also, to avoid the use of extensive
            numbers of labour and to mechanise the process better therby making
            it faster, you may require a concrete pump.
          </p>
        </>
      ) : (
        <>
          <p className="text-black mb-4">
            To cast a concrete/ Blinding work of{" "}
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M, at <strong>{whatarea}</strong> area, using a Grade/
            concrete mix of <strong>{mixType}</strong>, you will require an
            estimated amount of <strong>{gradeFiveCementbags}</strong> bags of
            cement, <strong>{gradeFiveSand}</strong> tons of sand (Fine
            Aggregate), <strong>{gradeFivegranite}</strong>
            tons of Granite (Coarse aggregate). The preliminary required to
            achieve this will be <strong>{gradeFivePreliminaryRequired}</strong>
            . However, it is usually advised to get a concrete mixer to achieve
            even mix of the concrete constituents and in other cases when the
            volume of concrete to be casted is less than 8 cubic. M, Hand mixing
            may be adopted.
          </p>
          <p className="text-black">
            <strong>
              {formattedVolume}m<sup>3</sup>
            </strong>{" "}
            cubic. M volume of concrete will require an estimated number of
            <strong>{gradeOneLabourPerson}</strong> man power, which will and
            may include- Bricklayers, Forwarders (when large volume of concrete
            is going on), Backwarders (when large volume of concrete is going
            on) and Machine operators. Also, to avoid the use of extensive
            numbers of labour and to mechanise the process better therby making
            it faster, you may require a concrete pump.
          </p>
        </>
      )}

      <p className="text-black mb-6">
        Note: 1 construction day = 9 hours. <br />1 concrete mixer will cast =
        40- 50m3 in 1 construction day. You can check our{" "}
        <Link href="/pricing" className="text-blue-900 underline">
          material and labour price list/rates
        </Link>{" "}
        for applicable rates for your project.
      </p>
    </div>
  );
};

export default Excavation;
