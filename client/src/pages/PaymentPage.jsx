import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import toast from "react-hot-toast";
import { ArrowLeft, X } from "lucide-react";
import Button_2 from "../components/Button/Button_2";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { orderId, paymentSessionId } = location.state || {};

  useEffect(() => {
    if (!orderId || !paymentSessionId) {
      setError("Missing payment information");
      toast.error("Missing payment information");
      setLoading(false);
      return;
    }

    initializePayment();
  }, [orderId, paymentSessionId]);

  const initializePayment = async () => {
    try {
      setLoading(true);
      const cashfree = await load({ mode: import.meta.env.VITE_CASHFREE_MODE || "sandbox" });

      const checkoutOptions = {
        paymentSessionId,
        redirectTarget: "_self",
      };

      await cashfree.checkout(checkoutOptions);
    } catch (err) {
      setError("Failed to initialize payment");
      toast.error("Failed to initialize payment");
    } finally {
      setLoading(false);
    }
  };

  // ----- 🧱 Error Screen -----
  if (error) {
    return (
      <div className="font-Lex bg-black/95 text-white min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
        

          <section className="bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-xl hover:shadow-[#E11D48]/20 transition">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-[#E11D48]" />
              </div>

              <h2 className="text-2xl font-bold text-[#E11D48] mb-2">
                Payment Error
              </h2>
              <p className="text-gray-300 mb-6 text-sm">{error}</p>

              <Button_2
                content="Back to Tournaments"
                func={() => navigate("/tournaments")}
                className="w-full bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-[#E11D48]/50"
              />
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ----- ⏳ Loading Screen -----
  if (loading) {
    return (
      <div className="font-Lex bg-black/95 text-white min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
         
          <section className="bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-[#E11D48]/50 p-8 shadow-xl hover:shadow-[#E11D48]/20 transition">
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-[#E11D48] border-[#FC4E5B]/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#E11D48] font-semibold text-sm">Loading...</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#E11D48] mb-2">
                Initializing Payment
              </h2>
              <p className="text-gray-300 mb-2 text-sm">
                Please wait while we redirect you to the payment gateway...
              </p>
              <p className="text-xs text-gray-400">This may take a few seconds</p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return null;
}

export default PaymentPage;
