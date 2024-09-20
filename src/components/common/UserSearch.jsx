/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import AsyncSelect from "react-select/async";
import { getAllUsers } from "../../api/userAPI";

const UserSearch = ({ loadOptions, handleUserClick, selectStyles }) => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const options = users.map((user) => ({
    label: user.name,
    userId: user._id,
    profileImg: user.profileImg,
  }));

  return (
    <div className="relative">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleUserClick}
        defaultOptions={options}
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
