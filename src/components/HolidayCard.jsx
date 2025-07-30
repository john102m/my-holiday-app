export default function HolidayCard({ id, destination, name, price, description, nights, image, onClick }) {
  return (
    <div
      id={id}
      onClick={onClick}
      className="
        w-full max-w-xs
        border p-4 rounded-md cursor-pointer
        shadow-md bg-white flex flex-col justify-between
        transition-transform transform hover:scale-105
        sm:w-80 sm:h-92
      "
    >
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-blue-600">{destination}</h2>
        <p className="text-gray-700 text-sm sm:text-base"><strong>{name}</strong></p>
        <p className="text-green-700 font-bold text-sm sm:text-base">
          Price: £{Math.floor(price)}<small className="text-xs">pp</small>
        </p>
        <p className="text-xs sm:text-sm text-gray-800">{description}</p>
        <p className="text-xs sm:text-sm text-gray-800"><strong>{nights} nights</strong></p>
      </div>
      <img
        src={image}
        className="w-full max-h-40 sm:max-h-42 object-cover rounded-md mt-3"
        alt={destination}
      />
    </div>
  );
}
