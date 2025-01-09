import { getUser } from "@/Globals/Slices/AuthSlices/GetUser";
import { AppDispatch, RootState } from "@/Globals/store/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SettingOutInputs {
  perimeter: string;
  girth: string;
  pegBundles: string;
  tieRods: string;
  ropeQuantity: string;
}

const SettingOut: React.FC = () => {
  const [settings, setSettings] = useState<SettingOutInputs>({
    perimeter: "100",
    girth: "0",
    pegBundles: "2",
    tieRods: "31",
    ropeQuantity: "111",
  });

  const dispatch: AppDispatch = useDispatch();
  const response = useSelector((state: RootState) => state.getUser.response);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedSettings = localStorage.getItem("Setting Out Inputs");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }
  }, []);

  const { perimeter, pegBundles, tieRods, ropeQuantity, girth } = settings;

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">Setting Out Result</h1>
      <p className="text-black">
        Hi <strong>{response?.name}</strong>,
      </p>
      <p className="text-black mb-4">
        Setting out involves marking out the area based on the project plan. It
        ensures accuracy and alignment for the construction.
      </p>
      <div className="bg-black rounded-lg p-4 mb-4">
        <p>
          Setting out a structure perimeter of{" "}
          <strong>{perimeter} meters</strong> and girth of{" "}
          <strong>{girth} meters</strong>, you will require:
        </p>
        <ul className="list-disc ml-6">
          <li>
            <strong>{pegBundles} bundles</strong> of pegs (20 pieces per bundle)
          </li>
          <li>
            <strong>{tieRods} tie rods</strong> (12mm x 50mm x 3600mm wood)
          </li>
        </ul>
        <p>
          Additionally, you will require a carpenter and a laborer for this
          process.
        </p>
      </div>
      <div className="bg-black rounded-lg p-4 mb-4">
        <p>For structures without internal beams, you will require:</p>
        <ul className="list-disc ml-6">
          <li>
            <strong>{ropeQuantity} yards</strong> of rope
          </li>
          <li>Not more than 1 bundle of pegs</li>
          <li>
            Off-cut woods (2x2 or 2x3 woods) or off-cut reinforcements if
            available
          </li>
        </ul>
      </div>
      <p className="text-black mb-4">
        Note: Pegs come in different lengths: 900mm (3 feet), 1200mm (4 feet),
        1500mm (5 feet). The looser the soil, the longer the peg required.
        Materials purchased here can be reused.
      </p>
      <p className="text-black mb-6">
        1 construction day = 9 hours. You can check our{" "}
        <Link href="/pricing" className="text-blue-900 underline">
          material and labor price list/rates
        </Link>{" "}
        for applicable rates for your project.
      </p>
    </div>
  );
};

export default SettingOut;

