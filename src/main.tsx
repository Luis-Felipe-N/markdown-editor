import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { FileContextProvider } from "./context/FileContext";
import { Home } from "./pages";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
          <FileContextProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
              {/* React */}
              <Route path=":fileId" element={<Home />} />
            </Route>
        </Routes>
      </BrowserRouter>
          </FileContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
