import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

//lazy
const LoginPage = lazy(() => import("./pages/LoginPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>hi</h1>} />
          <Route path="/login" element={<LoginPage />} />

          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
