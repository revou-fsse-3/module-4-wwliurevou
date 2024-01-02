import { useState } from "react";
import { AccountForm } from "./Components/AccountForm";
import { AddressForm } from "./Components/AddressForm";
import { UserForm } from "./Components/UserForm";
import { useMultistepForm } from "./useMultiStepForm";
import { schema } from "./Components/passwordschema";
import "./App.css";

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
  password: any;
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

  async function onSubmit(e: any) {
    e.preventDefault();

    if (isLastStep === false) {
      return next();
    } else {
      const isValid = await schema.isValid({ password: data.password });
      if (isValid === true) {
        return alert(
          "Hi " + data.firstName + " ,Your registration is successful!!"
        );
      }
      return alert(
        "Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number"
      );
    }
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
            <button
              className={`font-medium text-[#9699ab] select-none cursor-pointer transition duration-100 hover:text-[#02295a]`}
              type="button"
              onClick={back}
            >
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
