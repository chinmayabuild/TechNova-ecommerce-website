import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useRazorpay = () => {
  const navigate = useNavigate();

  const generatePayment = async (amount) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/generate-payment`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data?.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment verification failed");
            return null;
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const verifyPayment = async (options, productArray, address) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      return toast("Failed to load Razorpay");
    }

    const paymentObject = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      ...options,
      image:
        "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lfGVufDB8fDB8fHww",
      handler: async (response) => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/verify-payment`,
            {
              razorpay_order_id: options.id,
              razorpay_payment_id: response.razorpay_payment_id,
              amount: options.amount,
              address,
              productArray,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const { data } = res.data;
          toast(data.message);
          navigate("/success");
        } catch (error) {
          return toast(error.response.data.message);
        }
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    });

    paymentObject.open();
  };

  return { generatePayment, verifyPayment };
};

export default useRazorpay;
