// src/components/RegistrationForm.jsx
// RegistrationForm.jsx
import React, { useState } from "react";
import StepOne from "./SignupSteps/StepOne";
import StepTwo from "./SignupSteps/StepTwo";
import StepThree from "./SignupSteps/StepThree";
import StepFour from "./SignupSteps/StepFour";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Inicializacao";
import Background from "./background";
import logo from "../assets/imerselogo_white.png";
import { Link } from "react-router-dom";
import { traduzirErroFirebase } from "./TraduzirErrosFirebase";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    organization: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const checkEmailExists = async () => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, formData.email);
      if (methods.length > 0) {
        setError("This e-mail is already in use.");
        return false;
      }
      return true;
    } catch (err) {
      setError("Error on verifying your e-mail");
      return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords doesn't match.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);

      const userDoc = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        occupation: formData.occupation,
        organization: formData.organization,
        email: formData.email,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), userDoc);

      setSuccess(true);
      setStep(4);
    } catch (err) {
      console.error("Erro no login:", err);
      const mensagem = traduzirErroFirebase(err.code);
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sf text-white">
      <Background />
      <div className="flex items-center min-h-screen p-4 mx-10 justify-between">
        <div className="flex-1 flex flex-col items-center">
          <div>
            <img src={logo} alt="Logo" className="w-[30rem]" />
            <p className="text-6xl font-bold mt-7">Welcomes you.</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          {step === 1 && (
            <StepOne
              formData={formData}
              updateForm={updateForm}
              next={async () => {
                if (await checkEmailExists()) nextStep();
              }}
              error={error}
            />
          )}
          {step === 2 && (
            <StepTwo
              formData={formData}
              updateForm={updateForm}
              next={nextStep}
              back={prevStep}
            />
          )}
          {step === 3 && (
            <StepThree
              formData={formData}
              updateForm={updateForm}
              back={prevStep}
              submit={handleSubmit}
              loading={loading}
              error={error}
            />
          )}
          {step === 4 && <StepFour />}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
