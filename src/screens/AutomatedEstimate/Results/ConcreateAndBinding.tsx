import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ConcreteAndBlinding: React.FC = () => {

  const dispatch: AppDispatch = useDispatch();

  const response = useSelector((state: RootState) => state.getUser.response);

  useEffect(() => {
    {
      dispatch(getUser());
    }
  }, [dispatch]);

  const [settings, setSettings] = useState<any>({
    volumeOfConcrete: "1",
    areaForConcrete: "Floor",
    concreteGrade: "M25",
    cementBags: "10",
    sandTons: "5",
    graniteTons: "8",
    preliminaryRequired: "Shovel, Wheelbarrow, Vibrator",
    labourOutputPerM3: "3",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setSettings({
        volumeOfConcrete: localStorage.getItem("volumeOfConcrete") || "1",
        areaForConcrete: localStorage.getItem("areaForConcrete") || "Floor",
        concreteGrade: localStorage.getItem("concreteGrade") || "M25",
        cementBags: localStorage.getItem("cementBags") || "10",
        sandTons: localStorage.getItem("sandTons") || "5",
        graniteTons: localStorage.getItem("graniteTons") || "8",
        preliminaryRequired:
          localStorage.getItem("preliminaryRequired") ||
          "Shovel, Wheelbarrow, Vibrator",
        labourOutputPerM3: localStorage.getItem("labourOutputPerM3") || "3",
      });
    }
  }, []);

  const {
    volumeOfConcrete,
    areaForConcrete,
    concreteGrade,
    cementBags,
    sandTons,
    graniteTons,
    preliminaryRequired,
    labourOutputPerM3,
  } = settings;

  // const userName = "User Name";

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">
        Concrete and Blinding Work Result
      </h1>
      <p className="text-black">
        Hi <strong className="font-bold">{response?.name}</strong>,
      </p>
      <p className="text-black mb-4">
        To cast a concrete/blinding work of{" "}
        <strong>{volumeOfConcrete} cubic. M</strong>, at{" "}
        <strong>{areaForConcrete}</strong> area, using a Grade/concrete mix of{" "}
        <strong>{concreteGrade}</strong>, you will require an estimated amount
        of <strong>{cementBags} bags</strong> of cement,{" "}
        <strong>{sandTons} tons</strong> of sand (Fine Aggregate), and{" "}
        <strong>{graniteTons} tons</strong> of Granite (Coarse aggregate). The
        preliminary required to achieve this will be{" "}
        <strong>{preliminaryRequired}</strong>. However, it is usually advised
        to get a concrete mixer to achieve an even mix of the concrete
        constituents. In cases when the volume of concrete to be casted is less
        than 8 cubic. M, hand mixing may be adopted.
      </p>
      <div className="text-black mb-4">
        <p>
          <strong>{volumeOfConcrete} cubic. M</strong> volume of concrete will
          require an estimated number of{" "}
          <strong>{labourOutputPerM3} man power</strong>, which may include
          Bricklayers, Forwarders (for large volume of concrete), Backwarders
          (for large volume of concrete), and Machine operators. To avoid
          extensive numbers of labour and to mechanise the process for better
          efficiency and speed, you may require a concrete pump.
        </p>
        <p>
          Additionally, ready-mixed concretes are available for purchase at
          specific rates. Please refer to our material and labour price
          list/rates.
        </p>
      </div>
      <p className="text-black mb-6">
        Please note:
        <ul className="list-disc ml-6">
          <li>1 construction day = 9 Hours</li>
          <li>1 concrete mixer will cast = 40-50m3 in 1 construction day.</li>
        </ul>
        You can check our{" "}
        <Link
          href="/pricing"
          className="text-blue-900 underline"
        >
          material and labour price list/rates
        </Link>{" "}
        for applicable rates for your project.
      </p>
    </div>
  );
};

export default ConcreteAndBlinding;
