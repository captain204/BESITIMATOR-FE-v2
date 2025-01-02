// pages/RegisterForm.tsx
"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Checkbox,
  Textarea,
} from "@material-tailwind/react";

const RegisterForm = () => {
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "Construction Tradesmen",
    tradesmenTypes: [] as string[],
    profilePicture: null as File | null,
    jobPictures: [] as File[],
    description: "",
    email: "",
    phone: "",
    guarantorName: "",
    guarantorContact: "",
  });

  const handleChange: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        tradesmenTypes: checked
          ? [...prev.tradesmenTypes, value]
          : prev.tradesmenTypes.filter((item) => item !== value),
      }));
    } else if (type === "file") {
      if (name === "profilePicture") {
        setFormData((prev) => ({
          ...prev,
          profilePicture: files?.[0] || null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          jobPictures: files ? Array.from(files) : [],
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  useEffect(() => {
    if (formData.profilePicture) {
      const previewUrl = URL.createObjectURL(formData.profilePicture);
      setProfilePicturePreview(previewUrl);

      // Clean up the object URL when the component unmounts or profilePicture changes
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setProfilePicturePreview(null);
    }
  }, [formData.profilePicture]);

  return (
    <Card className="p-6 max-w-4xl mx-auto border">
      <h2 className="text-2xl font-bold mb-4">
        Register as a Construction Tradesmen or a Construction Vendor
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 md:w-96">
          <label className="block text-sm font-medium text-gray-700">
            Are you a construction tradesmen or a construction vendor?
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="Construction Tradesmen">
              Construction Tradesmen
            </option>
            <option value="Construction Vendors">Construction Vendors</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Construction Tradesmen:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Labourer/ Foreman",
              "Carpenter",
              "Caster/ Casting Team Member",
              "Bricklayer",
              "Equipment operator",
              "Estimator",
              "HVAC Technician",
              "Plumber",
              "Electrician",
              "Painter",
              "Safety Manager",
              "Roofer",
              "Welder/ Fabricator",
              "Construction manager",
              "Landscaper",
              "Tiler",
              "Screeder",
              "POP Installer",
              "Iron Bender",
              "Paver",
              "Wood Work Fabricator",
              "Concrete floor designer",
              "Others",
            ].map((type) => (
              <Checkbox
                key={type}
                label={type}
                value={type}
                checked={formData.tradesmenTypes.includes(type)}
                onChange={handleChange}
                crossOrigin={undefined}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please upload your personal profile picture
          </label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 "
          />
        </div>

        {profilePicturePreview && (
          <div className="mt-4 w-28 h-28">
            <img
              src={profilePicturePreview}
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-md shadow-md"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please upload picture of present and past job (max 10 pictures)
          </label>
          <input
            type="file"
            name="jobPictures"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="block w-full text-sm text-gray-500"
          />
        </div>

        <div className="mb-4">
          <Textarea
            label="Describe yourself"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Guarantor's Name"
            name="guarantorName"
            value={formData.guarantorName}
            onChange={handleChange}
            required
          />
          <Input
            label="Guarantor's Contact Number"
            name="guarantorContact"
            value={formData.guarantorContact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Card>
  );
};

export default RegisterForm;
