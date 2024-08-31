import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center py-4 w-full bg-red-100 rounded-lg">
      <p className="text-red-600 font-semibold">
        {message || "An unexpected error occurred."}
      </p>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
