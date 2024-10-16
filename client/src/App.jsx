import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./Layout";
import { UserProvider } from "./Context/UserContext";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import SignIn from "./Pages/Signin";

const App = () => {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
};

export default App;
