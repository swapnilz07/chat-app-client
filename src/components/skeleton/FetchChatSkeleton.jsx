function FetchChatSkeleton() {
  return (
    <>
      <div className="flex items-center py-3 rounded-lg shadow-md cursor-pointer hover:bg-gray-700">
        <div className="skeleton w-12 h-12 rounded-full mr-4 bg-gray-800 "></div>
        <div className="flex-1">
          <div className="skeleton h-4 bg-gray-800 rounded  mb-2 w-3/4"></div>
          <div className="skeleton h-4 bg-gray-700 rounded  w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded skeleton ml-4 w-12"></div>
      </div>
    </>
  );
}

export default FetchChatSkeleton;
