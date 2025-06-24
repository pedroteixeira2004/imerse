import React, { useState } from "react";
import Background from "./background";
import AppLayout from "./Layout";
import useUserData from "./UserData";
import LogoutButton from "./LogoutButton";
import Loading from "./Loading";
import profile_img from "../assets/imagens/profile_image.png";

// Componentes das secções
import ProfileInfo from "./ProfileSections/ProfileInfo";
import PersonalInfo from "./ProfileSections/PersonalInfo";
import PaymentMethods from "./ProfileSections/PaymentMethods";

const Profile = () => {
  const { userData, loading } = useUserData();
  const [activeSection, setActiveSection] = useState("profile");

  // Se ainda estiver a carregar os dados
  if (loading) return <Loading />;

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileInfo />;
      case "personal":
        return <PersonalInfo />;
      case "payment":
        return <PaymentMethods />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <div>
      <Background />
      <AppLayout>
        <div className="flex justify-center font-sf text-white">
          <div className="flex h-[38rem] w-[80rem] bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 shadow-md p-6">
            {/* Lado Esquerdo - Menu e Info do Utilizador */}
            <div className="w-1/3 pr-6 border-r border-white/20">
              <LogoutButton />
              <div className="flex flex-col items-center mb-10 mt-8">
                <img
                  src={profile_img}
                  alt="profile image"
                  className="h-32 mb-5"
                />
                <p className="text-white text-3xl mt-1 font-medium">
                  {userData.firstName} {userData.lastName}
                </p>
                <div className="flex items-center text-2xl">
                  {userData.occupation === "other" ? (
                    userData.organization ? (
                      <span>{userData.organization}</span>
                    ) : null
                  ) : userData.occupation && userData.organization ? (
                    <span>
                      {userData.occupation}
                      <span className="mx-2 text-white/50">|</span>
                      {userData.organization}
                    </span>
                  ) : userData.occupation ? (
                    <span>{userData.occupation}</span>
                  ) : userData.organization ? (
                    <span>{userData.organization}</span>
                  ) : null}
                </div>
              </div>

              {/* Menu de Secções */}
              <div className="space-y-4">
                {[
                  { key: "profile", label: "Profile" },
                  { key: "payment", label: "Payment Methods" },
                  { key: "personal", label: "Personal Info" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex justify-center">
                    <button
                      onClick={() => setActiveSection(key)}
                      className={`w-4/5 text-left px-4 py-2 rounded-xl border transition-all
          ${
            activeSection === key
              ? "bg-white/30 border-white border-2 font-bold"
              : "bg-white/10 border-white/30 hover:bg-white/20 hover:shadow-[0_6px_40px_rgba(255,255,255,0.2),0_0_10px_rgba(255,255,255,0.1)]"
          }`}
                    >
                      {label}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Lado Direito - Conteúdo Dinâmico */}
            <div className="w-2/3 pl-6 text-white">{renderSection()}</div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default Profile;
