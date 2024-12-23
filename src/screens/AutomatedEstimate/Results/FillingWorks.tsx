import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FillingWorks: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    volumeOfExcavation: "1",
    fillingMaterial: "Sand",
    tonsRequired: "10",
    labourOutput10m: "1",
    labourOutput10to20m: "2",
    preliminaryRequired: "Shovel, Wheelbarrow",
    areaToCompact: "100",
    labourOutputForCompacting: "1",
  });

  const dispatch: AppDispatch = useDispatch();

  const response = useSelector((state: RootState) => state.getUser.response);

  useEffect(() => {
    {
      dispatch(getUser());
    }
  }, [dispatch]);


  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setSettings({
        volumeOfExcavation: localStorage.getItem("volumeOfExcavation") || "1",
        fillingMaterial: localStorage.getItem("fillingMaterial") || "Sand",
        tonsRequired: localStorage.getItem("tonsRequired") || "10",
        labourOutput10m: localStorage.getItem("labourOutput10m") || "1",
        labourOutput10to20m: localStorage.getItem("labourOutput10to20m") || "2",
        preliminaryRequired:
          localStorage.getItem("preliminaryRequired") || "Shovel, Wheelbarrow",
        areaToCompact: localStorage.getItem("areaToCompact") || "100",
        labourOutputForCompacting:
          localStorage.getItem("labourOutputForCompacting") || "1",
      });
    }
  }, []);

  const {
    volumeOfExcavation,
    fillingMaterial,
    tonsRequired,
    labourOutput10m,
    labourOutput10to20m,
    preliminaryRequired,
    areaToCompact,
    labourOutputForCompacting,
  } = settings;

  // const userName = "User Name";

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">
        Filling Work Result
      </h1>
      <p className="text-black mb-4">
        Hi <strong>{response?.name}</strong>,
      </p>
      <div className="text-black mb-4  ">
        <p className="font-bold">Filling Works </p>

        <p className=" ">
          <strong>{volumeOfExcavation} To fill m3</strong> of{" "}
          <strong>{fillingMaterial}</strong>, you will require an estimated
          amount of <strong>{tonsRequired} tons</strong>. This will however
          require 1 man labour an estimated number of{" "}
          <strong>{labourOutput10m} days</strong> if the distance to drop off
          point is within 10 meters and will require 1 man labour an estimated
          number of <strong>{labourOutput10to20m} days</strong> if the distance
          to drop off point is within 10-20 meters using{" "}
          <strong>{preliminaryRequired}</strong> to achieve this filling work.
          However, if the volume of filling is more than 150 cubic meter, it is
          advised to mechanise the process using a payloader (with stable
          filling land area, a payloader with tyre, with unstable filling land
          area or moderately water logged filling land area – Payloader with
          tracks which will require a lowbed Truck to transport) as it’s a more
          cost effective and time saving approach. Although adopting manual
          labour may require a platform for ease of movement.
        </p>
      </div>
      <div className="text-black mb-4">
        <p className="font-bold">Spreading, Levelling and Compacting :</p>
        <p>
          To spread properly, level and compact the area just filled which is{" "}
          <strong>{areaToCompact} m2</strong>, it will require 1 man labour an
          estimated number of <strong>{labourOutputForCompacting} days</strong>{" "}
          to achieve this task. However, in low budget circumstances, rope lines
          may be used to take even levels across the area to be levelled and
          compacted if a dumpy/auto level is unavailable. Also, for site areas
          that will be subjected to heavy load user and high traffic passage
          (road and compound areas), it is usually preferable to use roller
          compactors instead of plate compactors that may be used in less load
          user and low traffic passage area.
        </p>
      </div>
      <p className="text-black mb-6">
        Note: 1 construction day = 9 hours. You can check our{" "}
        <Link
          href="/pricing"
          className="text-blue-900 underline"
        >
          material and labour price list/rates
        </Link>{" "}
        for applicable rates for your project.
      </p>

      <p className="text-black">Thank You</p>
    </div>
  );
};

export default FillingWorks;
