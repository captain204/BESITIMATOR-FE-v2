import React, { useEffect, useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface StepTwoProps {
  validateStep: (triggerValidation: () => Promise<boolean>) => void;
}

const settingoutSchema = yup.object().shape({
  siteLength: yup.string().required("Perimeter of structure is required"),
});

const ForMultipleReinforcementform: React.FC<StepTwoProps> = ({
  validateStep,
}) => {
  const [unit, setUnit] = useState<string>("Metres");

  const [itemOfWork, setItemOfWork] = useState<string>("");

  const getLocalStorageItem = (key: any, defaultValue: any) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  };

  const reinforcementFor = getLocalStorageItem(
    "Where-you-need-your-reinforcement-for",
    ""
  );

  useEffect(() => {
    // Retrieve the work item from local storage
    const storedItem = localStorage.getItem("ItemOfWork");
    if (storedItem) {
      setItemOfWork(storedItem);
    }
  }, []);

  const {
    control,
    trigger,
    formState: { errors },
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(settingoutSchema),
    defaultValues: {
      siteLength: "",
    },
  });

  const memoizedValidateStep = useCallback(() => {
    validateStep(async () => {
      const isValid = await trigger();
      if (isValid) {
        const formData = getValues();
        // Include unit of measurement in the form data
        const formDataWithUnit = { ...formData, unit };

        // Store data in localStorage, including unit
        localStorage.setItem(
          "Reinforcement/Iron bending works Inputs",
          JSON.stringify(formDataWithUnit)
        );
      }
      return isValid;
    });
  }, [trigger, getValues, unit]);

  useEffect(() => {
    memoizedValidateStep();
  }, [memoizedValidateStep]);

  return (
    <div className="flex flex-col items-center justify-center w-full  mb-6 mt-20">
      {/* Site Length */}
      <h1 className="text-xl text-start font-bold text-black mb-6">
        Specify your{" "}
        <span className="text-yellow-900">
          {reinforcementFor || "Work Item"}
        </span>{" "}
        inputs
      </h1>
      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="siteLength" className="font-medium text-black mb-1">
          Girth / Total Length:
        </label>
        <Controller
          name="siteLength"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              id="siteLength"
              placeholder="Enter Girth/Total Length"
              onChange={(e) => {
                field.onChange(e); // Update the value
                clearErrors("siteLength"); // Clear errors
              }}
              className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                errors.siteLength ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.siteLength && (
          <p className="text-red-500 text-sm mt-1">
            {errors.siteLength.message}
          </p>
        )}
      </div>

      {/* Site Breadth */}

      {/* Unit of Measurement Dropdown */}
      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="unit" className="font-medium text-black mb-1">
          Choose your Unit of Measurement:
        </label>
        <select
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          // id="unit"
          className="py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Metres">Metres</option>
          <option value="Millimetres">Millimetres</option>
        </select>
      </div>
    </div>
  );
};

export default ForMultipleReinforcementform;
