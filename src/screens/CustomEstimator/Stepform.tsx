"use client";
import React from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import DynamicSelect from "./DynamicSelect";
import StepTwo from "./StepTwo";



const Stepform = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(true);

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep((cur) => cur + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep((cur) => cur - 1);
    }
  };

  React.useEffect(() => {
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
    <div className="w-full  md:px-24 px-8 py-8 bg-white rounded-2xl mb-20 shadow-xl">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          {/* <UserIcon className="h-5 w-5" /> */}
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
          {/* <CogIcon className="h-5 w-5" /> */}
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
          {/* <BuildingLibraryIcon className="h-5 w-5" /> */}
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

      {/* Step Content */}
      <div className="mt-16 flex justify-center items-center">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep} className="bg-yellow-800">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Stepform;
