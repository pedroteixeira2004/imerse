const Filter = ({ filter, setFilter, sorting, setSorting }) => {
  const typeFilter = [
    { value: "recent", label: "Newest first" },
    { value: "updated", label: "Updated recently" },
    { value: "all", label: "Most relevant" },
  ];
  const typeSorting = [
    { vale: "like", label: "Most liked" },
    { value: "funny", label: "Most funny" },
    { value: "playtime", label: "More playtime" },
  ];

  const handleFilterClick = (value) => {
    setFilter(value);
    setSorting(""); // limpa a seleção do outro grupo
  };

  const handleSortingClick = (value) => {
    setSorting(value);
    setFilter(""); // limpa a seleção do outro grupo
  };
  return (
    <div>
      <p className="mb-2 font-semibold text-white text-4xl">Reviews sorting</p>
      <p className="text-white mb-6">
        Pick a way to organize and dive into the reviews.
      </p>
      <div className="flex flex-wrap gap-2">
        {typeFilter.map((option) => (
          <button
            key={option.value}
            onClick={() => handleFilterClick(option.value)}
            className={`button-filters px-6 py-1 rounded-3xl border font-medium ${
              filter === option.value ? "active" : ""
            }`}
          >
            {option.label}
          </button>
        ))}
        {typeSorting.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortingClick(option.value)}
            className={`button-filters px-6 py-1 rounded-3xl border font-medium ${
              sorting === option.value ? "active" : ""
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Filter;
