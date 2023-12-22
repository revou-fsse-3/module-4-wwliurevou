import { FormEvent, useState } from "react";
import { AccountForm } from "./Components/AccountForm";
import { AddressForm } from "./Components/AddressForm";
import { UserForm } from "./Components/UserForm";
import { useMultistepForm } from "./useMultiStepForm";
import * as Yup from "yup";
import YupPassword from "yup-password";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  username: string;
  password: string;
};
const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  username: "",
  password: "",
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    const requiredField = () => Yup.string().required("required");
    const passwordField = <AddressForm {...data} updateFields={updateFields} />;

    alert("Your registration is successful" + "ssss" + passwordField);
  }
  return (
    <div
      className="Box"
      style={{
        position: "relative",
        background: "white",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Calibri",
        maxWidth: "max-content",
      }}
    >
      <form onSubmit={onSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1}/{steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  );
}

export default App;