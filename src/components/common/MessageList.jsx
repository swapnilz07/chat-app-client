// /* eslint-disable react/prop-types */
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { accessChat, fetchChats } from "../../api/chatAPI";
// import { fetchUsers } from "../../api/userAPI";
// import AsyncSelect from "react-select/async";

// function MessageList() {
//   const [, setSelectedUser] = useState(null);
//   const queryClient = useQueryClient();

//   const { data: authUser } = useQuery({
//     queryKey: ["authUser"],
//   });

//   const {
//     data: fetchedChats,
//     isError: fetchingChatError,
//     error: fetchError,
//     isLoading,
//   } = useQuery({
//     queryKey: ["chats"],
//     queryFn: fetchChats,
//     staleTime: Infinity,
//   });

//   const filteredChats = fetchedChats?.filter((chat) => !chat.isGroupChat);

//   const {
//     mutate: accessChatMutation,
//     isError: accessChatError,
//     error: accessError,
//     isLoading: isAccessingChat,
//   } = useMutation({
//     mutationFn: accessChat,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["chats"]);
//     },
//   });

//   const handleUserClick = (user) => {
//     setSelectedUser(user);
//     if (user) {
//       accessChatMutation(user.userId);
//     }
//   };

//   const loadOptions = async (inputValue, callback) => {
//     // Check if the input value is empty before calling the API
//     if (!inputValue) {
//       callback([]); // Return an empty array if there's no input
//       return;
//     }

//     try {
//       const fetchedUsers = await fetchUsers(inputValue);
//       const options = fetchedUsers.map((user) => ({
//         label: user.name,
//         userId: user._id,
//         profileImg: user.profileImg,
//       }));
//       callback(options);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full">
//       <div className="p-4 w-96 h-screen flex flex-col text-white">
//         <h1 className="text-2xl font-bold mb-4">Chats</h1>

//         <div className="relative">
//           <AsyncSelect
//             cacheOptions
//             loadOptions={loadOptions}
//             onChange={handleUserClick}
//             defaultOptions
//             placeholder="Search for users..."
//             isClearable
//             styles={{
//               control: (provided) => ({
//                 ...provided,
//                 backgroundColor: "transparent", // Set the background to transparent
//                 borderColor: "#374151", // Keep the border color as specified
//                 color: "white", // Set the text color to white
//                 "&:hover": {
//                   borderColor: "#4b5563", // Change border color on hover for better visibility
//                 },
//               }),
//               input: (provided) => ({
//                 ...provided,
//                 color: "white", // Set the typing text color to white
//               }),
//               menu: (provided) => ({
//                 ...provided,
//                 backgroundColor: "#1f2937", // Background color for the dropdown menu
//               }),
//               singleValue: (provided) => ({
//                 ...provided,
//                 color: "white", // Set the color of the selected value to white
//               }),
//               option: (provided, state) => ({
//                 ...provided,
//                 backgroundColor: state.isFocused ? "#374151" : "#1f2937", // Change background color on hover
//                 color: state.isFocused ? "black" : "white", // Change text color to black on hover
//               }),
//             }}
//             getOptionLabel={(e) => (
//               <div className="flex items-center">
//                 <img
//                   src={
//                     e.profileImg ||
//                     "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
//                   }
//                   alt={e.label}
//                   className="w-8 h-8 rounded-full inline-block mr-2"
//                 />
//                 <span>{e.label}</span>
//               </div>
//             )}
//           />
//         </div>

//         {isLoading ? (
//           <div className="flex items-center justify-center flex-1">
//             <p className="text-gray-500">Loading chats...</p>
//           </div>
//         ) : fetchingChatError ? (
//           <div className="flex items-center justify-center flex-1">
//             <p className="text-red-500">
//               Error fetching chats: {fetchError.message}
//             </p>
//           </div>
//         ) : (
//           <div className="flex-1 overflow-y-auto mt-4">
//             {filteredChats?.length > 0 ? (
//               filteredChats?.map((chat, index) => {
//                 const otherUser = chat.users.find(
//                   (user) => user._id !== authUser._id
//                 );
//                 return (
//                   <div
//                     key={index}
//                     className="flex items-center py-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
//                   >
//                     <img
//                       src={
//                         otherUser?.profileImg ||
//                         "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
//                       }
//                       alt={otherUser?.name}
//                       className="w-12 h-12 rounded-full mr-4"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-bold">{otherUser?.name}</h3>
//                       <p className="text-gray-400">
//                         {chat.latestMessage?.content || "No messages yet"}
//                       </p>
//                     </div>
//                     <span className="text-gray-400">
//                       {new Date(chat.updatedAt).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </span>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="flex items-center justify-center flex-1">
//                 <p className="text-gray-500">
//                   Search for a user to start a chat.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {isAccessingChat && (
//           <div className="mt-4 text-center">
//             <p className="text-blue-500">Starting chat...</p>
//           </div>
//         )}

//         {accessChatError && (
//           <div className="mt-4 text-center">
//             <p className="text-red-500">
//               Error starting chat: {accessError.message}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MessageList;
