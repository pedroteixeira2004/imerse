import AppLayout2 from "./Layout2";
import Background from "./background";
import { useNavigate } from "react-router-dom";

const NoReviews = ({ appId }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Background />
      <AppLayout2>
        <div className="flex justify-center items-center m-10 w-full">
          <div className="text-center">
            <div className="text-5xl text-white font-sf font-bold mb-8 text-center">
              No reviews found according to the filters selected.
            </div>
            <div className="text-3xl font-medium text-white font-sf text-center">
              Please change your filters
            </div>
            <div
              className="text-xl text-white font-sf font-medium mt-10 cursor-pointer underline "
              onClick={() => navigate(`/filters/${appId}`)}
            >
              Go back to filters
            </div>
          </div>
        </div>
      </AppLayout2>
    </div>
  );
};
export default NoReviews;
