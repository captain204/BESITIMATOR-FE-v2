import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface StepTwoProps {
  validateStep: (triggerValidation: () => Promise<boolean>) => void;
  setFormData: (data: any) => void;
}

const validationSchema = yup.object().shape({
  wallArea: yup
    .number()
    .typeError("Wall Area is required and must be a number")
    .required("Wall Area is required"),
  specificLength: yup
    .number()
    .typeError("Specific Length is required and must be a number")
    .required("Specific Length is required"),
  unit: yup.string().required("Unit of Measurement is required"),
});

const StepTwo: React.FC<StepTwoProps> = ({ validateStep, setFormData }) => {
  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      unit: "metres", // Set the default value here
    },
  });
  

  React.useEffect(() => {
    validateStep(async () => {
      const isValid = await trigger(); // Trigger validation for all fields
      if (isValid) {
        setFormData(getValues()); // Pass valid form data to the parent
      }
      return isValid;
    });
  }, [trigger, validateStep, setFormData, getValues]);

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="max-w-2xl w-full lg:w-[50rem] bg-white border-2 p-8 shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-6 text-black">
          Specify your area:
        </h2>

        {/* Wall Area */}
        <div className="mb-6">
          <label htmlFor="wallArea" className="block text-black mb-1 font-bold">
            Wall Area:
          </label>
          <Controller
            name="wallArea"
            control={control}
            render={({ field }) => (
              <input
                id="wallArea"
                type="number"
                placeholder="Enter wall area"
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Update field value in the form state
                  trigger("wallArea"); // Validate this specific field
                }}
                className={`w-full py-3 border text-black rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-yellow-700 ${
                  errors.wallArea ? "border-red-600" : ""
                }`}
              />
            )}
          />

          {errors.wallArea && (
            <p className="text-red-600 text-sm">{errors.wallArea.message}</p>
          )}
        </div>

        {/* Specific Length */}
        <div className="mb-6">
          <label htmlFor="specificLength" className="block text-black mb-1 font-bold">
            Specific Length:
          </label>
          <Controller
            name="specificLength"
            control={control}
            render={({ field }) => (
              <input
                id="specificLength"
                type="number"
                placeholder="Enter specific length"
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Update field value in the form state
                  trigger("specificLength"); // Validate this specific field
                }}
                className={`w-full py-3 border  text-black rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-yellow-700 ${
                  errors.specificLength ? "border-red-600" : ""
                }`}
              />
            )}
          />

          {errors.specificLength && (
            <p className="text-red-600 text-sm">
              {errors.specificLength.message}
            </p>
          )}
        </div>

        {/* Unit of Measurement */}
        <div className="mb-6">
          <label htmlFor="unit" className="block text-black mb-1 font-bold">
            Choose your Unit of Measurement:
          </label>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <select
                id="unit"
                {...field}
                onChange={(e) => {
                  field.onChange(e); // Update field value in the form state
                  trigger("unit"); // Validate this specific field
                }}
                className={`w-full text-black border bg-white rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-400 ${
                  errors.unit ? "border-red-600" : ""
                }`}
              >
                <option  value="metres">Metres</option>
                <option value="millimeter">Millimetre</option>
              </select>
            )}
          />

          {errors.unit && (
            <p className="text-red-600 text-sm">{errors.unit.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;

// import React, { useState } from 'react';

// const StepTwo = () => {
//   const [wallArea, setWallArea] = useState('');
//   const [specificLength, setSpecificLength] = useState('');
//   const [unit, setUnit] = useState('metres');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Wall Area:', wallArea);
//     console.log('Specific Length:', specificLength);
//     console.log('Unit of Measurement:', unit);
//     alert('Form submitted! Check the console for data.');
//   };

//   return (
//     <div className="mt-20 flex items-center justify-center">
//       <div className="max-w-2xl w-full lg:w-[50rem] bg-white border p-8 shadow-md rounded-md">
//         <h2 className="text-lg font-semibold mb-6 text-black">Specify your area:</h2>

//         <form onSubmit={handleSubmit}>
//           {/* Wall Area */}
//           <div className="mb-6">
//             <label htmlFor="wallArea" className="block text-black mb-1">
//               Wall Area:
//             </label>
//             <input
//               id="wallArea"
//               type="number"
//               placeholder="Enter wall area"
//               value={wallArea}
//               onChange={(e) => setWallArea(e.target.value)}
//               className="w-full py-3 border text-black rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-yellow-700"
//             />
//           </div>

//           {/* Specific Length */}
//           <div className="mb-6">
//             <label htmlFor="specificLength" className="block text-gray-600 mb-1">
//               Or{' '}
//               <span className="text-yellow-900 cursor-pointer hover:underline">
//                 Specific Length:
//               </span>
//             </label>
//             <input
//               id="specificLength"
//               type="number"
//               placeholder="Enter length"
//               value={specificLength}
//               onChange={(e) => setSpecificLength(e.target.value)}
//               className="w-full border text-black rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-700"
//             />
//           </div>

//           {/* Unit of Measurement */}
//           <div className="mb-6">
//             <label htmlFor="unit" className="block text-black mb-1">
//               Choose your Unit of Measurement:
//             </label>
//             <select
//               id="unit"
//               value={unit}
//               onChange={(e) => setUnit(e.target.value)}
//               className="w-full text-black border bg-white rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-400"
//             >
//               <option value="metres">Metres</option>
//               <option value="feet">Feet</option>
//               <option value="inches">Inches</option>
//             </select>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StepTwo;
