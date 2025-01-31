import React, { useEffect, useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface StepTwoProps {
  validateStep: (triggerValidation: () => Promise<boolean>) => void;
}

const excavationWorksSchema = yup.object().shape({
  type: yup.string().required("Excavation type is required"),
  radius: yup
    .string()
    .test("radius-required", "Radius is required", function (value) {
      const { type, volume } = this.parent;
      if (type === "Circular" && !volume?.trim()) {
        return Boolean(value?.trim());
      }
      return true; // Skip validation if volume is filled or type is not Circular
    }),
  height: yup
    .string()
    .test("height-required", "Height is required", function (value) {
      const { type, volume } = this.parent;
      if (type === "Circular" && !volume?.trim()) {
        return Boolean(value?.trim());
      }
      return true; // Skip validation if volume is filled or type is not Circular
    }),
  length: yup
    .string()
    .test("length-required", "Length is required", function (value) {
      const { type, volume } = this.parent;
      if (type === "Square or Rectangular" && !volume?.trim()) {
        return Boolean(value?.trim());
      }
      return true; // Skip validation if volume is filled or type is not Square/Rectangular
    }),
  width: yup
    .string()
    .test("width-required", "Width is required", function (value) {
      const { type, volume } = this.parent;
      if (type === "Square or Rectangular" && !volume?.trim()) {
        return Boolean(value?.trim());
      }
      return true; // Skip validation if volume is filled or type is not Square/Rectangular
    }),
  depth: yup
    .string()
    .test("depth-required", "Depth is required", function (value) {
      const { type, volume } = this.parent;
      if (type === "Square or Rectangular" && !volume?.trim()) {
        return Boolean(value?.trim());
      }
      return true; // Skip validation if volume is filled or type is not Square/Rectangular
    }),
  volume: yup
    .string()
    .test("volume-required", "Volume is required", function (value) {
      const { type, radius, height, length, width, depth } = this.parent;

      if (type === "Circular") {
        // Skip volume validation if radius and height are filled
        if (radius?.trim() && height?.trim()) {
          return true;
        }
      }

      if (type === "Square or Rectangular") {
        // Skip volume validation if length, width, and depth are filled
        if (length?.trim() && width?.trim() && depth?.trim()) {
          return true;
        }
      }

      return Boolean(value?.trim()); // Otherwise, validate volume
    }),
});

const FillingWorks: React.FC<StepTwoProps> = ({ validateStep }) => {
  const [unit, setUnit] = useState<string>("Metres");
  const [type, setType] = useState<string>("Circular");
  const [itemOfWork, setItemOfWork] = useState<string>("");
  const [showVolume, setShowVolume] = useState<boolean>(false);

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
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(excavationWorksSchema),
    defaultValues: {
      type: "Circular",
      radius: "",
      height: "",
      length: "",
      width: "",
      depth: "",
      volume: "",
    },
  });

  const memoizedValidateStep = useCallback(() => {
    validateStep(async () => {
      const isValid = await trigger();
      if (isValid) {
        const formData = getValues();
        const formDataWithUnit = { ...formData, unit };
        localStorage.setItem(
          "Filling Works Inputs",
          JSON.stringify(formDataWithUnit)
        );
      }
      return isValid;
    });
  }, [validateStep, trigger, getValues, unit]);

  useEffect(() => {
    memoizedValidateStep();
  }, [memoizedValidateStep]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setType(newType);
    setValue("type", newType);
  };

  const toggleVolumeInput = () => {
    setShowVolume(!showVolume);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-6 mt-20">
      <h1 className="text-xl text-start font-bold text-black mb-6">
        Specify your{" "}
        <span className="text-yellow-900">{itemOfWork || "Work Item"}</span>{" "}
        inputs
      </h1>

      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="type" className="font-medium text-black mb-1">
          Is your <span className="font-bold"> {itemOfWork} </span> regular,
          circular or conish?
        </label>
        <select
          id="type"
          value={type}
          onChange={handleTypeChange}
          className="py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Circular">Circular</option>
          <option value="Square or Rectangular">Square or Rectangular</option>
        </select>
      </div>

      {/* Show volume input button */}

      {/* Conditional Fields */}
      {(type === "Circular" || type === "Square or Rectangular") &&
        showVolume && (
          <div className="flex flex-col w-full md:w-1/2 ">
            <label htmlFor="volume" className="font-medium text-black mb-1">
              Volume:
            </label>
            <Controller
              name="volume"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="volume"
                  placeholder="Enter Volume"
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("volume");
                  }}
                  className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    errors.volume ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.volume && (
              <p className="text-red-500 text-sm mt-1">
                {errors.volume.message}
              </p>
            )}
          </div>
        )}

      {/* Existing fields for Circular or Rectangular Excavation */}
      {type === "Circular" && !showVolume && (
        <>
          <div className="flex flex-col w-full md:w-1/2 mb-4">
            <label htmlFor="radius" className="font-medium text-black mb-1">
              Radius:
            </label>
            <Controller
              name="radius"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="radius"
                  placeholder="Enter Radius"
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("radius");
                  }}
                  className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    errors.radius ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.radius && (
              <p className="text-red-500 text-sm mt-1">
                {errors.radius.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/2 mb-2">
            <label htmlFor="height" className="font-medium text-black mb-1">
              Height:
            </label>
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  id="height"
                  placeholder="Enter Height"
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("height");
                  }}
                  className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    errors.height ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.height && (
              <p className="text-red-500 text-sm mt-1">
                {errors.height.message}
              </p>
            )}
          </div>
        </>
      )}

      {type === "Square or Rectangular" && !showVolume && (
        <>
          <div className="flex flex-col w-full md:w-1/2 mb-4">
            <label htmlFor="length" className="font-medium text-black mb-1">
              Length/Girth:
            </label>
            <Controller
              name="length"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="length"
                  type="number"
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

          <div className="flex flex-col w-full md:w-1/2 mb-4">
            <label htmlFor="width" className="font-medium text-black mb-1">
              Width:
            </label>
            <Controller
              name="width"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="width"
                  type="number"
                  placeholder="Enter Width"
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("width");
                  }}
                  className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    errors.width ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.width && (
              <p className="text-red-500 text-sm mt-1">
                {errors.width.message}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/2 mb-2">
            <label htmlFor="depth" className="font-medium text-black mb-1">
              Depth:
            </label>
            <Controller
              name="depth"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="depth"
                  type="number"
                  placeholder="Enter Depth"
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors("depth");
                  }}
                  className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    errors.depth ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.depth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.depth.message}
              </p>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <div className="w-96 text-left">
          <button
            className="mb-6 mt-6  inline-block bg-yellow-100 text-yellow-900 font-bold px-4 py-1 rounded-md shadow-md transition duration-300 transform hover:bg-yellow-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            onClick={toggleVolumeInput}
          >
            {showVolume ? "Or Specific Length:" : "Or Volume:"}
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
          <option value="Kilometres">Millimetres</option>
        </select>
      </div>
    </div>
  );
};

export default FillingWorks;

