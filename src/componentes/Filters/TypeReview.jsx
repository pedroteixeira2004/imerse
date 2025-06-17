import positive from "../../assets/icones/positive.png";
import negative from "../../assets/icones/negative.png";
import all from "../../assets/icones/all.png";
const TypeReview = ({ reviewType, setReviewType }) => {
  const typeReview = [
    { value: "all", label: "All", image: all },
    { value: "positive", label: "Positive", image: positive },
    { value: "negative", label: "Negative", image: negative },
  ];

  return (
    <div>
      <p className="mb-2 font-semibold text-white text-4xl">Type of Review</p>
      <p className="text-white mb-6">
        Select the type of review you want to analyse.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {typeReview.map((type) => (
          <button
            key={type.value}
            onClick={() => setReviewType(type.value)}
            className={`button-filters px-6 py-1 rounded-3xl border font-medium ${
              reviewType === type.value ? "active" : ""
            }`}
          >
            <div>
              <img src={type.image} className="h-16 w-16" />
              <div>{type.label}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
export default TypeReview;
