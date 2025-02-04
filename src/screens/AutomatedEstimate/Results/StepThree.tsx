import React, { useEffect, useState } from "react";
import SettingOut from "./SettingOut";
import Excavation from "./Excavation";
import FillingWorks from "./FillingWorks";
import ClearWorkResult from "./ClearingWork";
import ConcreteAndBlinding from "./ConcreateAndBinding";
import DampProofing from "./Dampproving";
import Reinforcement from "./Reinforcement";
import Formwork from "./Formwork";
import BlockWorkResult from "./BlockworkResult";
import PlasteringResult from "./PlasteringResult";
import ScreedingResult from "./ScreedingResult";

const ResultPage: React.FC = () => {
  const [itemOfWork, setItemOfWork] = useState<string>("");

  useEffect(() => {
    const work = localStorage.getItem("ItemOfWork") || "";
    setItemOfWork(work);
  }, []);
  //Damp proofing works
  const renderContent = () => {
    switch (itemOfWork) {
      case "Setting out":
        return <SettingOut />;
      case "Excavation":
        return <Excavation />;
      case "Filling works":
        return <FillingWorks />;
      case "Clearing Works":
        return <ClearWorkResult />;
      case "Concrete/Binding Works":
        return <ConcreteAndBlinding />;
      case "Damp proofing works":
        return <DampProofing />;
      case "Reinforcement/Iron bending works":
        return <Reinforcement />;
      case "Formwork/Capentry works":
        return <Formwork />;
      case "Blockwork and Brickwork":
        return <BlockWorkResult />;
      case "plastering works":
        return <PlasteringResult />;

      case "Screeding works":
        return <ScreedingResult />;

      default:
        return <p className="text-gray-600">No work details available.</p>;
    }
  };

  return (
    <div className="min-auto  px-6 flex flex-col items-center mt-10">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
        {renderContent()}
        <a
          href="/applicable-material-labour-price"
          className="inline-block bg-yellow-800 text-white px-4 py-2 rounded-md hover:bg-yellow-800"
        >
          View Material and Labour Price List
        </a>
      </div>
    </div>
  );
};

export default ResultPage;

// // components/ResultPage.tsx
// import React, { useEffect, useState } from "react";

// interface Content {
//   title: string;
//   description: string;
//   duration: string;
//   cost: string;
//   note: string;
// }

// const ResultPage: React.FC = () => {
//   const [itemOfWork, setItemOfWork] = useState<string>("");
//   const [content, setContent] = useState<Content | null>(null);

//   useEffect(() => {
//     const work = localStorage.getItem("ItemOfWork") || "";
//     setItemOfWork(work);
//     loadContent(work);
//   }, []);

//   const loadContent = (work: string) => {
//     const results: Record<string, Content> = {
//       "Setting out": {
//         title: "Setting Out Details",
//         description:
//           "Setting out involves marking out the area based on the project plan. It ensures accuracy and alignment for the construction.",
//         duration: "1 day",
//         cost: "N10,000",
//         note: "Accuracy is crucial in this phase to avoid errors in subsequent stages.",
//       },
//       Excavation: {
//         title: "Excavation Details",
//         description:
//           "Excavation involves removing soil to prepare the site for foundations and other structural elements.",
//         duration: "3 days",
//         cost: "N50,000",
//         note: "Excavation equipment or manual labor may be required based on the project scope.",
//       },
//       "Filling works": {
//         title: "Filling Works Details",
//         description:
//           "Filling works involve adding soil or materials to level or strengthen the construction area.",
//         duration: "2 days",
//         cost: "N30,000",
//         note: "Ensure proper compaction to maintain structural integrity.",
//       },
//     };
//     setContent(results[work] || null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
//       <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">
//           {content?.title || "Work Details"}
//         </h1>
//         <p className="text-gray-600 mb-4">{content?.description}</p>

//         {content && (
//           <div className="bg-gray-100 rounded-lg p-4 mb-4">
//             <p className="text-sm text-gray-500">
//               Estimated Duration: <span className="font-medium">{content.duration}</span>
//             </p>
//             <p className="text-sm text-gray-500">
//               Estimated Cost: <span className="font-medium">{content.cost}</span>
//             </p>
//           </div>
//         )}

//         <p className="text-gray-500 mb-6">Note: {content?.note}</p>

//         <a
//           href="/rates"
//           className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//         >
//           View Material and Labour Price List
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ResultPage;
