import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/Inicializacao";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import GlassToast from "../GlassToast";
import Select from "react-select";
const customStyles = {
  control: (base) => ({
    ...base,
    background:
      "linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.3))",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "9999px",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
    color: "white",
    paddingLeft: "0.5rem",
    paddingRight: "1.5rem",
    minHeight: "36px",
    height: "36px",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    width: "100%",
  }),

  menu: (base) => ({
    ...base,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    borderRadius: "1rem",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    marginTop: "8px",
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "rgba(255, 255, 255, 0.2)"
      : "transparent",
    color: "white",
    borderRadius: "0.75rem",
    cursor: "pointer",
    padding: "12px 20px",
    transition: "all 0.2s ease",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  placeholder: (base) => ({
    ...base,
    color: "rgba(255,255,255,0.7)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "rgba(255,255,255,0.7)",
  }),
};

const occupationsOptions = [
  { label: "Investigator", value: "Investigator" },
  { label: "Game company", value: "Game company" },
  { label: "Other", value: "Other" },
];

const PersonalInfo = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    occupation: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setForm({
            firstName: userSnap.data().firstName || "",
            lastName: userSnap.data().lastName || "",
            email: firebaseUser.email || "",
            organization: userSnap.data().organization || "",
            occupation: userSnap.data().occupation || "",
          });
        }
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        firstName: form.firstName,
        lastName: form.lastName,
        organization: form.organization,
        occupation: form.occupation,
      });

      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Personal information updated with success"
            type="success"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
    } catch (error) {
      console.error(error);
      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Error while updating personal information"
            type="error"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
    }

    setIsEditing(false);
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Email to redefine password sent with success"
            type="success"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
    } catch (error) {
      console.error(error);
      toast.custom(
        (t) => (
          <GlassToast
            t={t}
            message="Error while sending email to redefine password"
            type="error"
          />
        ),
        { duration: 3000, position: "top-center" }
      );
    }
  };

  if (loading) {
    return <p className="text-white">Loading</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold">Personal Information</h2>

        <button
          onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
          className="group flex items-center rounded-full px-6 py-2 border border-white/30 backdrop-blur-[15px] bg-gradient-to-br from-white/15 to-white/5 text-white font-bold transition-all duration-300 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
        >
          {isEditing ? <FaCheckCircle size={20} /> : <FaEdit size={20} />}
          <span
            className={`ml-0 max-w-0 overflow-hidden opacity-0 
              transition-all duration-300 whitespace-nowrap
              ${
                isEditing
                  ? "opacity-100 ml-3 max-w-[150px]"
                  : "group-hover:opacity-100 group-hover:ml-3 group-hover:max-w-[150px]"
              }`}
          >
            {isEditing ? "Apply changes" : "Edit"}
          </span>
        </button>
      </div>

      <p className="text-white text-xl mb-8">
        Check and edit your personal information below.
      </p>

      <div className="grid gap-4 max-w-xl">
        {/* First Name e Last Name na mesma linha */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              name: "firstName",
              label: "First Name",
              placeholder: "Enter your first name",
            },
            {
              name: "lastName",
              label: "Last Name",
              placeholder: "Enter your last name",
            },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="text-white block mb-1">{label}</label>
              <div
                className={`pl-4 pr-6 py-2 text-white text-sm rounded-full 
            bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
            border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
            outline-none flex items-center transition-all duration-300 mt-2
            ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}
          `}
              >
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder={placeholder}
                  className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Organization */}
        <div>
          <label className="text-white block mb-1">Organization</label>
          <div
            className={`pl-4 pr-6 py-2 text-white text-sm rounded-full 
        bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
        border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        outline-none flex items-center transition-all duration-300 mt-2
        ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}
      `}
          >
            <input
              type="text"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your organization"
              className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
            />
          </div>
        </div>

        {/* Occupation */}
        <div>
          <label className="text-white block mb-1">Occupation</label>
          <div
            className={`mt-2 ${
              !isEditing ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Select
              options={occupationsOptions}
              value={occupationsOptions.find(
                (opt) => opt.value === form.occupation
              )}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, occupation: selected.value }))
              }
              styles={customStyles}
              placeholder="Select your occupation"
              isSearchable={false}
              menuPortalTarget={document.body}
              menuPosition={"fixed"}
              // só habilita se estiver editando
              isDisabled={!isEditing}
            />
          </div>
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="text-white block mb-1">Email</label>
          <div
            className="pl-4 pr-6 py-2 text-white text-sm rounded-full 
        bg-gradient-to-br from-white/10 to-white/30 backdrop-blur-3xl 
        border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        outline-none flex items-center transition-all duration-300 mt-2
        opacity-50 cursor-not-allowed"
          >
            <input
              type="email"
              value={form.email}
              disabled
              className="bg-transparent placeholder-white/70 font-sf w-full focus:outline-none"
            />
          </div>
        </div>

        {/* Botão para mudar senha */}
        <button
          onClick={handlePasswordReset}
          disabled={!isEditing}
          className={`mt-6 px-6 py-2 rounded-full border border-white/30 backdrop-blur-[15px] 
    bg-gradient-to-br from-white/15 to-white/5 text-white font-bold transition-all duration-300 
    hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]
    ${!isEditing ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
  `}
        >
          Change password
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
