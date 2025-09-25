import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Mail } from "lucide-react";

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("loading"); // loading, success, error, not-found
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      handleUnsubscribe(emailParam);
    } else {
      setStatus("error");
      setMessage("No email address provided");
    }
  }, [searchParams]);

  const handleUnsubscribe = async (emailAddress) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/subscribers/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailAddress }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("You have been successfully unsubscribed from our newsletter.");
      } else {
        if (data.message.includes("not found")) {
          setStatus("not-found");
          setMessage("This email address was not found in our subscriber list.");
        } else if (data.message.includes("already unsubscribed")) {
          setStatus("success");
          setMessage("This email address is already unsubscribed.");
        } else {
          setStatus("error");
          setMessage(data.message || "Failed to unsubscribe. Please try again.");
        }
      }
    } catch (error) {
      console.error("Unsubscribe error:", error);
      setStatus("error");
      setMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Newsletter Unsubscribe
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            BiruhKids Pediatric Clinic
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          {status === "loading" && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Processing your request...</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Unsubscribed Successfully
              </h3>
              <p className="mt-2 text-gray-600">{message}</p>
              <div className="mt-6 p-4 bg-green-50 rounded-md">
                <p className="text-sm text-green-800">
                  <strong>Email:</strong> {email}
                </p>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                You will no longer receive newsletter emails from BiruhKids Pediatric Clinic.
                If you change your mind, you can always resubscribe from our website.
              </p>
            </div>
          )}

          {status === "not-found" && (
            <div className="text-center">
              <XCircle className="mx-auto h-12 w-12 text-yellow-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Email Not Found
              </h3>
              <p className="mt-2 text-gray-600">{message}</p>
              <div className="mt-6 p-4 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Email:</strong> {email}
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <XCircle className="mx-auto h-12 w-12 text-red-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Unsubscribe Failed
              </h3>
              <p className="mt-2 text-gray-600">{message}</p>
              <button
                onClick={() => handleUnsubscribe(email)}
                disabled={isSubmitting}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? "Retrying..." : "Try Again"}
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p>Need help? Contact us:</p>
              <p className="mt-1">
                📞 +251963555552 / +251939602927<br />
                ✉️ biruhkidsclinic@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;