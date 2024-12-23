import React, { useEffect, useState } from "react";

const Reinforcement: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    area: "Ground beam (average height of 1m and width 0.23m)",
    girthLength: "100",
    reinforcement16mm: "5",
    reinforcement12mm: "3",
    reinforcement10mm: "2",
    bindingWireRolls: "10",
    labourTons: "10",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setSettings({
        area:
          localStorage.getItem("area") ||
          "Ground beam (average height of 1m and width 0.23m)",
        girthLength: localStorage.getItem("girthLength") || "100",
        reinforcement16mm: localStorage.getItem("reinforcement16mm") || "5",
        reinforcement12mm: localStorage.getItem("reinforcement12mm") || "3",
        reinforcement10mm: localStorage.getItem("reinforcement10mm") || "2",
        bindingWireRolls: localStorage.getItem("bindingWireRolls") || "10",
        labourTons: localStorage.getItem("labourTons") || "10",
      });
    }
  }, []);

  const {
    area,
    girthLength,
    reinforcement16mm,
    reinforcement12mm,
    reinforcement10mm,
    bindingWireRolls,
    labourTons,
  } = settings;

  const userName = "User Name";

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">
        Reinforcement Result
      </h1>
      <p className="text-black">
        Hi <strong>{userName}</strong>,
      </p>
      <p className="text-black mb-4">
        Reinforcement requirement for a Ground beam of an average height of 1m
        and width of 0.23m in <strong>{area}</strong> of Girth/total length of{" "}
        <strong>{girthLength} m</strong>, you will require:
      </p>
      <div className="bg-black rounded-lg p-4 mb-4">
        <ul className="list-disc ml-6">
          <li>
            <strong>{reinforcement16mm} tons</strong> of 16mm reinforcement as
            the main bars
          </li>
          <li>
            <strong>{reinforcement12mm} tons</strong> of 12mm reinforcement as
            the runner
          </li>
          <li>
            <strong>{reinforcement10mm} tons</strong> of 10mm reinforcement as
            the stirrups/rings
          </li>
          <li>
            <strong>{bindingWireRolls} roll(s)</strong> of binding wire (20kg
            each)
          </li>
        </ul>
      </div>
      <p className="text-black mb-4">
        For labour requirement for this item of work, labours are usually paid
        per tonnage for the work done. The total estimated amount of tons used
        for this work item is <strong>{labourTons} tons</strong>. This may be
        multiplied by the applicable per ton rate. You may refer to our material
        and labour price list/rates.
      </p>
      <p className="text-black mb-6">
        Please note:
        <ul className="list-disc ml-6">
          <li>1 construction day = 9 Hours</li>
        </ul>
        You can check our{" "}
        <a
          href="/material-and-labor-price-list"
          className="text-blue-900 underline"
        >
          material and labour price list/rates
        </a>{" "}
        for applicable rates for your project.
      </p>
    </div>
  );
};

export default Reinforcement;
