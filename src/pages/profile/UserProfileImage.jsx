/* eslint-disable react/prop-types */
export function ProfileImage({ profileImg, altText }) {
  return (
    <div className="flex justify-center mb-4">
      <img
        className="w-20 h-20 rounded-full object-cover"
        src={
          profileImg ||
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
        alt={altText}
      />
    </div>
  );
}
