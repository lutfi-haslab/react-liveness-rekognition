import LivenessQuickStart from "@/components/Liveness";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLivenessStore } from "@/context/useLivenessStore";
import Layout from "@/theme/Layout";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const {
    fullName,
    setFullName,
    email,
    phone,
    address,
    dateBirth,
    setEmail,
    setPhone,
    setAddress,
    setDateBirth,
    imgBase64,
    setImgBase64,
    confidenceLevel
  } = useLivenessStore();
  const [next, setNext] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handlerSubmit = () => {
    if (imgBase64) {
      setIsSubmit(true);
    }
  };

  const downloadReferenceImage = () => {
    if (imgBase64) {
      const downloadLink = document.createElement("a");
      downloadLink.href = imgBase64;
      downloadLink.download = "reference-image.jpg";
      downloadLink.click();
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Personal Information</h1>
      <form className="space-y-6">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            type="tel"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            placeholder="Enter your address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            onChange={(e) => {
              setDateBirth(e.target.value);
            }}
          />
        </div>
      </form>
      <div className="flex justify-end mt-8">
        <Button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md"
          onClick={() => setNext(true)}
        >
          Next
        </Button>
      </div>
      {next && (
        <>
          <h1 className="text-3xl font-bold mb-6 mt-12">
            Face Liveness Detection
          </h1>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                To verify your identity, please take a photo of your face.
              </p>
              <div className=" bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <LivenessQuickStart />
              </div>
              {imgBase64 && (
               <>
               <p className="text-center">Confidence Level: {confidenceLevel}</p>
                <Button
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={downloadReferenceImage}
                >
                  Download Image
                </Button>
                </>
              )}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Your face image will be securely processed for liveness detection
              and identity verification. We do not store any of your personal
              data.
            </p>
          </div>
        </>
      )}
      {next && (
        <div className="flex justify-end mt-8">
          <Button
            onClick={handlerSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md"
          >
            Submit
          </Button>
        </div>
      )}
      {isSubmit && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 mt-10">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={imgBase64}
                alt="Reference Image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {fullName}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{email}</p>
              <p className="text-gray-500 dark:text-gray-400">{phone}</p>
            </div>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-medium mb-2">
              Address
            </h4>
            <p className="text-gray-500 dark:text-gray-400">{address}</p>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-medium mb-2">
              Date of Birth
            </h4>
            <p className="text-gray-500 dark:text-gray-400">{dateBirth}</p>
          </div>
          <Button
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={() => {
              router.reload()
              setAddress("")
              setFullName("")
              setEmail("")
              setPhone("")
              setDateBirth("")
              setImgBase64(null)
            }}
          >
            Close
          </Button>
        </div>
      )}
    </Layout>
  );
}
