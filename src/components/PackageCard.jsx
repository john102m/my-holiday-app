// PackageCard.jsx

function PackageCard({ packageDetails }) {
  if (!packageDetails) {
    return (
      <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
        <p>Loading package details...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        {packageDetails.name}
      </h2>
      <p className="text-blue-700 font-bold mb-2">{packageDetails.destination}</p>
      <div className="flex justify-center mb-4">
        <img
          src={packageDetails.imageUrl}
          alt={packageDetails.destination}
          className="max-w-[300px] max-h-[200px] object-cover rounded-md shadow"
        />
      </div>
      <p className="text-gray-700 mb-2">{packageDetails.description}</p>
      <p className="text-gray-600 italic">
        £{packageDetails.price} for {packageDetails.nights} nights
      </p>
    </div>
  );
}

export default PackageCard;
