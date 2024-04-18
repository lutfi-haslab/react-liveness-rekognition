import { Heading, Loader } from "@aws-amplify/ui-react";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import axios from "axios";
import { useEffect, useState } from "react";
import awsmobile from "@/aws-exports";

export default function LivenessQuickStart() {
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCreateLiveness = async () => {
      const response = await axios.get(`${awsmobile.aws_cloud_logic_custom[0].endpoint}/session/create`)
      console.log(response.data.sessionId)
      setSessionId(response.data.sessionId);
      setLoading(false);
    };

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {

    const response = await axios.get(`${awsmobile.aws_cloud_logic_custom[0].endpoint}/session/get?sessionId=${sessionId}`)

    console.log(response)

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
  return (
    <>
      {loading && !sessionId ? (
        <Loader />
      ) : (
        <>
          <FaceLivenessDetector
            sessionId={sessionId ?? "123"}
            region={awsmobile.aws_project_region}
            onAnalysisComplete={handleAnalysisComplete}
            onError={handleError}
          />
          <Heading level={2}>{success}</Heading>
        </>
      )}
    </>
  );
}
