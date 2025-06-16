import { useContext } from "react";
import Background from "./background";
import AppLayout2 from "./Layout2";
import { UserContext } from "../context/UserContext";

const Library = () => {
  const { userData } = useContext(UserContext);

  if (!userData) {
    return <p className="text-white m-10">A carregar biblioteca...</p>;
  }

  return (
    <div className="text-white font-sf m-10">
      <Background />
      <AppLayout2>
        <div className="text-5xl text-center font-bold w-full">
          Welcome to your library, {userData.firstName}
        </div>
      </AppLayout2>
    </div>
  );
};

export default Library;
