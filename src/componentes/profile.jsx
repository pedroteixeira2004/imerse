import Background from "./background";
import AppLayout from "./Layout";
import LogoutButton from "./LogoutButton";
const Profile = () => {
  return (
    <div>
      <Background />
      <AppLayout>
        <div className="font-sf flex justify-center align-center">
          <div>
            <div>
              <h1 className="text-5xl font-bold text-center text-white">
                Profile
              </h1>
            </div>
            <div className="outline-none mt-10 ml-10 mr-10 mb-6 flex h-[35rem] bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/30 shadow-md">
              <div className="flex items-center font-sf">
                {/* Profile content goes here */}
                <div>
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
};
export default Profile;
