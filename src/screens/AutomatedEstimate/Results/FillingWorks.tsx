import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Excavation: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [lengthToBeShored, setLengthToBeShored] = useState("");
  const [excavationIn, setExcavationIn] = useState("");
  const [filling, setFilling] = useState("");
  const [data, setData] = useState({
    ItemOfWork: "",
    ExcavationInputs: {
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
      const storedSettingOutInputs = JSON.parse(
        localStorage.getItem("Filling Works Inputs") || "{}"
      );

      const FillingLevellingInputs = JSON.parse(
        localStorage.getItem("FillingLevellingForm  Inputs") || "{}"
      );

      const fillingworks = localStorage.getItem("Filling-works") || "";

      setData({
        ItemOfWork: localStorage.getItem("ItemOfWork") || "",
        ExcavationInputs: {
          ...data.ExcavationInputs,
          ...storedSettingOutInputs,
        },
      });

      setDataa({
        fillingLevelling: {
          ...dataa.fillingLevelling,
          ...FillingLevellingInputs,
        },
      });

      setFilling(fillingworks);
      setLengthToBeShored(lengthToBeShored);
      setExcavationIn(excavationIn);
    }
  }, [dispatch]);

  const { ExcavationInputs } = data;
  const { fillingLevelling } = dataa;

  const convertlevellingToMeters = (value: number) =>
    dataa.fillingLevelling.unit === "Millimetres" ? value / 1000 : value;

  // Convert mm to meters if unit is Millimetres
  const convertToMeters = (value: number) =>
    data.ExcavationInputs.unit === "Millimetres" ? value / 1000 : value;

  const convertedLevelingInputs = {
    length: convertlevellingToMeters(fillingLevelling.length),
    breadth: convertlevellingToMeters(fillingLevelling.breadth),
    area:
      dataa.fillingLevelling.unit === "Millimetres"
        ? fillingLevelling.area / 1000_000 // Convert mm³ to m³
        : fillingLevelling.area,
  };

  const convertedInputs = {
    sitePerimeter: convertToMeters(ExcavationInputs.sitePerimeter),
    depth: convertToMeters(ExcavationInputs.depth),
    height: convertToMeters(ExcavationInputs.height),
    length: convertToMeters(ExcavationInputs.length),
    radius: convertToMeters(ExcavationInputs.radius),
    width: convertToMeters(ExcavationInputs.width),
    type: ExcavationInputs.type,
    volume:
      data.ExcavationInputs.unit === "Millimetres"
        ? ExcavationInputs.volume / 1000_000_000 // Convert mm³ to m³
        : ExcavationInputs.volume,
  };

  const Area =
    convertedLevelingInputs.breadth * convertedLevelingInputs.length ||
    convertedLevelingInputs.area;

  const manLabourLeveling = Area * 0.00;

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

  // Ensure volume is always a number
  const formatter = new Intl.NumberFormat();

  const volume = Number(calculateVolume()) || 0;
  const formattedVolume = formatter.format(volume); // Formatting the volume

  //filling with sharp sand
  const fillingWithSharpSandNoOfTons = formatter.format(volume * 2.59);
  const fillingWithSharpSandManLabour = formatter.format(volume * 0.17);
  const fillingWithSharpSandManLabourtwo = formatter.format(volume * 0.2);
  const fillingWithSharpSandPreliminaryRequired = "Wheel barrow and Shovel";

  //filling with  sand
  const fillingWithSandNoOfTons = formatter.format(volume * 2.68);
  const fillingWithSandManLabour = formatter.format(volume * 0.18);
  const fillingWithSandManLabourtwo = formatter.format(volume * 0.21);
  const fillingWithSandPreliminaryRequired = "Wheel barrow and Shovel";

  //filling with  laterite
  const fillingWithLateriteNoOfTons = formatter.format(volume * 2.83);
  const fillingWithLateriteManLabour = formatter.format(volume * 0.19);
  const fillingWithLateriteManLabourtwo = formatter.format(volume * 0.22);
  const fillingWithLateritePreliminaryRequired = "Wheel barrow and Shovel";

  //filling with  hardcore
  const fillingWithHardcoreNoOfTons = formatter.format(volume * 2.14);
  const fillingWithHardcoreManLabour = formatter.format(volume * 0.27);
  const fillingWithHardcoreManLabourtwo = formatter.format(volume * 0.33);
  const fillingWithHardcorePreliminaryRequired = "Wheel barrow and Shovel";

  //filling with  rubbles
  const fillingWithRubblesNoOfTons = formatter.format(volume * 2.59);
  const fillingWithRubblesManLabour = formatter.format(volume * 0.2);
  const fillingWithRubblesManLabourtwo = formatter.format(volume * 0.22);
  const fillingWithRubblesPreliminaryRequired =
    "Wheel barrow, Shovel and mabe digger";

  //filling with  stone
  const fillingWithStoneNoOfTons = formatter.format(volume * 2.5);
  const fillingWithStoneManLabour = formatter.format(volume * 0.17);
  const fillingWithStoneManLabourtwo = formatter.format(volume * 0.19);
  const fillingWithStonePreliminaryRequired =
    "Wheel barrow, Shovel and mabe digger";

  //filling with  dust
  const fillingWithDustNoOfTons = formatter.format(volume * 2.59);
  const fillingWithDustManLabour = formatter.format(volume * 0.17);
  const fillingWithDustManLabourtwo = formatter.format(volume * 0.22);
  const fillingWithDustPreliminaryRequired = "Wheel barrow andShovel";

  const response = useSelector((state: RootState) => state.getUser.response);

  return (
    <div className="md:w-full w-80 ">
      <h1 className="text-2xl font-bold text-black mb-4">Excavation Result</h1>
      <p className="text-black text-xl mb-5">
        Hi <strong>{response?.name}</strong>,
      </p>

      {filling === "Filling with Sharp sand" ? (
        <p className="text-black mb-4">
          To fill{" "}
          <strong>
            {formattedVolume}m<sup>3</sup>
          </strong>{" "}
          of <strong>{filling}</strong>, you will require an estimated amount of
          <strong> {fillingWithSharpSandNoOfTons} tons</strong>. This will
          however require 1 man labour an estimated number of{" "}
          <strong> {fillingWithSharpSandManLabour} </strong> days if the
          distance to drop off point is with 10meters and will require 1 man
          labour an estimated number of{" "}
          <strong>{fillingWithSharpSandManLabourtwo}</strong> if the distance to
          drop off point is within 10-20meters using{" "}
          <strong>{fillingWithSharpSandPreliminaryRequired}</strong> to achieve
          this filling work. However, ifformattedVolume of filling is more than
          150 cubic meter, it is advised to mechanise the process using a
          payloader (with stable filling land area, a payloader with tyre, with
          unstable filling land area or moderately water logged filling land
          area – Payloader with tracks which will require a lowbed Truck to
          transport) as it’s a more cost effective and time saving approach.
          Although adopting manual labour may require a platform for ease of
          movement.
        </p>
      ) : filling === "Filling with filling sand" ? (
        <p className="text-black mb-4">
          To fill{" "}
          <strong>
            {formattedVolume}m<sup>3</sup>
          </strong>{" "}
          of <strong>{filling}</strong>, you will require an estimated amount of
          <strong> {fillingWithSandNoOfTons} tons</strong>. This will however
          require 1 man labour an estimated number of{" "}
          <strong> {fillingWithSandManLabour} </strong> days if the distance to
          drop off point is with 10meters and will require 1 man labour an
          estimated number of <strong>{fillingWithSandManLabourtwo}</strong> if
          the distance to drop off point is within 10-20meters using{" "}
          <strong>{fillingWithSandPreliminaryRequired}</strong> to achieve this
          filling work. However, ifformattedVolume of filling is more than 150
          cubic meter, it is advised to mechanise the process using a payloader
          (with stable filling land area, a payloader with tyre, with unstable
          filling land area or moderately water logged filling land area –
          Payloader with tracks which will require a lowbed Truck to transport)
          as it’s a more cost effective and time saving approach. Although
          adopting manual labour may require a platform for ease of movement.
        </p>
      ) : filling === "Filling with laterite filling sand" ? (
        <p className="text-black mb-4">
          const fillingWithLateriteNoOfTons = formatter.format(volume * 2.83);
          const fillingWithLateriteManLabour = formatter.format(volume * 0.19);
          const fillingWithLateriteManLabourtwo = formatter.format(volume *
          0.22); const fillingWithLateritePreliminaryRequired = "Wheel barrow
          and Shovel"; To fill{" "}
          <strong>
            {formattedVolume}m<sup>3</sup>
          </strong>{" "}
          of <strong>{filling}</strong>, you will require an estimated amount of
          <strong> {fillingWithLateriteNoOfTons} tons</strong>. This will
          however require 1 man labour an estimated number of{" "}
          <strong> {fillingWithLateriteManLabour} </strong> days if the distance
          to drop off point is with 10meters and will require 1 man labour an
          estimated number of <strong>{fillingWithLateriteManLabourtwo}</strong>{" "}
          if the distance to drop off point is within 10-20meters using{" "}
          <strong>{fillingWithLateritePreliminaryRequired}</strong> to achieve
          this filling work. However, ifformattedVolume of filling is more than
          150 cubic meter, it is advised to mechanise the process using a
          payloader (with stable filling land area, a payloader with tyre, with
          unstable filling land area or moderately water logged filling land
          area – Payloader with tracks which will require a lowbed Truck to
          transport) as it’s a more cost effective and time saving approach.
          Although adopting manual labour may require a platform for ease of
          movement.
        </p>
      ) : filling === "Filling with Hardcore" ? (
        <p className="text-black mb-4">
          To fill{" "}
          <strong>
            {formattedVolume}m<sup>3</sup>
          </strong>{" "}
          of <strong>{filling}</strong>, you will require an estimated amount of
          <strong> {fillingWithHardcoreNoOfTons} tons</strong>. This will
          however require 1 man labour an estimated number of{" "}
          <strong> {fillingWithHardcoreManLabour} </strong> days if the distance
          to drop off point is with 10meters and will require 1 man labour an
          estimated number of <strong>{fillingWithHardcoreManLabourtwo}</strong>{" "}
          if the distance to drop off point is within 10-20meters using{" "}
          <strong>{fillingWithHardcorePreliminaryRequired}</strong> to achieve
          this filling work. However, ifformattedVolume of filling is more than
          150 cubic meter, it is advised to mechanise the process using a
          payloader (with stable filling land area, a payloader with tyre, with
          unstable filling land area or moderately water logged filling land
          area – Payloader with tracks which will require a lowbed Truck to
          transport) as it’s a more cost effective and time saving approach.
          Although adopting manual labour may require a platform for ease of
          movement.
        </p>
      ) : filling === "Filling with rubbles" ? (
        <p className="text-black mb-4">
          To fill{" "}
          <strong>
            {formattedVolume}m<sup>3</sup>
          </strong>{" "}
          of <strong>{filling}</strong>, you will require an estimated amount of
          <strong> {fillingWithRubblesNoOfTons} tons</strong>. This will however
          require 1 man labour an estimated number of{" "}
          <strong> {fillingWithRubblesManLabour} </strong> days if the distance
          to drop off point is with 10meters and will require 1 man labour an
          estimated number of <strong>{fillingWithRubblesManLabourtwo}</strong>{" "}
          if the distance to drop off point is within 10-20meters using{" "}
          <strong>{fillingWithRubblesPreliminaryRequired}</strong> to achieve
          this filling work. However, ifformattedVolume of filling is more than
          150 cubic meter, it is advised to mechanise the process using a
          payloader (with stable filling land area, a payloader with tyre, with
          unstable filling land area or moderately water logged filling land
          area – Payloader with tracks which will require a lowbed Truck to
          transport) as it’s a more cost effective and time saving approach.
          Although adopting manual labour may require a platform for ease of
          movement.
        </p>
      ) : filling === "Filling with stone base " ? (
        <p className="text-black mb-4">
          To fill{" "}
          <strong>
            {formattedVolume}m<sup>3</sup>
          </strong>{" "}
          of <strong>{filling}</strong>, you will require an estimated amount of
          <strong> {fillingWithStoneNoOfTons} tons</strong>. This will however
          require 1 man labour an estimated number of{" "}
          <strong> {fillingWithStoneManLabour} </strong> days if the distance to
          drop off point is with 10meters and will require 1 man labour an
          estimated number of <strong>{fillingWithStoneManLabourtwo}</strong> if
          the distance to drop off point is within 10-20meters using{" "}
          <strong>{fillingWithStonePreliminaryRequired}</strong> to achieve this
          filling work. However, ifformattedVolume of filling is more than 150
          cubic meter, it is advised to mechanise the process using a payloader
          (with stable filling land area, a payloader with tyre, with unstable
          filling land area or moderately water logged filling land area –
          Payloader with tracks which will require a lowbed Truck to transport)
          as it’s a more cost effective and time saving approach. Although
          adopting manual labour may require a platform for ease of movement.
        </p>
      ) : filling === "Filling with stone dust filling" ? (
        <p className="text-black mb-4">
          To fill{" "}
          <strong>
            {formattedVolume}m<sup>3</sup>
          </strong>{" "}
          of <strong>{filling}</strong>, you will require an estimated amount of
          <strong> {fillingWithSharpSandNoOfTons} tons</strong>. This will
          however require 1 man labour an estimated number of{" "}
          <strong> {fillingWithSharpSandManLabour} </strong> days if the
          distance to drop off point is with 10meters and will require 1 man
          labour an estimated number of{" "}
          <strong>{fillingWithSharpSandManLabourtwo}</strong> if the distance to
          drop off point is within 10-20meters using{" "}
          <strong>{fillingWithSharpSandPreliminaryRequired}</strong> to achieve
          this filling work. However, ifformattedVolume of filling is more than
          150 cubic meter, it is advised to mechanise the process using a
          payloader (with stable filling land area, a payloader with tyre, with
          unstable filling land area or moderately water logged filling land
          area – Payloader with tracks which will require a lowbed Truck to
          transport) as it’s a more cost effective and time saving approach.
          Although adopting manual labour may require a platform for ease of
          movement.
        </p>
      ) : (
        <p className="text-black mb-4">
          To fill{" "}
          <strong>
            {formattedVolume}m<sup>3</sup>
          </strong>{" "}
          of <strong>{filling}</strong>, you will require an estimated amount of
          <strong> {fillingWithDustNoOfTons} tons</strong>. This will however
          require 1 man labour an estimated number of{" "}
          <strong> {fillingWithDustManLabour} </strong> days if the distance to
          drop off point is with 10meters and will require 1 man labour an
          estimated number of <strong>{fillingWithDustManLabourtwo}</strong> if
          the distance to drop off point is within 10-20meters using{" "}
          <strong>{fillingWithDustPreliminaryRequired}</strong> to achieve this
          filling work. However, ifformattedVolume of filling is more than 150
          cubic meter, it is advised to mechanise the process using a payloader
          (with stable filling land area, a payloader with tyre, with unstable
          filling land area or moderately water logged filling land area –
          Payloader with tracks which will require a lowbed Truck to transport)
          as it’s a more cost effective and time saving approach. Although
          adopting manual labour may require a platform for ease of movement.
        </p>
      )}

      {filling === "Levelling and compacting" ? (
        <div>
          <h3>Spreading, Levelling and Compacting:</h3>
          <p>
            To spread properly, level and compact the area just filled which is
            <strong>{formatter.format(Area)}m2</strong>, it will require a 1 man
            labour an estimated number of {manLabourLeveling}
            days using a to achieve this task. However, in low budget
            circumstances, rope lines may be used to take even levels across the
            area to be levelled and compacted if a dumpy/auto level is
            unavailable. Also, for site areas that will be subjected to heavy
            load user and high traffic passage (road and compound areas), it is
            usually preferable to use roller compactors instead of plate
            compactors that may be used in less load user and low traffic
            passage area.
          </p>
        </div>
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

export default Excavation;
