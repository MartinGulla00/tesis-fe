import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const useToaster = () => {
  const { toast } = useToast();

  const showToast = (message: string) => {
    toast({
      description: message,
    });
  };

  const showToastError = (error: unknown, fallbackMessage: string) => {
    if (axios.isAxiosError(error)) {
      toast({
        description: error.response?.data.error.message || fallbackMessage,
        variant: "destructive",
      });
    } else {
      toast({
        description: fallbackMessage || "Error",
        variant: "destructive",
      });
    }
  };

  const showToastTitle = (title: string, message: string) => {
    toast({
      title: title,
      description: message,
    });
  };

  const showToastTitleError = (
    title: string,
    error: unknown,
    fallbackMessage: string
  ) => {
    if (axios.isAxiosError(error)) {
      toast({
        title: title,
        description: error.response?.data.error.message || fallbackMessage,
        variant: "destructive",
      });
    } else {
      toast({
        title: title,
        description: fallbackMessage || "Error",
        variant: "destructive",
      });
    }
  };

  return { showToast, showToastError, showToastTitle, showToastTitleError };
};

export default useToaster;
