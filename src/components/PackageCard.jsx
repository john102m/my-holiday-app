function PackageCard({ packageDetails, onClick }) {
  if (!packageDetails) {
    return (
      <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
        <p>Loading package details...</p>
      </div>
    );
  }

  const cardClass = onClick
    ? "cursor-pointer bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-gray-100"
    : "bg-gray-50 border rounded-lg p-4 shadow-sm";

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div onClick={handleClick} className={cardClass}>
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">
        {packageDetails.name}
      </h2>

      <p className="text-blue-700 font-semibold mb-2">{packageDetails.destination}</p>

      <div className="mb-4">
        <img
          src={packageDetails.imageUrl}
          alt={packageDetails.destination}
          className="w-full h-auto max-h-64 object-cover rounded-md shadow"
        />
      </div>

      <p className="text-gray-700 mb-2 text-sm sm:text-base">{packageDetails.description}</p>

      <p className="text-gray-600 italic text-sm sm:text-base">
        £{packageDetails.price} for {packageDetails.nights} nights
      </p>
    </div>
  );
}
export default PackageCard;
