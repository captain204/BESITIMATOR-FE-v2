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
// import StepTwo from "./StepTwo";
import { toast } from "react-toastify";
import axiosInstance from "@/Globals/Interceptor";
import ResultPage from "./Results/StepThree";
import { useRouter } from "next/navigation";
import StepTwoForm from "./SteptwogroupedAutomated/Clearingform";
import ExcavationForm from "./SteptwogroupedAutomated/ExcavationForm";
import SettingOutForm from "./SteptwogroupedAutomated/SettingOutForm";
import FillingWorks from "./SteptwogroupedAutomated/FillingWorksForm/FillingWorks";
import ConcreteForm from "./SteptwogroupedAutomated/ConcreteForm";
import DampprovingForm from "./SteptwogroupedAutomated/DampProving";
import ColumnForm from "./SteptwogroupedAutomated/Reinforcementforms/Column";
import ForMultipleReinforcementform from "./SteptwogroupedAutomated/Reinforcementforms/GroundSuspendedLintelBeamform";
import Slabs from "./SteptwogroupedAutomated/Reinforcementforms/Slabs";
import SlapsForm from "./SteptwogroupedAutomated/FormworksForms/Slabs";
import ColumnFormworkForm from "./SteptwogroupedAutomated/FormworksForms/Column";
import LintelformworkForm from "./SteptwogroupedAutomated/FormworksForms/Lintel";
import GroundBeamFormworkForm from "./SteptwogroupedAutomated/FormworksForms/GroundSuspendedBeams";
import BlockworkForm from "./SteptwogroupedAutomated/Bloackwork";
import PlasteringForm from "./SteptwogroupedAutomated/Plastering";
import Screeding from "./SteptwogroupedAutomated/Screeding";
import Ceilingworksform from "./SteptwogroupedAutomated/Ceilingworksform";
import Paintingworksform from "./SteptwogroupedAutomated/PaintingForms";
import Tilingform from "./SteptwogroupedAutomated/Tiling";
import PavingStoneform from "./SteptwogroupedAutomated/PavingStone";
import FillingLevellingForm from "./SteptwogroupedAutomated/FillingWorksForm/FillingLevelingForm";

