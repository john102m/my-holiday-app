export default function ReservationCard({ guestName, checkIn, checkOut, totalPrice, packageName, onClick }) {
  const formatDate = (isoString) => new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div
      onClick={onClick}
      className="w-80 h-auto border p-4 rounded-md cursor-pointer 
                 shadow-md bg-white flex flex-col justify-between 
                 transition-transform transform hover:scale-105"
    >
      <div>
        <h2 className="text-xl font-semibold text-blue-600">{packageName}</h2>
        <p className="text-gray-700"><strong>Guest:</strong> {guestName}</p>
        <p className="text-sm text-gray-800">
          <strong>Check-in:</strong> {formatDate(checkIn)}
        </p>
        <p className="text-sm text-gray-800">
          <strong>Check-out:</strong> {formatDate(checkOut)}
        </p>
        <p className="text-green-700 font-bold mt-2">
          Total: £{Math.floor(totalPrice)}
        </p>
      </div>
    </div>
  );
}
