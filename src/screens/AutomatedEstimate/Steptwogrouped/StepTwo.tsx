import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface StepTwoProps {
  validateStep: (triggerValidation: () => Promise<boolean>) => void;
  setFormData: (data: any) => void;
}

const validationSchemaClearing = yup.object().shape({
  siteLength: yup.string().required("Site Length is required"),
  siteBreadth: yup.string().required("Site Breadth is required"),
  siteArea: yup.string().required("Site Area is required"),
});

const validationSchemaSettings = yup.object().shape({
  perimeter: yup.string().required("Perimeter is required"),
  girth: yup.string().required("Girth is required"),
  pegBundles: yup.string().required("Peg Bundles is required"),
  tieRods: yup.string().required("Number of Tie-Rods is required"),
  ropeQuantity: yup.string().required("Rope Quantity is required"),
});

const StepTwo: React.FC<StepTwoProps> = ({ validateStep, setFormData }) => {
  const [itemOfWork, setItemOfWork] = useState<string | null>(null);

  // Dynamically choose schema and form defaults based on `itemOfWork`
  const validationSchema:any =
    itemOfWork === "Setting out"
      ? validationSchemaSettings
      : validationSchemaClearing;

  const { control, trigger, getValues, formState: { errors } }:any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  // Fetch ItemOfWork from localStorage
  useEffect(() => {
    const storedItemOfWork = localStorage.getItem("ItemOfWork");
    setItemOfWork(storedItemOfWork);
  }, []);

  useEffect(() => {
    validateStep(async () => {
      const isValid = await trigger(); // Trigger validation for all fields
      if (isValid) {
        const formData = getValues();
        setFormData(formData); // Pass valid form data to the parent

        // Store data in localStorage
        if (itemOfWork === "Clearing Works") {
          localStorage.setItem("Clearing Inputs", JSON.stringify(formData));
        } else if (itemOfWork === "Setting out") {
          localStorage.setItem("Setting Out Inputs", JSON.stringify(formData));
        }
      }
      return isValid;
    });
  }, [trigger, validateStep, setFormData, getValues, itemOfWork]);

  // Render inputs dynamically based on ItemOfWork
  const renderInputs = () => {
    if (itemOfWork === "Clearing Works") {
      return (
        <>
          <InputField
            name="siteLength"
            control={control}
            label="Site Length"
            placeholder="Enter site length"
            error={errors.siteLength}
          />
          <InputField
            name="siteBreadth"
            control={control}
            label="Site Breadth"
            placeholder="Enter site breadth"
            error={errors.siteBreadth}
          />
          <InputField
            name="siteArea"
            control={control}
            label="Site Area"
            placeholder="Enter site area"
            error={errors.siteArea}
          />
        </>
      );
    }

    if (itemOfWork === "Setting out") {
      return (
        <>
          <InputField
            name="perimeter"
            control={control}
            label="Perimeter"
            placeholder="Enter perimeter"
            error={errors.perimeter}
          />
          <InputField
            name="girth"
            control={control}
            label="Girth of the Building"
            placeholder="Enter girth of the building"
            error={errors.girth}
          />
          <InputField
            name="pegBundles"
            control={control}
            label="Peg Bundles"
            placeholder="Enter number of peg bundles"
            error={errors.pegBundles}
          />
          <InputField
            name="tieRods"
            control={control}
            label="Number of Tie-Rods"
            placeholder="Enter number of tie-rods"
            error={errors.tieRods}
          />
          <InputField
            name="ropeQuantity"
            control={control}
            label="Rope Quantity"
            placeholder="Enter rope quantity"
            error={errors.ropeQuantity}
          />
        </>
      );
    }

    return <p>No valid Item of Work found in local storage.</p>;
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="max-w-2xl w-full lg:w-[50rem] bg-white border-2 p-8 shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-6 text-black">
          Specify your inputs:
        </h2>
        {renderInputs()}
      </div>
    </div>
  );
};

// Reusable InputField component
const InputField = ({
  name,
  control,
  label,
  placeholder,
  error,
}: {
  name: string;
  control: any;
  label: string;
  placeholder: string;
  error: any;
}) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-black mb-1 font-bold">
      {label}:
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          id={name}
          type="number"
          placeholder={placeholder}
          {...field}
          className={`w-full py-3 border text-black rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-yellow-700 ${
            error ? "border-red-600" : ""
          }`}
        />
      )}
    />
    {error && <p className="text-red-600 text-sm">{error.message}</p>}
  </div>
);

export default StepTwo;



// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// interface StepTwoProps {
//   validateStep: (triggerValidation: () => Promise<boolean>) => void;
//   setFormData: (data: any) => void;
// }

