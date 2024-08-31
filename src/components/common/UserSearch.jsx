/* eslint-disable react/prop-types */
import AsyncSelect from "react-select/async";

const UserSearch = ({ loadOptions, handleUserClick, selectStyles }) => {
  return (
    <div className="relative">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleUserClick}
        defaultOptions
        placeholder="Search for users..."
        isClearable
        styles={selectStyles}
        getOptionLabel={(e) => (
          <div className="flex items-center">
            <img
              src={
                e.profileImg ||
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              alt={e.label}
              className="w-8 h-8 rounded-full inline-block mr-2"
            />
            <span>{e.label}</span>
          </div>
        )}
      />
    </div>
  );
};

export default UserSearch;
