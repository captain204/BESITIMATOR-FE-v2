import React, { useEffect, useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface StepTwoProps {
  validateStep: (triggerValidation: () => Promise<boolean>) => void;
  // setFormData: (data: any) => void;
}

const isCircular = (type: string) => type === "Circular";
const isRectangular = (type: string) => type === "Square or Rectangular";

const excavationWorksSchema = yup.object().shape({
  type: yup.string().required("Excavation type is required"),
  radius: yup
    .string()
    .test("is-required", "Radius is required", function (value) {
      const { type } = this.parent;
      return isCircular(type) ? Boolean(value?.trim()) : true;
    }),
  height: yup
    .string()
    .test("is-required", "Height is required", function (value) {
      const { type } = this.parent;
      return isCircular(type) ? Boolean(value?.trim()) : true;
    }),
  length: yup
    .string()
    .test("is-required", "Length is required", function (value) {
      const { type } = this.parent;
      return isRectangular(type) ? Boolean(value?.trim()) : true;
    }),
  width: yup
    .string()
    .test("is-required", "Width is required", function (value) {
      const { type } = this.parent;
      return isRectangular(type) ? Boolean(value?.trim()) : true;
    }),
  depth: yup
    .string()
    .test("is-required", "Depth is required", function (value) {
      const { type } = this.parent;
      return isRectangular(type) ? Boolean(value?.trim()) : true;
    }),
});

const ExcavationForm: React.FC<StepTwoProps> = ({
  validateStep,
  // setFormData,
}) => {
  const [unit, setUnit] = useState<string>("Metres");
  const [type, setType] = useState<string>("Circular");
  const [itemOfWork, setItemOfWork] = useState<string>("");


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
    },
  });

  const memoizedValidateStep = useCallback(() => {
    validateStep(async () => {
      const isValid = await trigger();
      if (isValid) {
        const formData = getValues();
        const formDataWithUnit = { ...formData, unit };
        // setFormData(formDataWithUnit);

        localStorage.setItem(
          "Filling works Inputs",
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
    setValue("type", newType); // Sync the type field in the form
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-6 mt-20">
     <h1 className="text-xl text-start font-bold text-black mb-6">
        Specify your{" "}
        <span className="text-yellow-900">{itemOfWork || "Work Item"}</span>{" "}
        inputs
      </h1>


      {/* Excavation Type Dropdown */}
      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="type" className="font-medium text-black mb-1">
          Is your Excavation regular, circular or conish ?
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

        {/* <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Circular">Circular</option>
          <option value="Square or Rectangular">Square or Rectangular</option>
        </select> */}
      </div>

      {/* Conditional Fields */}
      {type === "Circular" && (
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
                  id="radius"
                  placeholder="Enter Radius"
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

          <div className="flex flex-col w-full md:w-1/2 mb-4">
            <label htmlFor="height" className="font-medium text-black mb-1">
              Height:
            </label>
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="height"
                  placeholder="Enter Height"
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

      {type === "Square or Rectangular" && (
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
                  placeholder="Enter Length"
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
                  placeholder="Enter Width"
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

          <div className="flex flex-col w-full md:w-1/2 mb-4">
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
                  placeholder="Enter Depth"
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

      {/* Unit of Measurement Dropdown */}
      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="unit" className="font-medium text-black mb-1">
          Choose your Unit of Measurement:
        </label>
        <select
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Metres">Metres</option>
          <option value="Millimeters">Millimeters</option>
        </select>
      </div>
    </div>
  );
};

export default ExcavationForm;

// import React, { useEffect, useCallback, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// interface StepTwoProps {
//   validateStep: (triggerValidation: () => Promise<boolean>) => void;
//   setFormData: (data: any) => void;
// }

// const isCircular = (type: string) => type === "Circular";
// const isRectangular = (type: string) => type === "Square or Rectangular";

// const clearingWorksSchema = yup.object().shape({
//   type: yup.string().required("Excavation type is required"),
//   radius: yup
//     .string()
//     .test("is-required", "Radius is required", function (value) {
//       const { type } = this.parent;
//       return isCircular(type) ? !!value : true;
//     }),
//   height: yup
//     .string()
//     .test("is-required", "Height is required", function (value) {
//       const { type } = this.parent;
//       return isCircular(type) ? !!value : true;
//     }),
//   length: yup
//     .string()
//     .test("is-required", "Length is required", function (value) {
//       const { type } = this.parent;
//       return isRectangular(type) ? !!value : true;
//     }),
//   width: yup
//     .string()
//     .test("is-required", "Width is required", function (value) {
//       const { type } = this.parent;
//       return isRectangular(type) ? !!value : true;
//     }),
//   depth: yup
//     .string()
//     .test("is-required", "Depth is required", function (value) {
//       const { type } = this.parent;
//       return isRectangular(type) ? !!value : true;
//     }),
// });

// const ExcavationForm: React.FC<StepTwoProps> = ({
//   validateStep,
//   setFormData,
// }) => {
//   const [unit, setUnit] = useState<string>("Metres");
//   const [type, setType] = useState<string>("Circular");

//   const {
//     control,
//     trigger,
//     formState: { errors },
//     getValues,
//     clearErrors,
//   } = useForm({
//     resolver: yupResolver(clearingWorksSchema),
//     defaultValues: {
//       type: "Circular",
//       radius: "",
//       height: "",
//       length: "",
//       width: "",
//       depth: "",
//     },
//   });

//   const memoizedValidateStep = useCallback(() => {
//     validateStep(async () => {
//       const isValid = await trigger();
//       if (isValid) {
//         const formData = getValues();
//         const formDataWithUnit = { ...formData, unit };
//         setFormData(formDataWithUnit);

//         localStorage.setItem(
//           "Excavation Inputs",
//           JSON.stringify(formDataWithUnit)
//         );
//       }
//       return isValid;
//     });
//   }, [validateStep, trigger, getValues, setFormData, unit]);

//   useEffect(() => {
//     memoizedValidateStep();
//   }, [memoizedValidateStep]);

//   return (
//     <div className="flex flex-col items-center justify-center w-full mb-6 mt-20">
//       <h1 className="text-xl text-start font-bold text-black mb-6">
//         Specify your <span className="text-yellow-900">Excavation </span> inputs
//       </h1>

//       {/* Excavation Type Dropdown */}
//       <div className="flex flex-col w-full md:w-1/2 mb-4">
//         <label htmlFor="type" className="font-medium text-black mb-1">
//           Is your excavation regular, circular or conish?
//         </label>
//         <select
//           id="type"
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
//         >
//           <option value="Circular">Circular</option>
//           <option value="Square or Rectangular">Square or Rectangular</option>
//         </select>
//       </div>

//       {/* Conditional Fields */}
//       {type === "Circular" && (
//         <>
//           <div className="flex flex-col w-full md:w-1/2 mb-4">
//             <label htmlFor="radius" className="font-medium text-black mb-1">
//               Radius:
//             </label>
//             <Controller
//               name="radius"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   id="radius"
//                   placeholder="Enter Radius"
//                   className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
//                     errors.radius ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//               )}
//             />
//             {errors.radius && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.radius.message}
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col w-full md:w-1/2 mb-4">
//             <label htmlFor="height" className="font-medium text-black mb-1">
//               Height:
//             </label>
//             <Controller
//               name="height"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   id="height"
//                   placeholder="Enter Height"
//                   className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
//                     errors.height ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//               )}
//             />
//             {errors.height && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.height.message}
//               </p>
//             )}
//           </div>
//         </>
//       )}

//       {type === "Square or Rectangular" && (
//         <>
//           <div className="flex flex-col w-full md:w-1/2 mb-4">
//             <label htmlFor="length" className="font-medium text-black mb-1">
//               Length/Girth:
//             </label>
//             <Controller
//               name="length"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   id="length"
//                   placeholder="Enter Length"
//                   className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
//                     errors.length ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//               )}
//             />
//             {errors.length && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.length.message}
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col w-full md:w-1/2 mb-4">
//             <label htmlFor="width" className="font-medium text-black mb-1">
//               Width:
//             </label>
//             <Controller
//               name="width"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   id="width"
//                   placeholder="Enter Width"
//                   className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
//                     errors.width ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//               )}
//             />
//             {errors.width && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.width.message}
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col w-full md:w-1/2 mb-4">
//             <label htmlFor="depth" className="font-medium text-black mb-1">
//               Depth:
//             </label>
//             <Controller
//               name="depth"
//               control={control}
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   id="depth"
//                   placeholder="Enter Depth"
//                   className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
//                     errors.depth ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//               )}
//             />
//             {errors.depth && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.depth.message}
//               </p>
//             )}
//           </div>
//         </>
//       )}

//       {/* Unit of Measurement Dropdown */}
//       <div className="flex flex-col w-full md:w-1/2 mb-4">
//         <label htmlFor="unit" className="font-medium text-black mb-1">
//           Choose your Unit of Measurement:
//         </label>
//         <select
//           id="unit"
//           value={unit}
//           onChange={(e) => setUnit(e.target.value)}
//           className="py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
//         >
//           <option value="Metres">Metres</option>
//           <option value="Millimeters">Millimeters</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default ExcavationForm;
