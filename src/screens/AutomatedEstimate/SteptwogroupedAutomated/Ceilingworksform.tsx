import React, { useEffect, useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface StepTwoProps {
  validateStep: (triggerValidation: () => Promise<boolean>) => void;
}

const excavationWorksSchema = yup.object().shape({
  length: yup
    .string()
    .test("length-required", "Length is required", function (value) {
      const { area } = this.parent;
      // Skip error generation if area is provided
      if (area?.trim()) {
        this.options.context?.clearErrors("length");
        return true;
      }
      return Boolean(value?.trim());
    }),
  breadth: yup
    .string()
    .test("breadth-required", "Breadth is required", function (value) {
      const { area } = this.parent;
      // Skip error generation if area is provided
      if (area?.trim()) {
        this.options.context?.clearErrors("breadth");
        return true;
      }
      return Boolean(value?.trim());
    }),
  area: yup
    .string()
    .test("area-required", "Area is required", function (value) {
      const { length, breadth } = this.parent;
      // Skip error generation if length and breadth are provided
      if (length?.trim() && breadth?.trim()) {
        this.options.context?.clearErrors("area");
        return true;
      }
      return Boolean(value?.trim());
    }),
});

const Ceilingworksform: React.FC<StepTwoProps> = ({ validateStep }) => {
  const [unit, setUnit] = useState<string>("Metres");
  const [itemOfWork, setItemOfWork] = useState<string>("");
  const [showArea, setShowArea] = useState<boolean>(false);

  useEffect(() => {
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
    resolver: yupResolver(excavationWorksSchema),
    defaultValues: {
      length: "",
      breadth: "",
      area: "",
    },
  });

  const memoizedValidateStep = useCallback(() => {
    validateStep(async () => {
      const isValid = await trigger();
      if (isValid) {
        const formData = getValues();
        const formDataWithUnit = { ...formData, unit };
        localStorage.setItem(
          "Ceiling-Inputs",
          JSON.stringify(formDataWithUnit)
        );
      }
      return isValid;
    });
  }, [validateStep, trigger, getValues, unit]);

  useEffect(() => {
    memoizedValidateStep();
  }, [memoizedValidateStep]);

  const toggleAreaInput = () => {
    setShowArea(!showArea);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-6 mt-20">
      <h1 className="text-xl text-start font-bold text-black mb-6">
        Specify your{" "}
        <span className="text-yellow-900">{itemOfWork || "Work Item"}</span>{" "}
        inputs
      </h1>

      {showArea && (
        <div className="flex flex-col w-full md:w-1/2 ">
          <label htmlFor="area" className="font-medium text-black mb-1">
            Site Area:
          </label>
          <Controller
            name="area"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="area"
                placeholder="Enter Area"
                type="number"
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("area");
                }}
                className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                  errors.area ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.area && (
            <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>
          )}
        </div>
      )}

      {!showArea && (
        <>
          <div className="flex flex-col w-full md:w-1/2 mb-4">
            <label htmlFor="length" className="font-medium text-black mb-1">
              Site Length:
            </label>
            <Controller
              name="length"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="length"
                  placeholder="Enter Length"
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("length");
                  }}
                  className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    errors.length ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.length && (
              <p className="text-red-500 text-sm mt-1">
                {errors.length.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/2 mb-2">
            <label htmlFor="breadth" className="font-medium text-black mb-1">
              Site Breadth:
            </label>
            <Controller
              name="breadth"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="breadth"
                  type="number"
                  placeholder="Enter Breadth"
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("breadth");
                  }}
                  className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    errors.breadth ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.breadth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.breadth.message}
              </p>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <div className="w-96 text-left">
          <button
            className="mb-6 mt-6 inline-block bg-yellow-100 text-yellow-900 font-bold px-4 py-1 rounded-md shadow-md transition duration-300 transform hover:bg-yellow-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            onClick={toggleAreaInput}
          >
            {showArea ? "Or Specify Dimensions:" : "Or Site Area:"}
          </button>
        </div>

        <label htmlFor="unit" className="font-medium text-black mb-1">
          Unit of Measurement
        </label>
        <select
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Metres">Metres</option>
          <option value="Millimetres">Millimetres</option>
        </select>
      </div>
    </div>
  );
};

export default Ceilingworksform;