const Stepform = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [loading, setLoading] = useState(false);
  const [storedMaterials, setStoredMaterials] = useState<any>({});

  const [validateStepTwo, setValidateStepTwo] = useState<
    () => Promise<boolean>
  >(() => async () => true);

  const [formData, setFormData] = useState({
    type: "automated",
    work_items: "",
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
    if (typeof window !== "undefined" && activeStep === 1) {
      // Load data from localStorage into state
      const materials = {
        ItemOfWork: localStorage.getItem("ItemOfWork") || "",
        material1: localStorage.getItem("clearing works") || "",
        material2: localStorage.getItem("landAreaComposition") || "",
        material3: localStorage.getItem("IsTheLandArea") || "",
        material4: localStorage.getItem("ShapeOfBuilding") || "",
        material5:
          localStorage.getItem("Disposal-of-Excavated-Materials") || "",
        material6:
          localStorage.getItem("Would-your-excavation-require-shoring") || "",
        material7: localStorage.getItem("length-to-be-shored") || "",
        material8:
          localStorage.getItem("Disposal-of-Excavated-Materials") || "",
        material9: localStorage.getItem("Filling-works") || "",
        material10:
          localStorage.getItem("What-area-do-you-require-concrete-for") || "",
        material11: localStorage.getItem("What-type-of-concrete-mix") || "",
        material12: localStorage.getItem("Damp-proofing-works") || "",
        material13: localStorage.getItem("is-the-land-area") || "",
        material14: localStorage.getItem("Slabs") || "",
        material15:
          localStorage.getItem("Where-you-need-your-reinforcement-for") || "",
        material16: localStorage.getItem("material-used-for-your-lintel") || "",
        material17: localStorage.getItem("Suspended-beams") || "",
        material19: localStorage.getItem("Is-the-land-area") || "",
        material20: localStorage.getItem("Slabstwo") || "",
        material21: localStorage.getItem("Reinforcement") || "",
        material22:
          localStorage.getItem("Where-do-you-need-your-reinforcement-for") ||
          "",
        material23: localStorage.getItem("(a)Ground Beams") || "",
        material24: localStorage.getItem("Formwork/Carpentry-works") || "",
        material25: localStorage.getItem("(a)Ground Beams") || "",
        material26: localStorage.getItem("(a)Ground Beams") || "",
        material27: localStorage.getItem("Blockwork-and-Brickwork") || "",
        material28: localStorage.getItem("What-type-of-roof") || "",
        material29:
          localStorage.getItem("What-is-the-thickness-of-your-plastering") ||
          "",
        material30:
          localStorage.getItem("What-is-your-plastering-mix-ratio") || "",
        material31: localStorage.getItem("thickness-of-floor-screeding") || "",
        material32: localStorage.getItem("ratio-of-screeding") || "",
        material33: localStorage.getItem("Wall-screeding") || "",
      };
      setStoredMaterials(materials);
    }
  }, [activeStep]);

  useEffect(() => {
    // Dynamically set the materials array based on ItemOfWork
    const materials: any = [];
    const ItemOfWork = storedMaterials.ItemOfWork;

    if (ItemOfWork === "Clearing Works") {
      materials.push(
        ItemOfWork,
        storedMaterials.material1,
        storedMaterials.material2,
        storedMaterials.material3
      );
    } else if (ItemOfWork === "Setting out") {
      materials.push(ItemOfWork, storedMaterials.material4);
    } else if (ItemOfWork === "Excavation") {
      materials.push(
        ItemOfWork,
        storedMaterials.material5,
        storedMaterials.material6,
        storedMaterials.material7,
        storedMaterials.material8
      );
    } else if (ItemOfWork === "Filling works") {
      materials.push(ItemOfWork, storedMaterials.material9);
    } else if (ItemOfWork === "Concrete/Binding Works") {
      materials.push(
        ItemOfWork,
        storedMaterials.material10,
        storedMaterials.material11
      );
    }
    // Continue with similar conditions...

    setFormData((prevData) => ({
      ...prevData,
      work_items: ItemOfWork,
      to_array: JSON.stringify({ materials }),
    }));
  }, [storedMaterials]);

  const handleNext = async () => {
    if (isLastStep) {
      router.push("/"); // Navigate to the home route
      return;
    }
    if (activeStep === 1) {
      const isValid = await validateStepTwo?.(); // Optional chaining for safety
      console.log("Validation status:", isValid); // Debug log
      if (!isValid) {
        toast.error("Please correct the errors before proceeding.");
        return;
      }
      setLoading(true);
      try {
        const response = await axiosInstance.post(
          "/api/users/estimator",
          formData
        );
        toast.success(`${formData?.work_items} submitted successfully!`);
        setActiveStep(2);
      } catch (error) {
        toast.error(`Failed to submit ${formData?.work_items}`);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep((cur) => cur + 1);
    }
  };

  // const handleNext = async () => {
  //   // Handle next step logic
  //   if (activeStep === 1 || isLastStep) {
  //     const isValid = await validateStepTwo(); // Trigger validation for Step 2
  //     if (!isValid) {
  //       return; // Stop advancing to the next step if validation fails
  //     }

  //     setLoading(true);
  //     try {
  //       const response = await axiosInstance.post(
  //         "/api/users/estimator",
  //         formData
  //       );
  //       toast.success("Form submitted successfully!");
  //       setActiveStep(2);
  //     } catch (error) {
  //       toast.error("Failed to submit form.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     setActiveStep((cur) => cur + 1);
  //   }
  // };

  const handlePrev = () => {
    if (!isFirstStep) setActiveStep((cur) => cur - 1);
  };

  useEffect(() => {
    setIsLastStep(activeStep === 2);
    setIsFirstStep(activeStep === 0);
  }, [activeStep]);

  const renderStepContent = () => {
    const ItemOfWork = storedMaterials?.ItemOfWork; // Ensure storedMaterials exists
    const getLocalStorageItem = (key: any, defaultValue: any) => {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key) || defaultValue;
      }
      return defaultValue;
    };

    const getLocalStorageItemtwo = (key: any, defaultValue: any) => {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key) || defaultValue;
      }
      return defaultValue;
    };

    const reinforcementFor = getLocalStorageItem(
      "Where-you-need-your-reinforcement-for",
      ""
    );

    const getLocalStorage = (key: any, defaultValue: any) => {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem(key) || defaultValue;
      }
      return defaultValue;
    };

    const fillingLeveling = getLocalStorage("Filling-works", "");

    // localStorage.getItem("Filling-works")

    const formwork = getLocalStorageItemtwo("Formwork/Carpentry-works-sub", "");

    switch (activeStep) {
      case 0:
        return <DynamicSelect />;

      case 1:
        if (ItemOfWork === "Clearing Works") {
          return (
            <StepTwoForm
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Excavation") {
          return (
            <ExcavationForm
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Setting out") {
          return (
            <SettingOutForm
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Filling works") {
          if (fillingLeveling === "Levelling and compacting") {
            return (
              <FillingLevellingForm
                validateStep={(validationFunction: any) =>
                  setValidateStepTwo(() => validationFunction)
                }
              />
            );
          } else
            return (
              <FillingWorks
                validateStep={(validationFunction: any) =>
                  setValidateStepTwo(() => validationFunction)
                }
              />
            );
        } else if (ItemOfWork === "Concrete/Binding Works") {
          return (
            <ConcreteForm
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Damp proofing works") {
          return (
            <DampprovingForm
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Reinforcement/Iron bending works") {
          // Handle "beam" and "lintel"
          if (reinforcementFor === "Column") {
            return (
              <ColumnForm
                validateStep={(validationFunction: any) =>
                  setValidateStepTwo(() => validationFunction)
                }
              />
            );
          } else if (reinforcementFor === "Slabs") {
            return (
              <Slabs
                validateStep={(validationFunction: any) =>
                  setValidateStepTwo(() => validationFunction)
                }
              />
            );
          } else {
            return (
              <ForMultipleReinforcementform
                validateStep={(validationFunction: any) =>
                  setValidateStepTwo(() => validationFunction)
                }
              />
            );
          }
        } else if (ItemOfWork === "Formwork/Capentry works") {
          // Handle "beam" and "lintel"
          if (formwork === "Column") {
            return (
              <ColumnFormworkForm
                validateStep={(validationFunction: any) =>
                  setValidateStepTwo(() => validationFunction)
                }
              />
            );
          } else if (formwork === "Slabs") {
            return (
              <SlapsForm
                validateStep={(validationFunction: any) =>
                  setValidateStepTwo(() => validationFunction)
                }
              />
            );
          } else if (formwork === "Lintels") {
            return (
              <LintelformworkForm
                validateStep={(validationFunction: any) =>
                  setValidateStepTwo(() => validationFunction)
                }
              />
            );
          } else {
            return (
              <GroundBeamFormworkForm
                validateStep={(validationFunction: any) =>
                  setValidateStepTwo(() => validationFunction)
                }
              />
            );
          }
        } else if (ItemOfWork === "Blockwork and Brickwork") {
          return (
            <BlockworkForm
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "plastering works") {
          return (
            <PlasteringForm
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Screeding works") {
          return (
            <Screeding
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Ceiling works") {
          return (
            <Ceilingworksform
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Painting works") {
          return (
            <Paintingworksform
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Tiling/Granite Slap/Facing Brick works") {
          return (
            <Tilingform
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else if (ItemOfWork === "Paving stone Works") {
          return (
            <PavingStoneform
              validateStep={(validationFunction: any) =>
                setValidateStepTwo(() => validationFunction)
              }
            />
          );
        } else {
          return <div>Unknown ItemOfWork</div>;
        }

      case 2:
        return <ResultPage />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full md:px-24 px-12 py-8 bg-white border rounded-2xl mb-10 shadow-xl">
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
            <div className="flex ">
              <Spinner className="h-5 w-5 mr-1" />
              loading...
            </div>
          ) : isLastStep ? (
            "go back to home"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Stepform;
