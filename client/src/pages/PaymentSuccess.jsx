import { useState, useEffect } from "react";
import { useSearchParams, Link ,useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import Button_2 from "../components/Button/Button_2"; // Assuming Button_2 is defined elsewhere
import { ArrowLeft, X,Check } from "lucide-react";
import { useVerifyPaymentMutation } from "../globalState/api/paymentApi";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [verifyPayment, { isLoading, isError, error }] = useVerifyPaymentMutation();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (orderId) {
      const func=async()=>{
        const res=await verifyPayment({ orderId });
      }
      func();
    } else {
      toast.error("No order ID found");
    }
  }, [orderId,verifyPayment]);



  if (isLoading) {
    return (
      <>
      <div className="font-Lex bg-black/95 text-white min-h-screen mt-[10vh] px-4 flex items-center justify-center">
        <div className="text-center">
        <div className="w-10 h-10 border-4 border-t-[#E11D48] border-gray-700 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-300" aria-live="polite">
          Verifying payment…
        </p>
        </div>
      </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
      <div className="font-Lex bg-black/95 text-white min-h-screen mt-[10vh] px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12">
        <div className="max-w-md mx-auto">
         
        <section className="bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:shadow-[#E11D48]/20 transition-all duration-300 animate-in fade-in duration-500">
          <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6 sm:w-8 sm:h-8 text-[#E11D48]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] mb-2 text-shadow-sm">
            Payment Error
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-6">
            {error?.data?.message}
          </p>
          <Button_2
            content="Back to Tournaments"
            func={() => (navigate("/tournaments"))}
            className="w-full bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] hover:from-[#FC4E5B] hover:to-[#E11D48] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base border border-[#E11D48]/50 animate-pulse-hover"
          />
          </div>
        </section>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className="font-Lex bg-black/95 text-white min-h-screen mt-[10vh] px-4 flex items-center justify-center">
      <div className="max-w-md w-full text-center bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 shadow-lg">
        <div role="status" aria-live="polite" className="flex flex-col items-center">
          <div className="w-15 h-15 rounded-full bg-gradient-to-tr from-green-700 to-emerald-400 flex items-center justify-center mb-4 shadow-md">
          <Check className="w-9 h-9" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
          <p className="text-sm text-gray-300 mb-3">Thank you — your registration is confirmed.</p>

          {orderId && (
            <p className="text-xs text-gray-400 mb-4">
              Order ID: <span className="font-mono text-white">{orderId.slice(0, 12)}</span>
            </p>
          )}

          <div className="flex gap-3 w-full">
            <Link
              to="/tournaments"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-md text-white font-semibold hover:opacity-95 transition"
            >
              Back to Tournaments
            </Link>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
