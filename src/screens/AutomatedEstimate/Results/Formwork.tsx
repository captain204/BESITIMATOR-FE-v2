import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Formwork: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    areaOfWork: "Slab and Beam Area",
    formworkArea: "200",
    marineBoardNos: "20",
    wood1x12Nos: "15",
    wood2x3Nos: "10",
    pegBundles: "5",
    nailKg: "25",
    bindingWireRolls: "3",
    labourArea: "200",
    carpenterDays: "5",
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
        areaOfWork: localStorage.getItem("areaOfWork") || "Slab and Beam Area",
        formworkArea: localStorage.getItem("formworkArea") || "200",
        marineBoardNos: localStorage.getItem("marineBoardNos") || "20",
        wood1x12Nos: localStorage.getItem("wood1x12Nos") || "15",
        wood2x3Nos: localStorage.getItem("wood2x3Nos") || "10",
        pegBundles: localStorage.getItem("pegBundles") || "5",
        nailKg: localStorage.getItem("nailKg") || "25",
        bindingWireRolls: localStorage.getItem("bindingWireRolls") || "3",
        labourArea: localStorage.getItem("labourArea") || "200",
        carpenterDays: localStorage.getItem("carpenterDays") || "5",
      });
    }
  }, []);

  const {
    areaOfWork,
    formworkArea,
    marineBoardNos,
    wood1x12Nos,
    wood2x3Nos,
    pegBundles,
    nailKg,
    bindingWireRolls,
    labourArea,
    carpenterDays,
  } = settings;

  const userName = "User Name";

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">Formwork Requirement</h1>
      <p className="text-black">
        Hi <strong className="font-bold">{response?.name}</strong>,
      </p>
      <p className="text-black mb-4">
        Formwork requirement for <strong>{areaOfWork}</strong> of an area of <strong>{formworkArea} m2</strong>, you will require an estimated amount of:
      </p>
      <div className="bg-black rounded-lg p-4 mb-4">
        <ul className="list-disc ml-6">
          <li>If using marine boards, <strong>{marineBoardNos} Nos</strong></li>
          <li>If using 1” x 12” (25mm x 300mm) plank, <strong>{wood1x12Nos} nos</strong></li>
          <li><strong>{wood2x3Nos} nos</strong> of 2” x 3” (50mm x 75mm) wood</li>
          <li><strong>{pegBundles} Bundles</strong> of Wooden pegs (1m high)</li>
          <li><strong>{nailKg} kg</strong> of 4” and 5” sized wooden nails</li>
          <li><strong>{bindingWireRolls} roll(s)</strong> of binding wire</li>
        </ul>
      </div>
      <p className="text-black mb-4">
        For labour requirement for this item of work, labours may be paid per sq. m for the work done. Therefore, the total area for this work item is <strong>{labourArea} m2</strong>. This may be multiplied by the applicable cost per m2 rate. You may refer to our material and labour price list/rates.
      </p>
      <p className="text-black mb-4">
        Alternatively, if decided to pay the manpower for this job per day, it will take an estimated number of <strong>{carpenterDays} days</strong> for 1 carpenter and a labourer to complete this task.
      </p>
      <p className="text-black mb-6">
        Please note:
        <ul className="list-disc ml-6">
          <li>1 construction day = 9 Hours</li>
        </ul>
        You can check our <Link
          href="/pricing"
          className="text-blue-900 underline"
        >
          material and labour price list/rates
        </Link> for applicable rates for your project.
      </p>
    </div>
  );
};

export default Formwork;
