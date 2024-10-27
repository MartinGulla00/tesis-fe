import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import axiosInterceptors from "./interceptors/auth";
import Router from "./routing/Router";

axiosInterceptors();

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <Router />
    <ToastContainer />
  </QueryClientProvider>
);