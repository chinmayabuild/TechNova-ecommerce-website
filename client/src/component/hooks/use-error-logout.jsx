import { setUserLogout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner"; // ✅ Use toast directly

const useErrorLogout = () => {
  const dispatch = useDispatch();

  const handleErrorLogout = (error, otherTitle = "Error occurred") => {
    if (error?.response?.status === 401) {
      dispatch(setUserLogout());
      toast("Session expired. Please log in again.", {  
        style: { backgroundColor: "red", color: "white", fontWeight: "bold" },
      });
    } else {
      toast(otherTitle + ": " + (error?.response?.data?.message || "An error occurred"), {
        style: { backgroundColor: "red", color: "white", fontWeight: "bold" },
      });
    }
  };

  return { handleErrorLogout };
};

export default useErrorLogout;
