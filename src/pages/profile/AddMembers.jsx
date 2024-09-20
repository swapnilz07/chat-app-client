/* eslint-disable react/prop-types */
import AsyncSelect from "react-select/async";
import { AiOutlineUserAdd } from "react-icons/ai";

export function AddMembers({
  setSelectedUsers,
  handleAddMembers,
  loadOptions,
}) {
  return (
    <div className="py-2">
      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={loadOptions}
        onChange={setSelectedUsers}
        defaultOptions
        placeholder="Search and select users..."
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "transparent",
            borderColor: "#374151",
            color: "white",
            "&:hover": {
              borderColor: "#4b5563",
            },
          }),
          input: (provided) => ({
            ...provided,
            color: "white",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#1f2937",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#374151" : "#1f2937",
            color: state.isFocused ? "black" : "white",
          }),
        }}
      />
      <div className="flex justify-center items-center">
        <button
          className="btn btn-sm btn-outline btn-success text-white text-xs rounded-lg"
          onClick={handleAddMembers}
        >
          <AiOutlineUserAdd size={15} /> Add
        </button>
      </div>
    </div>
  );
}
