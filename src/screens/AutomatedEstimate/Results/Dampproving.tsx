import React, { useEffect, useState } from "react";

const DampProofing: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    area: "50",
    polytheneNylonKg: "20",
    labourDaysNylon: "2",
    bituminousFeltArea: "50",
    labourDaysFelt: "3",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setSettings({
        area: localStorage.getItem("area") || "50",
        polytheneNylonKg: localStorage.getItem("polytheneNylonKg") || "20",
        labourDaysNylon: localStorage.getItem("labourDaysNylon") || "2",
        bituminousFeltArea: localStorage.getItem("bituminousFeltArea") || "50",
        labourDaysFelt: localStorage.getItem("labourDaysFelt") || "3",
      });
    }
  }, []);

  const {
    area,
    polytheneNylonKg,
    labourDaysNylon,
    bituminousFeltArea,
    labourDaysFelt,
  } = settings;

  const userName = "User Name";

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">
        Damp Proofing/Felting Work Details
      </h1>
      <p className="text-black">
        Hi <strong>{userName}</strong>,
      </p>
      <p className="text-black mb-4">
        For <strong>{area} m2</strong> of Damp proofing/Felting works, you will
        require an estimated amount of <strong>{polytheneNylonKg} Kg</strong> if
        using any gauge of polythene nylon, and it will take a 1 man labour an
        estimated number of <strong>{labourDaysNylon} days</strong>.
      </p>
      <div className="bg-black rounded-lg p-4 mb-4">
        <p>
          If using Bituminous or Cementitious Felting, you will require an
          estimated amount of <strong>{bituminousFeltArea} m2</strong>, which is
          usually priced by subcontractors as labour and material. However, if
          not priced as labour and material, it will take a 1 man labour an
          estimated number of <strong>{labourDaysFelt} days</strong> to apply
          this.
        </p>
      </div>
      <p className="text-black mb-4">
        Please note that if using any gauge of nylon for your damp proofing
        works, especially in foundation damp proof membrane works, you will be
        required to add a layer of blinding after placing the gauge of nylon.
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

export default DampProofing;
