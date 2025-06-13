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
            <div className="mt-4">
              <h1 className="text-5xl font-bold text-center text-white">
                Profile
              </h1>
              <p className="text-center text-white text-xl mt-2">
                Manage your account settings and preferences.
              </p>
            </div>
            <div className="outline-none mt-10 ml-10 mr-10 mb-6 card-filters flex">
              <div className="profile-content flex items-center font-sf">
                {/* Profile content goes here */}
                <p className="text-white">
                  Profile details will be displayed here.
                </p>
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
