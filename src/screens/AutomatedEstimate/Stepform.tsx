"use client";
import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import DynamicSelect from "./DynamicSelect";
import StepTwo from "./StepTwo";
import { toast } from "react-toastify";
import axiosInstance from "@/Globals/Interceptor";

const Stepform = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [loading, setLoading] = useState(false);

  const ItemOfWork = localStorage.getItem("ItemOfWork") || "";
  const material1 = localStorage.getItem("clearing works") || "";
  const material2 = localStorage.getItem("landAreaComposition") || "";
  const material3 = localStorage.getItem("IsTheLandArea") || "";
  const material4 = localStorage.getItem("ShapeOfBuilding") || "";
  const material5 =
    localStorage.getItem("Disposal-of-Excavated-Materials") || "";
  const material6 =
    localStorage.getItem("Would-your-excavation-require-shoring") || "";
  const material7 = localStorage.getItem("length-to-be-shored") || "";
  const material8 =
    localStorage.getItem("Disposal-of-Excavated-Materials") || "";
  const material9 = localStorage.getItem("Filling-works") || "";
  const material10 =
    localStorage.getItem("What-area-do-you-require-concrete-for") || "";
  const material11 = localStorage.getItem("What-type-of-concrete-mix") || "";
  const material12 = localStorage.getItem("Damp-proofing-works") || "";

  //reforcement
  const material13 = localStorage.getItem("is-the-land-area") || "";

  const material14 = localStorage.getItem("Slabs") || "";

  const material15 =
    localStorage.getItem("Where-you-need-your-reinforcement-for") || "";

  const material16 =
    localStorage.getItem("material-used-for-your-lintel") || "";

  const material17 = localStorage.getItem("Suspended-beams") || "";

  //formwork
  const material19 = localStorage.getItem("Is-the-land-area") || "";
  const material20 = localStorage.getItem("Slabstwo") || "";
  const material21 = localStorage.getItem("Reinforcement") || "";
  const material22 =
    localStorage.getItem("Where-do-you-need-your-reinforcement-for") || "";
  const material23 = localStorage.getItem("(a)Ground Beams") || "";
  const material24 = localStorage.getItem("Formwork/Carpentry-works") || "";
  const material25 = localStorage.getItem("(a)Ground Beams") || "";

  const material26 = localStorage.getItem("(a)Ground Beams") || "";

  //blockwork

  const material27 = localStorage.getItem("Blockwork-and-Brickwork") || "";

  const material28 = localStorage.getItem("What-type-of-roof") || "";

  //platering
  const material29 =
    localStorage.getItem("What-is-the-thickness-of-your-plastering") || "";
  const material30 =
    localStorage.getItem("What-is-your-plastering-mix-ratio") || "";

  const [formData, setFormData] = useState({
    type: "automated",
    work_items: ItemOfWork,
    specifications: "Brick house with solar panels",
    to_array: JSON.stringify({ materials: [] }),
    variable: "Variable details",
    to_html: "<p>Custom HTML</p>",
    require_custom_building: "yes",
    other_information: "Additional details",
    is_urgent: true,
    agree: true,
    custom_more: false,
    classes: "Builder class A",
  });

  useEffect(() => {
    // Dynamically set the materials array based on ItemOfWork
    let materials: any = [];
    if (ItemOfWork === "Clearing Works") {
      materials = [ItemOfWork, material1, material2, material3];
    } else if (ItemOfWork === "Setting out") {
      materials = [ItemOfWork, material4];
    } else if (ItemOfWork === "Excavation") {
      materials = [ItemOfWork, material5, material6, material7, material8];
    } else if (ItemOfWork === "Filling works") {
      materials = [ItemOfWork, material9];
    } else if (ItemOfWork === "Concrete/Binding Works") {
      materials = [ItemOfWork, material10, material11];
    } else if (ItemOfWork === "Damp proofing works") {
      materials = [ItemOfWork, material12];
    } else if (ItemOfWork === "Reinforcement/Iron bending works") {
      materials = [
        ItemOfWork,
        material13,
        material14,
        material15,
        material16,
        material17,
      ];
    } else if (ItemOfWork === "Formwork/Capentry works") {
      materials = [
        ItemOfWork,
        material19,
        material20,
        material21,
        material22,
        material23,
        material24,
        material25,
        material26,
      ];
    } else if (ItemOfWork === "Blockwork and Brickwork") {
      materials = [ItemOfWork, material27];
    } else if (ItemOfWork === "Roofing works") {
      materials = [ItemOfWork, material28];
    } else if (ItemOfWork === "platering works") {
      materials = [ItemOfWork, material29, material30];
    }

    // Update formData with the new materials array
    setFormData((prevData) => ({
      ...prevData,
      to_array: JSON.stringify({ materials }), // Store as a valid JSON string
    }));
  }, [ItemOfWork]);

  const handleNext = async () => {
    console.log("Current Step:", activeStep); // Debug log
    if (activeStep === 1) {
      // If on Step 2
      console.log("Submitting form on Step 2...");
      setLoading(true); // Show loading spinner

      try {
        const response = await axiosInstance.post(
          "/api/users/estimator",
          formData
        );
        console.log("Form submitted successfully:", response.data);
        toast.success("Automated Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit automated form.");
      } finally {
        setLoading(false); // Hide loading spinner
      }
    } else if (isLastStep) {
      // If on the last step (Step 3)
      setLoading(true); // Show loading spinner
      try {
        const response = await axiosInstance.post(
          "/api/users/estimator",
          formData
        );
        console.log("Form submitted successfully:", response.data);
        toast.success("Automated Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit automated form.");
      } finally {
        setLoading(false); // Hide loading spinner
      }
    } else {
      // Move to the next step
      setActiveStep((cur) => cur + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep((cur) => cur - 1);
    }
  };

  useEffect(() => {
    setIsLastStep(activeStep === 2);
    setIsFirstStep(activeStep === 0);
  }, [activeStep]);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <DynamicSelect />;
      case 1:
        return <StepTwo />;
      case 2:
        return <Typography variant="h4">Final Step 3</Typography>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full md:px-24 px-8 py-8 bg-white rounded-2xl mb-10 shadow-xl">
      <Stepper activeStep={activeStep}>
        <Step onClick={() => setActiveStep(0)}>
          <h1>1</h1>
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
            >
              Work items
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <h1>2</h1>
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
            >
              Specifications
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <h1>3</h1>
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
            >
              Results
            </Typography>
          </div>
        </Step>
      </Stepper>

      <div className="mt-16 flex justify-center items-center">
        {renderStepContent()}
      </div>

      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={loading}
          className="bg-yellow-800"
        >
          {loading ? (
            <Spinner className="h-5 w-5" />
          ) : isLastStep ? (
            "Submit"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Stepform;

// "use client";
// import React from "react";
// import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
// import DynamicSelect from "./DynamicSelect";
// import StepTwo from "./StepTwo";

// const Stepform = () => {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [isLastStep, setIsLastStep] = React.useState(false);
//   const [isFirstStep, setIsFirstStep] = React.useState(true);

//   const handleNext = () => {
//     if (!isLastStep) {
//       setActiveStep((cur) => cur + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (!isFirstStep) {
//       setActiveStep((cur) => cur - 1);
//     }
//   };

//   React.useEffect(() => {
//     setIsLastStep(activeStep === 2);
//     setIsFirstStep(activeStep === 0);
//   }, [activeStep]);

// const renderStepContent = () => {
//   switch (activeStep) {
//     case 0:
//       return <DynamicSelect />;
//     case 1:
//       return <StepTwo />;
//     case 2:
//       return <Typography variant="h4">Final Step 3</Typography>;
//     default:
//       return null;
//   }
// };

//   return (
//     <div className="w-full  md:px-24 px-8 py-8 bg-white rounded-2xl mb-20 shadow-xl">
//       <Stepper
//         activeStep={activeStep}
//         isLastStep={(value) => setIsLastStep(value)}
//         isFirstStep={(value) => setIsFirstStep(value)}
//       >
//         <Step onClick={() => setActiveStep(0)}>
//           {/* <UserIcon className="h-5 w-5" /> */}
//           <h1>1</h1>
//           <div className="absolute -bottom-[4.5rem] w-max text-center">
//             <Typography
//               variant="h6"
//               color={activeStep === 0 ? "blue-gray" : "gray"}
//             >
//               Work items
//             </Typography>
//           </div>
//         </Step>
//         <Step onClick={() => setActiveStep(1)}>
//           {/* <CogIcon className="h-5 w-5" /> */}
//           <h1>2</h1>
//           <div className="absolute -bottom-[4.5rem] w-max text-center">
//             <Typography
//               variant="h6"
//               color={activeStep === 1 ? "blue-gray" : "gray"}
//             >
//               Personal Details
//             </Typography>
//           </div>
//         </Step>
//         <Step onClick={() => setActiveStep(2)}>
//           {/* <BuildingLibraryIcon className="h-5 w-5" /> */}
//           <h1>3</h1>
//           <div className="absolute -bottom-[4.5rem] w-max text-center">
//             <Typography
//               variant="h6"
//               color={activeStep === 2 ? "blue-gray" : "gray"}
//             >
//               Results
//             </Typography>
//           </div>
//         </Step>
//       </Stepper>

//       {/* Step Content */}
//       <div className="mt-16 flex justify-center items-center">
//         {renderStepContent()}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="mt-16 flex justify-between">
//         <Button onClick={handlePrev} disabled={isFirstStep}>
//           Prev
//         </Button>
//         <Button onClick={handleNext} disabled={isLastStep} className="bg-yellow-800">
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Stepform;