// const StepTwo: React.FC<StepTwoProps> = ({ validateStep, setFormData }) => {
//   const [itemOfWork, setItemOfWork] = React.useState<string | null>(null);

//   // Safely retrieve `ItemOfWork` from local storage
//   React.useEffect(() => {
//     const storedItemOfWork = localStorage.getItem("ItemOfWork");
//     setItemOfWork(storedItemOfWork);
//   }, []);

//   // Define validation schema dynamically
//   const validationSchema = React.useMemo(() => {
//     if (itemOfWork === "Clearing Works") {
//       return yup.object().shape({
//         siteLength: yup
//           .number()
//           .typeError("Site Length is required and must be a number")
//           .required("Site Length is required"),
//         siteBreadth: yup
//           .number()
//           .typeError("Site Breadth is required and must be a number")
//           .required("Site Breadth is required"),
//         siteArea: yup
//           .number()
//           .typeError("Site Area is required and must be a number")
//           .required("Site Area is required"),
//       });
//     } else if (itemOfWork === "Setting out") {
//       return yup.object().shape({
//         perimeter: yup
//           .number()
//           .typeError("Perimeter is required and must be a number")
//           .required("Perimeter is required"),
//         girth: yup
//           .number()
//           .typeError("Girth of the building is required and must be a number")
//           .required("Girth of the building is required"),
//         pegBundles: yup
//           .number()
//           .typeError("Peg bundles is required and must be a number")
//           .required("Peg bundles is required"),
//         tieRods: yup
//           .number()
//           .typeError("Number of tie-rods is required and must be a number")
//           .required("Number of tie-rods is required"),
//         ropeQuantity: yup
//           .number()
//           .typeError("Rope quantity is required and must be a number")
//           .required("Rope quantity is required"),
//       });
//     }
//     return yup.object(); // Default schema if no `ItemOfWork` matches
//   }, [itemOfWork]);

//   const {
//     control,
//     trigger,
//     getValues,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   React.useEffect(() => {
//     validateStep(async () => {
//       const isValid = await trigger();
//       if (isValid) {
//         setFormData(getValues());
//       }
//       return isValid;
//     });
//   }, [trigger, validateStep, setFormData, getValues]);

//   // Render appropriate inputs based on `ItemOfWork`
//   const renderInputs = () => {
//     if (itemOfWork === "Clearing Works") {
//       return (
//         <>
//           <InputField
//             label="Site Length"
//             name="siteLength"
//             control={control}
//             errors={errors}
//           />
//           <InputField
//             label="Site Breadth"
//             name="siteBreadth"
//             control={control}
//             errors={errors}
//           />
//           <InputField
//             label="Site Area"
//             name="siteArea"
//             control={control}
//             errors={errors}
//           />
//         </>
//       );
//     } else if (itemOfWork === "Setting out") {
//       return (
//         <>
//           <InputField
//             label="Perimeter"
//             name="perimeter"
//             control={control}
//             errors={errors}
//           />
//           <InputField
//             label="Girth of the Building"
//             name="girth"
//             control={control}
//             errors={errors}
//           />
//           <InputField
//             label="Peg Bundles"
//             name="pegBundles"
//             control={control}
//             errors={errors}
//           />
//           <InputField
//             label="Number of Tie-Rods"
//             name="tieRods"
//             control={control}
//             errors={errors}
//           />
//           <InputField
//             label="Rope Quantity"
//             name="ropeQuantity"
//             control={control}
//             errors={errors}
//           />
//         </>
//       );
//     }
//     return <p>No inputs available for the selected Item of Work.</p>;
//   };

//   return (
//     <div className="mt-20 flex items-center justify-center">
//       <div className="max-w-2xl w-full lg:w-[50rem] bg-white border-2 p-8 shadow-md rounded-md">
//         <h2 className="text-lg font-semibold mb-6 text-black">
//           Specify Details for: {itemOfWork}
//         </h2>
//         {renderInputs()}
//       </div>
//     </div>
//   );
// };

// // Reusable input field component
// const InputField = ({
//   label,
//   name,
//   control,
//   errors,
// }: {
//   label: string;
//   name: string;
//   control: any;
//   errors: any;
// }) => (
//   <div className="mb-6">
//     <label htmlFor={name} className="block text-black mb-1 font-bold">
//       {label}:
//     </label>
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <input
//           id={name}
//           type="number"
//           placeholder={`Enter ${label.toLowerCase()}`}
//           {...field}
//           className={`w-full py-3 border text-black rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-yellow-700 ${
//             errors[name] ? "border-red-600" : ""
//           }`}
//         />
//       )}
//     />
//     {errors[name] && (
//       <p className="text-red-600 text-sm">{errors[name]?.message}</p>
//     )}
//   </div>
// );

// export default StepTwo;
