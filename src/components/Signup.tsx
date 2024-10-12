import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("user_name", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
  
    axios
      .post("https://test1.focal-x.com/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        localStorage.setItem("firstName", response.data.user.first_name);
        localStorage.setItem("lastName", response.data.user.last_name);
        localStorage.setItem("profileImage", response.data.user.profile_image);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      })
  };
  

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(71.17deg, #FEAF00 19.35%, #F8D442 90.12%)",
      }}
    >
      <div className="bg-white p-6 sm:p-8 flex flex-col items-center justify-center mx-auto rounded-xl shadow-md w-full max-w-md">
        <img src="/assets/Logo-1.png" alt="Logo" className="mb-5" />
        <h1 className="text-center text-xl font-semibold mt-3">SIGN UP</h1>
        <p className="text-center text-sm font-normal text-gray-600 mt-1">
          Create an account to start using our services
        </p>
        <form onSubmit={handleSubmit} className="mt-5 w-full">
          <div className="sm:flex sm:space-x-4 mb-3">
            <div className="flex-1 mb-4 sm:mb-0">
              <label className="mb-1 text-xs">First Name:</label>
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FEAF00] transition duration-200 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-xs">Last Name:</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FEAF00] transition duration-200 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-1 text-xs">Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FEAF00] transition duration-200 w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-1 text-xs">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FEAF00] transition duration-200 w-full"
            />
          </div>
          <div className="sm:flex sm:space-x-4 mb-3">
            <div className="flex-1 mb-4 sm:mb-0">
              <label className="mb-1 text-xs">Password:</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FEAF00] transition duration-200 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 text-xs">Confirm Password:</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#FEAF00] transition duration-200 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3">
            <label className="mb-1 text-xs">Profile Image:</label>
            <div className="w-full">
              <div className="flex w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-5">
                    {profileImage ? (
                      <p>{profileImage.name}</p>
                    ) : (
                      <img src="/assets/Upload icon.svg" className="w-[50px]" alt="" />
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#FEAF00] text-white py-2 rounded-lg w-full"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          <span className="font-semibold text-sm">
            Already have an account?
          </span>
          <span
            className="font-normal text-[#FEAF00] pl-2 cursor-pointer text-sm underline"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
