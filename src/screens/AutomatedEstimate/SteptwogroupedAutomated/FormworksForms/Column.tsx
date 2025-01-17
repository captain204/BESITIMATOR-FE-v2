import React, { useEffect, useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface StepTwoProps {
  validateStep: (triggerValidation: () => Promise<boolean>) => void;
}

const columnSchema = yup.object().shape({
  hight: yup.string().required("Height is required"),
  perimetre: yup.string().required("perimetre is required"),
  total: yup.string().required("total is required"),
});

const ColumnFormworkForm: React.FC<StepTwoProps> = ({ validateStep }) => {
  const [unit, setUnit] = useState<string>("Metres");





  const getLocalStorageItem = (key:any, defaultValue:any) => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  };
  
  const reinforcementFor = getLocalStorageItem(
    "Formwork/Carpentry-works-sub",
    ""
  );


  const {
    control,
    trigger,
    formState: { errors },
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(columnSchema),
    defaultValues: {
      hight: "",
      total: "",
      perimetre: ""
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
          "formwork-Column Inputs",
          JSON.stringify(formDataWithUnit)
        );
      }
      return isValid;
    });
  }, [validateStep, trigger, getValues, unit]);

  useEffect(() => {
    memoizedValidateStep();
  }, [memoizedValidateStep]);

  return (
    <div className="flex flex-col items-center justify-center w-full  mb-6 mt-20">
      {/* Site Length */}
      <h1 className="text-xl text-start font-bold text-black mb-6">
        Specify your{" "}
        <span className="text-yellow-900">{reinforcementFor || "Work Item"}</span>{" "}
        inputs
      </h1>

      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="siteLength" className="font-medium text-black mb-1">
          Height:
        </label>
        <Controller
          name="hight"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="hight"
              placeholder="Enter height"
              onChange={(e) => {
                field.onChange(e); // Update the value
                clearErrors("hight"); // Clear errors
              }}
              className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                errors.hight ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.hight && (
          <p className="text-red-500 text-sm mt-1">{errors.hight.message}</p>
        )}
      </div>



      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="siteLength" className="font-medium text-black mb-1">
          Perimetre:
        </label>
        <Controller
          name="perimetre"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="perimetre"
              placeholder="Enter height"
              onChange={(e) => {
                field.onChange(e); // Update the value
                clearErrors("perimetre"); // Clear errors
              }}
              className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                errors.hight ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.perimetre && (
          <p className="text-red-500 text-sm mt-1">{errors.perimetre.message}</p>
        )}
      </div>




      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="siteLength" className="font-medium text-black mb-1">
          Total Nos of Columns:
        </label>
        <Controller
          name="total"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="total"
              placeholder="Total Nos of Columns"
              onChange={(e) => {
                field.onChange(e); // Update the value
                clearErrors("total"); // Clear errors
              }}
              className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                errors.total ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.total && (
          <p className="text-red-500 text-sm mt-1">{errors.total.message}</p>
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
          <option>Metres</option>
          <option>Millimeter</option>
        </select>
      </div>
    </div>
  );
};

export default ColumnFormworkForm;