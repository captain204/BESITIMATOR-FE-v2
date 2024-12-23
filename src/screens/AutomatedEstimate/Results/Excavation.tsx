import React, { useEffect, useState } from "react";

const Excavation: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    siteWorkArea: "100",
    volumeOfExcavation: "1",
    manLabourOutputPerDay: "1",
    preliminaryRequired: "Shovel, Wheelbarrow",
    disposalDistance: "50",
    lengthToBeShored: "10",
    shoringWood1: "25",
    shoringWood2: "15",
    nailKg: "4",
    labourRequired: "2",
    labourOutputPerDay: "1",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setSettings({
        siteWorkArea: localStorage.getItem("siteWorkArea") || "100",
        volumeOfExcavation: localStorage.getItem("volumeOfExcavation") || "1",
        manLabourOutputPerDay: localStorage.getItem("manLabourOutputPerDay") || "1",
        preliminaryRequired: localStorage.getItem("preliminaryRequired") || "Shovel, Wheelbarrow",
        disposalDistance: localStorage.getItem("disposalDistance") || "50",
        lengthToBeShored: localStorage.getItem("lengthToBeShored") || "10",
        shoringWood1: localStorage.getItem("shoringWood1") || "25",
        shoringWood2: localStorage.getItem("shoringWood2") || "15",
        nailKg: localStorage.getItem("nailKg") || "4",
        labourRequired: localStorage.getItem("labourRequired") || "2",
        labourOutputPerDay: localStorage.getItem("labourOutputPerDay") || "1",
      });
    }
  }, []);

  const {
    siteWorkArea,
    volumeOfExcavation,
    manLabourOutputPerDay,
    preliminaryRequired,
    disposalDistance,
    lengthToBeShored,
    shoringWood1,
    shoringWood2,
    nailKg,
    labourRequired,
    labourOutputPerDay,
  } = settings;

  const userName = "User Name";

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-4">Excavation Result</h1>
      <p className="text-black">
        Hi <strong>{userName}</strong>,
      </p>
      <p className="text-black mb-4">
        Excavation:
        For a <strong>site work area</strong> of <strong>{volumeOfExcavation} m3</strong>, you
        will require 1 man labour for an estimated number of <strong>{manLabourOutputPerDay} days</strong>, and he will require <strong>{preliminaryRequired}</strong> to carry out the excavation work. Although, for excavation work above 250m3, it’s usually more cost effective to adopt a mechanical approach using an excavator with hammer or bowl depending on the site location.
      </p>
      <div className="text-black mb-4">
        <p>Disposal</p>
        <p>
          To dispose <strong>{volumeOfExcavation} m3</strong> of excavated material, if the
          distance of disposal is <strong>{disposalDistance} meters</strong>, you will require
          1 man labour for an estimated number of <strong>{manLabourOutputPerDay} days</strong> to cart this excavated material using <strong>{preliminaryRequired}</strong>. Although this man labour may require a platform for ease of movement.
        </p>
      </div>
      <div className="bg-black rounded-lg p-4 mb-4">
        <p>Shoring</p>
        <p>
          If shoring is required during this excavation process for a length of
          <strong> {lengthToBeShored} meters</strong>, you will require an estimated number of <strong>{shoringWood1} pcs</strong> of 1" x 12" or 25mm x 300mm x 3600mm wood, <strong>{shoringWood2} pcs</strong> of 2" x 2" or 50mm x 50mm x 3600mm wood, and <strong>{nailKg} kg</strong> of 4” and 5” Nails. Also, you will require <strong>{labourRequired} labourers</strong> for an estimated number of <strong>{labourOutputPerDay} days</strong>.
        </p>
      </div>
      <p className="text-black mb-6">
        Note: 1 construction day = 9 hours. You can check our <a
          href="/material-and-labor-price-list"
          className="text-blue-900 underline"
        >
          material and labour price list/rates
        </a> for applicable rates for your project.
      </p>
    </div>
  );
};

export default Excavation;
