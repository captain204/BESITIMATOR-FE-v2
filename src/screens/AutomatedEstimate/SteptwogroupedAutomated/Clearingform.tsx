import React, { useEffect, useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface StepTwoProps {
  validateStep: (triggerValidation: () => Promise<boolean>) => void;
  // setFormData: (data: any) => void;
}

const clearingWorksSchema = yup.object().shape({
  siteLength: yup.string().required("Site Length is required"),
  siteBreadth: yup.string().required("Site Breadth is required"),
});

const StepTwo: React.FC<StepTwoProps> = ({ validateStep }) => {
  const [unit, setUnit] = useState<string>("Metres");
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
    clearErrors,
  } = useForm({
    resolver: yupResolver(clearingWorksSchema),
    defaultValues: {
      siteLength: "",
      siteBreadth: "",
    },
  });

  // Memoizing the validateStep call to avoid triggering the effect unnecessarily
  // const memoizedValidateStep = useCallback(() => {
  //   validateStep(async () => {
  //     const isValid = await trigger();
  //     if (isValid) {
  //       const formData = getValues();
  //       setFormData(formData);

  //       // Store data in localStorage
  //       localStorage.setItem("Clearing Works Inputs", JSON.stringify(formData));
  //     }
  //     return isValid;
  //   });
  // }, [validateStep, trigger, getValues, setFormData]);

  const memoizedValidateStep = useCallback(() => {
    validateStep(async () => {
      const isValid = await trigger();
      if (isValid) {
        const formData = getValues();
        // Include unit of measurement in the form data
        const formDataWithUnit = { ...formData, unit };
        // setFormData(formDataWithUnit);

        // Store data in localStorage, including unit
        localStorage.setItem(
          "Clearing Works Inputs",
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
    <div className="flex flex-col items-center justify-center w-full mb-6 mt-20">
      {/* Site Length */}

      <h1 className="text-xl text-start font-bold text-black mb-6">
        Specify your{" "}
        <span className="text-yellow-900">{itemOfWork || "Work Item"}</span>{" "}
        inputs
      </h1>
      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="siteLength" className="font-medium text-black mb-1">
          Site Length:
        </label>
        <Controller
          name="siteLength"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="siteLength"
              placeholder="Enter Site Length"
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
      <div className="flex flex-col w-full md:w-1/2 mb-4">
        <label htmlFor="siteBreadth" className="font-medium text-black mb-1">
          Site Breadth:
        </label>
        <Controller
          name="siteBreadth"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="siteBreadth"
              placeholder="Enter Site Breadth"
              onChange={(e) => {
                field.onChange(e); // Update the value
                clearErrors("siteBreadth"); // Clear errors
              }}
              className={`py-3 px-4 w-full bg-white border text-black rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                errors.siteBreadth ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors.siteBreadth && (
          <p className="text-red-500 text-sm mt-1">
            {errors.siteBreadth.message}
          </p>
        )}
      </div>

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

export default StepTwo;

// import React, { useState, useEffect } from "react";
// import { useForm, Controller, FieldError } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// interface StepTwoProps {
//   validateStep: (triggerValidation: () => Promise<boolean>) => void;
//   setFormData: (data: any) => void;
// }

// interface InputFieldProps {
//   name: string;
//   control: any;
//   label: string;
//   placeholder: string;
//   error?: FieldError;
//   clearErrors: (fieldName?: string) => void;
// }

// // Validation schemas for different ItemOfWork types
// const schemas: any = {
//   "Clearing Works": yup.object().shape({
//     siteLength: yup.string().required("Site Length is required"),
//     siteBreadth: yup.string().required("Site Breadth is required"),
//     siteArea: yup.string().required("Site Area is required"),
//   }),
//   "Setting out": yup.object().shape({
//     perimeter: yup.string().required("Perimeter is required"),
//     girth: yup.string().required("Girth is required"),
//     pegBundles: yup.string().required("Peg Bundles is required"),
//     tieRods: yup.string().required("Number of Tie-Rods is required"),
//     ropeQuantity: yup.string().required("Rope Quantity is required"),
//   }),
//   Excavation: yup.object().shape({
//     exradius: yup.string().required("Excavation radius is required"),
//     exheight: yup.string().required("Excavation height is required"),
//     exlength: yup.string().required("Excavation length is required"),
//     exwidth: yup.string().required("Excavation width is required"),
//     exdepth: yup.string().required("Excavation depth is required"),
//     exvolume: yup.string().required("Excavation volume is required"),
//   }),
//   "Filling works": yup.object().shape({
//     fillingradius: yup.string().required("Filling radius is required"),
//     fillingheight: yup.string().required("Filling height is required"),
//     fillinglength: yup.string().required("Filling length is required"),
//     fillingwidth: yup.string().required("Filling width is required"),
//     fillingdepth: yup.string().required("Filling depth is required"),
//     fillingvolume: yup.string().required("Filling volume is required"),
//   }),

//   //Damp proofing works
//   "Concrete/Binding Works": yup.object().shape({
//     concreteradius: yup.string().required(" radius is required"),
//     concreteheight: yup.string().required(" height is required"),
//     concretelength: yup.string().required(" length is required"),
//     concretewidth: yup.string().required(" width is required"),
//     concretedepth: yup.string().required(" depth is required"),
//     concretevolume: yup.string().required(" volume is required"),
//   }),

//   "Damp proofing works": yup.object().shape({
//     damplength: yup.string().required("length is required"),
//     dampbreadth: yup.string().required("breath is required"),
//     damparea: yup.string().required("Area is required"),
//   }),

//   "Reinforcement/Iron bending works": yup.object().shape({
//     dampgirth: yup.string().required("girth is required"),
//     damplength: yup.string().required("length is required"),
//     dampbreadth: yup.string().required("breath is required"),
//     damparea: yup.string().required("Area is required"),
//   }),

//   "Formwork/Capentry works": yup.object().shape({
//     formworkLength: yup.string().required("Length is required"),
//     formworkBreadth: yup.string().required("Breadth is required"),
//     formworkArea: yup.string().required("Area is required"),
//   }),

//   "Blockwork and Brickwork": yup.object().shape({
//     blockworklength: yup.string().required("Length is required"),
//     blockworkbreadth: yup.string().required("Breadth is required"),
//     blockworkarea: yup.string().required("Area is required"),
//   }),

//   "plastering works": yup.object().shape({
//     plasterlength: yup.string().required("Length is required"),
//     plasterbreadth: yup.string().required("Breadth is required"),
//     plasterarea: yup.string().required("Area is required"),
//   }),

//   "Screeding works": yup.object().shape({
//     Screedinglength: yup.string().required("Length is required"),
//     Screedingbreadth: yup.string().required("Breadth is required"),
//     Screedingarea: yup.string().required("Area is required"),
//   }),
// };

// const StepTwo: React.FC<StepTwoProps> = ({ validateStep, setFormData }) => {
//   const [itemOfWork, setItemOfWork] = useState<string | null>(null);

//   // Dynamically choose schema based on itemOfWork
//   const validationSchema = itemOfWork ? schemas[itemOfWork] : null;

//   const inputsByItemOfWork: Record<string, { name: string; label: string }[]> =
//     {
//       "Clearing Works": [
//         { name: "siteLength", label: "Site Length" },
//         { name: "siteBreadth", label: "Site Breadth" },
//         { name: "siteArea", label: "Site Area" },
//       ],
//       "Setting out": [
//         { name: "perimeter", label: "Perimeter" },
//         { name: "girth", label: "Girth of the Building" },
//         { name: "pegBundles", label: "Peg Bundles" },
//         { name: "tieRods", label: "Number of Tie-Rods" },
//         { name: "ropeQuantity", label: "Rope Quantity" },
//       ],
//       Excavation: [
//         { name: "exradius", label: "Radius" },
//         { name: "exheight", label: "Height" },
//         { name: "exlength", label: "Length" },
//         { name: "exwidth", label: "Width" },
//         { name: "exdepth", label: "Depth" },
//         { name: "exvolume", label: "Volume" },
//       ],
//       "Filling works": [
//         { name: "fillingradius", label: "Radius" },
//         { name: "fillingheight", label: "Height" },
//         { name: "fillinglength", label: "Length" },
//         { name: "fillingwidth", label: "Width" },
//         { name: "fillingdepth", label: "Depth" },
//         { name: "fillingvolume", label: "Volume" },
//       ],

//       "Concrete/Binding Works": [
//         { name: "concreteradius", label: "Radius" },
//         { name: "concreteheight", label: "Height" },
//         { name: "concretelength", label: "Length" },
//         { name: "concretewidth", label: "Width" },
//         { name: "concretedepth", label: "Depth" },
//         { name: "concretevolume", label: "Volume" },
//       ],

//       "Damp proofing works": [
//         { name: "dampbreadth", label: "Breadth" },
//         { name: "damplength", label: "Length" },
//         { name: "damparea", label: "Area" },
//       ],

//       "Reinforcement/Iron bending works": [
//         { name: "dampgirth", label: "Girth" },
//         { name: "dampbreadth", label: "Breadth" },
//         { name: "damplength", label: "Length" },
//         { name: "damparea", label: "Area" },
//       ],

//       "Formwork/Capentry works": [
//         { name: "formworkbreadth", label: "Breadth" },
//         { name: "formworklength", label: "Length" },
//         { name: "formworkarea", label: "Area" },
//       ],

//       "Blockwork and Brickwork": [
//         { name: "blockworkbreadth", label: "Breadth" },
//         { name: "blockworklength", label: "Length" },
//         { name: "blockworkarea", label: "Area" },
//       ],

//       "plastering works": [
//         { name: "plasterbreadth", label: "Breadth" },
//         { name: "plasterlength", label: "Length" },
//         { name: "plasterarea", label: "Area" },
//       ],

//       "Screeding works": [
//         { name: "Screedingbreadth", label: "Breadth" },
//         { name: "Screedinglength", label: "Length" },
//         { name: "Screedingarea", label: "Area" },
//       ],
//     };

//   const {
//     control,
//     trigger,
//     getValues,
//     clearErrors,
//     formState: { errors },
//   } = useForm({
//     resolver: validationSchema ? yupResolver(validationSchema) : undefined,
//     defaultValues: itemOfWork
//       ? inputsByItemOfWork[itemOfWork]?.reduce(
//           (acc: any, input: any) => ({ ...acc, [input.name]: "" }),
//           {}
//         )
//       : {},
//   });

//   // Fetch ItemOfWork from localStorage
//   useEffect(() => {
//     const storedItemOfWork = localStorage.getItem("ItemOfWork");
//     setItemOfWork(storedItemOfWork);
//   }, []);

// useEffect(() => {
//   validateStep(async () => {
//     const isValid = await trigger(); // Trigger validation for all fields
//     if (isValid) {
//       const formData = getValues();
//       setFormData(formData);

//       // Store data in localStorage
//       if (itemOfWork) {
//         localStorage.setItem(
//           `${itemOfWork} Inputs`,
//           JSON.stringify(formData)
//         );
//       }
//     }
//     return isValid;
//   });
// }, [trigger, validateStep, setFormData, getValues, itemOfWork]);

//   // Render inputs dynamically based on ItemOfWork
//   const renderInputs = () => {
//     const inputsByItemOfWork: Record<
//       string,
//       { name: string; label: string }[]
//     > = {
//       "Clearing Works": [
//         { name: "siteLength", label: "Site Length" },
//         { name: "siteBreadth", label: "Site Breadth" },
//         { name: "siteArea", label: "Site Area" },
//       ],
//       "Setting out": [
//         { name: "perimeter", label: "Perimeter" },
//         { name: "girth", label: "Girth of the Building" },
//         { name: "pegBundles", label: "Peg Bundles" },
//         { name: "tieRods", label: "Number of Tie-Rods" },
//         { name: "ropeQuantity", label: "Rope Quantity" },
//       ],
//       Excavation: [
//         { name: "exradius", label: "Radius" },
//         { name: "exheight", label: "Height" },
//         { name: "exlength", label: "Length" },
//         { name: "exwidth", label: "Width" },
//         { name: "exdepth", label: "Depth" },
//         { name: "exvolume", label: "Volume" },
//       ],
//       "Filling works": [
//         { name: "fillingradius", label: "Radius" },
//         { name: "fillingheight", label: "Height" },
//         { name: "fillinglength", label: "Length" },
//         { name: "fillingwidth", label: "Width" },
//         { name: "fillingdepth", label: "Depth" },
//         { name: "fillingvolume", label: "Volume" },
//       ],

//       "Concrete/Binding Works": [
//         { name: "concreteradius", label: "Radius" },
//         { name: "concreteheight", label: "Height" },
//         { name: "concretelength", label: "Length" },
//         { name: "concretewidth", label: "Width" },
//         { name: "concretedepth", label: "Depth" },
//         { name: "concretevolume", label: "Volume" },
//       ],

//       "Damp proofing works": [
//         { name: "damplength", label: "Length" },
//         { name: "dampbreadth", label: "Width" },
//         { name: "damparea", label: "Area" },
//       ],

//       "Reinforcement/Iron bending works": [
//         { name: "dampgirth", label: "Girth" },
//         { name: "damplength", label: "Length" },
//         { name: "dampbreadth", label: "Breadth" },
//         { name: "damparea", label: "Area" },
//       ],
//       "Formwork/Capentry works": [
//         { name: "formworklength", label: "Length" },
//         { name: "formworkbreadth", label: "Breadth" },
//         { name: "formworkarea", label: "Area" },
//       ],

//       "Blockwork and Brickwork": [
//         { name: "blockworklength", label: "Length" },
//         { name: "blockworkbreadth", label: "Breadth" },
//         { name: "blockworkarea", label: "Area" },
//       ],

//       "plastering works": [
//         { name: "plasterlength", label: "Length" },
//         { name: "plasterbreadth", label: "Breadth" },
//         { name: "plasterarea", label: "Area" },
//       ],

//       "Screeding works": [
//         { name: "Screedinglength", label: "Length" },
//         { name: "Screedingbreadth", label: "Breadth" },
//         { name: "Screedingarea", label: "Area" },
//       ],
//     };

//     const inputs = itemOfWork ? inputsByItemOfWork[itemOfWork] : [];

//     if (!inputs || inputs.length === 0) {
//       return <p>No valid Item of Work found or inputs are not defined.</p>;
//     }

//     return inputs.map(({ name, label }: any) => (
//       <InputField
//         key={name}
//         name={name}
//         control={control}
//         label={label}
//         placeholder={`Enter ${label.toLowerCase()}`}
//         error={errors[name] as FieldError | undefined}
//         clearErrors={clearErrors}
//       />
//     ));
//   };

//   return (
//     <div className="mt-20 flex items-center justify-center">
//       <div className="max-w-2xl w-full lg:w-[50rem] bg-white border-2 p-8 shadow-md rounded-md">
//         <h2 className="text-lg font-semibold mb-6 text-black">
//           Specify your <span className="text-yellow-900"> {itemOfWork}</span>{" "}
//           inputs:
//         </h2>
//         {renderInputs()}
//       </div>
//     </div>
//   );
// };

// const InputField: React.FC<InputFieldProps> = ({
//   name,
//   control,
//   label,
//   placeholder,
//   error,
//   clearErrors,
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
//           type="text"
//           placeholder={placeholder}
//           {...field}
//           onChange={(e) => {
//             field.onChange(e);
//             clearErrors(name);
//           }}
//           className={`w-full py-3 border text-black rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-yellow-700 ${
//             error ? "border-red-600" : ""
//           }`}
//         />
//       )}
//     />
//     {error && <p className="text-red-600 text-sm">{error.message}</p>}
//   </div>
// );

// export default StepTwo;

// import React, { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// interface StepTwoProps {
//   validateStep: (triggerValidation: () => Promise<boolean>) => void;
//   setFormData: (data: any) => void;
// }

// const validationSchemaClearing = yup.object().shape({
//   siteLength: yup.string().required("Site Length is required"),
//   siteBreadth: yup.string().required("Site Breadth is required"),
//   siteArea: yup.string().required("Site Area is required"),
// });

// const validationSchemaSettings = yup.object().shape({
//   perimeter: yup.string().required("Perimeter is required"),
//   girth: yup.string().required("Girth is required"),
//   pegBundles: yup.string().required("Peg Bundles is required"),
//   tieRods: yup.string().required("Number of Tie-Rods is required"),
//   ropeQuantity: yup.string().required("Rope Quantity is required"),
// });

// const validationSchemaExcavation = yup.object().shape({
//   exradius: yup.string().required("Excavation radius is required"),
//   exheight: yup.string().required("Excavation height is required"),
//   exlength: yup.string().required("Excavation length is required"),
//   exwidth: yup.string().required(" Excavation width is required"),
//   exdepth: yup.string().required("Excavation dept is required"),
//   exvolume: yup.string().required("Excavation volume is required"),
// });

// const validationSchemaFilling = yup.object().shape({
//   fillingradius: yup.string().required(" filling radius is required"),
//   fillingheight: yup.string().required(" filling height is required"),
//   fillinglength: yup.string().required(" filling length is required"),
//   fillingwidth: yup.string().required("  filling width is required"),
//   fillingdepth: yup.string().required(" filling dept is required"),
//   fillingvolume: yup.string().required(" filling volume is required"),
// });

// const StepTwo: React.FC<StepTwoProps> = ({ validateStep, setFormData }) => {
//   const [itemOfWork, setItemOfWork] = useState<string | null>(null);

//   // Dynamically choose schema and form defaults based on `itemOfWork`
//   let validationSchema: any;

//   if (itemOfWork === "Setting out") {
//     validationSchema = validationSchemaSettings;
//   } else if (itemOfWork === "Clearing Works") {
//     validationSchema = validationSchemaClearing;
//   } else if (itemOfWork === "Excavation") {
//     validationSchema = validationSchemaExcavation;
//   } else if (itemOfWork === "Filling-works") {
//     validationSchema = validationSchemaFilling;
//   }

//   const {
//     control,
//     trigger,
//     getValues,
//     clearErrors,
//     formState: { errors },
//   }: any = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {},
//   });

//   // Fetch ItemOfWork from localStorage
//   useEffect(() => {
//     const storedItemOfWork = localStorage.getItem("ItemOfWork");
//     setItemOfWork(storedItemOfWork);
//   }, []);

//   useEffect(() => {
//     validateStep(async () => {
//       const isValid = await trigger(); // Trigger validation for all fields
//       if (isValid) {
//         const formData = getValues();
//         setFormData(formData); // Pass valid form data to the parent

//         // Store data in localStorage
//         if (itemOfWork === "Clearing Works") {
//           localStorage.setItem("Clearing Inputs", JSON.stringify(formData));
//         } else if (itemOfWork === "Setting out") {
//           localStorage.setItem("Setting Out Inputs", JSON.stringify(formData));
//         } else if (itemOfWork === "Excavation") {
//           localStorage.setItem("Excavation Inputs", JSON.stringify(formData));
//         } else if (itemOfWork === "Filling-works") {
//           localStorage.setItem(
//             "Filling-works Inputs",
//             JSON.stringify(formData)
//           );
//         }
//       }
//       return isValid;
//     });
//   }, [trigger, validateStep, setFormData, getValues, itemOfWork]);

//   // Render inputs dynamically based on ItemOfWork
//   const renderInputs = () => {
//     if (itemOfWork === "Clearing Works") {
//       return (
//         <>
//           <InputField
//             name="siteLength"
//             control={control}
//             label="Site Length"
//             placeholder="Enter site length"
//             error={errors.siteLength}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="siteBreadth"
//             control={control}
//             label="Site Breadth"
//             placeholder="Enter site breadth"
//             error={errors.siteBreadth}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="siteArea"
//             control={control}
//             label="Site Area"
//             placeholder="Enter site area"
//             error={errors.siteArea}
//             clearErrors={clearErrors}
//           />
//         </>
//       );
//     }

//     if (itemOfWork === "Setting out") {
//       return (
//         <>
//           <InputField
//             name="perimeter"
//             control={control}
//             label="Perimeter"
//             placeholder="Enter perimeter"
//             error={errors.perimeter}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="girth"
//             control={control}
//             label="Girth of the Building"
//             placeholder="Enter girth of the building"
//             error={errors.girth}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="pegBundles"
//             control={control}
//             label="Peg Bundles"
//             placeholder="Enter number of peg bundles"
//             error={errors.pegBundles}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="tieRods"
//             control={control}
//             label="Number of Tie-Rods"
//             placeholder="Enter number of tie-rods"
//             error={errors.tieRods}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="ropeQuantity"
//             control={control}
//             label="Rope Quantity"
//             placeholder="Enter rope quantity"
//             error={errors.ropeQuantity}
//             clearErrors={clearErrors}
//           />
//         </>
//       );
//     }

//     if (itemOfWork === "Excavation") {
//       return (
//         <>
//           <InputField
//             name="exradius"
//             control={control}
//             label="Radius"
//             placeholder="Enter excavation  Radius"
//             error={errors.exradius}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="exheight"
//             control={control}
//             label="Height"
//             placeholder="Enter excavation  height"
//             error={errors.exheight}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="exlength"
//             control={control}
//             label="Length"
//             placeholder="excavation length"
//             error={errors.exlength}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="exwidth"
//             control={control}
//             label="Width"
//             placeholder="excavation width"
//             error={errors.exwidth}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="exdepth"
//             control={control}
//             label="Depth"
//             placeholder="Enter excavation Depth"
//             error={errors.exdepth}
//             clearErrors={clearErrors}
//           />

//           <InputField
//             name="exvolume"
//             control={control}
//             label="Volume"
//             placeholder="Enter excavation Volume"
//             error={errors.exdepth}
//             clearErrors={clearErrors}
//           />
//         </>
//       );
//     }

//     if (itemOfWork === "Filling works") {
//       return (
//         <>
//           <InputField
//             name="fillingradius"
//             control={control}
//             label="Radius"
//             placeholder="Enter  filling  Radius"
//             error={errors.fillingradius}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="fillingheight"
//             control={control}
//             label="Height"
//             placeholder="Enter  filling height"
//             error={errors.fillingheight}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="fillinglength"
//             control={control}
//             label="Length"
//             placeholder="filling length"
//             error={errors.fillinglength}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="fillingwidth"
//             control={control}
//             label="Width"
//             placeholder="filling width"
//             error={errors.fillingwidth}
//             clearErrors={clearErrors}
//           />
//           <InputField
//             name="fillingdepth"
//             control={control}
//             label="Depth"
//             placeholder="Enter filling Depth"
//             error={errors.fillingdepth}
//             clearErrors={clearErrors}
//           />

//           <InputField
//             name="fillingvolume"
//             control={control}
//             label="Volume"
//             placeholder="Enter filling Volume"
//             error={errors.fillingdepth}
//             clearErrors={clearErrors}
//           />
//         </>
//       );
//     }

//     return <p>No valid Item of Work found in local storage.</p>;
//   };

//   return (
//     <div className="mt-20 flex items-center justify-center">
//       <div className="max-w-2xl w-full lg:w-[50rem] bg-white border-2 p-8 shadow-md rounded-md">
//         <h2 className="text-lg font-semibold mb-6 text-black">
//           Specify your {itemOfWork} inputs:
//         </h2>
//         {renderInputs()}
//       </div>
//     </div>
//   );
// };

// // Reusable InputField component
// const InputField = ({
//   name,
//   control,
//   label,
//   placeholder,
//   error,
//   clearErrors,
// }: {
//   name: string;
//   control: any;
//   label: string;
//   placeholder: string;
//   error: any;
//   clearErrors: (fieldName?: string) => void;
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
//           placeholder={placeholder}
//           {...field}
//           onChange={(e) => {
//             field.onChange(e); // Update the field's value
//             clearErrors(name); // Clear the error for this field
//           }}
//           className={`w-full py-3 border text-black rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-yellow-700 ${
//             error ? "border-red-600" : ""
//           }`}
//         />
//       )}
//     />
//     {error && <p className="text-red-600 text-sm">{error.message}</p>}
//   </div>
// );

// export default StepTwo;

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
