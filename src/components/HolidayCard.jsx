// src/HolidayCard.jsx

export default function HolidayCard({ destination, name, price, description, nights, image, onClick }) {
  return (

    <div
      onClick={onClick}
      className="w-80 h-92 border p-4 rounded-md cursor-pointer 
                    shadow-md bg-white flex flex-col 
                    justify-between transition-transform 
                    transform hover:scale-105">
      <div>
        <h2 className="text-xl font-semibold text-blue-600">{destination}</h2>
        <p className="text-gray-700"><strong>{name}</strong></p>
        <p className="text-green-700 font-bold">Price: £{Math.floor(price)}<small>pp</small></p>
        <p className="text-sm text-gray-800">{description}</p>
        <p className="text-sm text-gray-800"><strong>{nights} nights</strong></p>
      </div>
      <img
        src={image}
        className="w-full max-h-42 object-cover rounded-md mt-3"
        alt={destination}
      />
    </div>
  );
}




