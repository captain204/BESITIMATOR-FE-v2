import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Select,
  Option,
} from "@material-tailwind/react";

export default function SearchTrade() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="flex justify-center items-center max-w-6xl mx-auto">
      <Card className="w-full max-w-md  shadow-lg border">
        <CardBody>
          <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Search For a Construction Tradesmen or Vendor
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Are you a construction tradesmen or a construction vendor?
            </label>
            <Select label="Select Category">
              <Option>Construction Tradesmen</Option>
              <Option>Construction Vendor</Option>
            </Select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              01. Construction Tradesmen:
            </label>
            <Select label="Select Role">
              <Option>Labour/Foreman</Option>
              <Option>Carpenter</Option>
              <Option>BrickLayer</Option>
              <Option>Equipmentment Operator</Option>
              <Option>Estimator</Option>
              <Option>HVAC Technician</Option>
              <Option>Plumber</Option>
              <Option>Electrician</Option>
              <Option>Painter</Option>
              <Option>Safty manager</Option>
              <Option>Roofer</Option>
              <Option>Welder/Fabrigator</Option>
              <Option>Construction manager</Option>
              <Option>Land scaper</Option>
              <Option>Tiler</Option>
              <Option>Screteder</Option>
              <Option>POP installer</Option>
              <Option>Iron Bender</Option>
              <Option>Paver</Option>
              <Option>Wood work Fabricator</Option>
              <Option>Concrete floor designer</Option>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button className=" bg-yellow-800" onClick={handleModalToggle}>
              Submit
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <p className="text-gray-700">
              The Information you are searching for is unavailable right now.
            </p>
            <Button color="red" className="mt-4" onClick={handleModalToggle}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
