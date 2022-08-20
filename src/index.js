import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();


Modal.setAppElement("#root");

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  document.getElementById("root")
);
