import { Heading, Loader, Button } from "@aws-amplify/ui-react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import axios from "axios";
import { useEffect, useState } from "react";
import awsmobile from "@/aws-exports";
import { useLivenessStore } from "@/context/useLivenessStore";

export default function LivenessQuickStart() {
  const { setImgBase64, setConfidenceLevel } = useLivenessStore();
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [showLiveness, setShowLiveness] = useState(true);
  const [success, setSuccess] = useState("");
  const [referenceImageBytes, setReferenceImageBytes] = useState(null);

  useEffect(() => {
    const fetchCreateLiveness = async () => {
      const response = await axios.get(
        `${awsmobile.aws_cloud_logic_custom[0].endpoint}/session/create`
      );
      console.log(response.data.sessionId);
      setSessionId(response.data.sessionId);
      setLoading(false);
    };

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async (data) => {
    setShowLiveness(false);
    console.log(data);

    const response = await axios.get(
      `${awsmobile.aws_cloud_logic_custom[0].endpoint}/session/get?sessionId=${sessionId}`
    );

    console.log(response);
    setReferenceImageBytes(response.data.result.ReferenceImage.Bytes.data);
    setConfidenceLevel(response.data.result.Confidence);

    if (response.data.isLive) {
      setSuccess("User is live");
      console.log("live");
    } else {
      setSuccess("User is not live");
      console.log("not live");
    }
  };

  const handleError = (error) => {
    console.log("got error", error);
  };

  useEffect(() => {
    if (referenceImageBytes) {
      const referenceImage = document.createElement("img");
      const img = `data:image/jpeg;base64,${Buffer.from(
        referenceImageBytes
      ).toString("base64")}`;
      setImgBase64(img);
      referenceImage.src = img;
      referenceImage.alt = "Reference Image";
      const referenceImageContainer =
        document.getElementById("reference-image");
      referenceImageContainer.appendChild(referenceImage);
    }
  }, [referenceImageBytes]);

  return (
    <div className=" -mt-36">
      {(loading && !sessionId) || !showLiveness ? (
        <Loader />
      ) : (
        <>
          <FaceLivenessDetector
            sessionId={sessionId ?? "123"}
            region={awsmobile.aws_project_region}
            onAnalysisComplete={handleAnalysisComplete}
            onError={handleError}
            disableStartScreen={true}
            displayText={true}
          />
          <Heading level={2}>{success}</Heading>
        </>
      )}
      {referenceImageBytes && <div id="reference-image"></div>}
    </div>
  );
}
