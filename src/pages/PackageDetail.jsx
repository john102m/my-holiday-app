// PackageDetail.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function PackageDetail() {
    const location = useLocation();
    const fromReservation = location.state?.fromReservation || false;
    const fromId = location.state?.fromId;
    const navigate = useNavigate();
    const { id } = useParams()
    const [pkg, setPkg] = useState(null)

    let bookingButtonClass;
    if (!fromReservation) {
        bookingButtonClass = "mt-6 px-4 py-2 text-sm sm:text-base  font-semibold rounded-md shadow transition duration-200 bg-blue-600 hover:bg-blue-700 text-white";
    } else {
        bookingButtonClass = "force-not-allowed mt-6 px-4 py-2 text-sm sm:text-base  font-semibold rounded-md shadow transition duration-200 bg-gray-400 text-white";
    }

    useEffect(() => {
        fetch(`http://localhost:5000/catalog/packages/${id}`)
            .then(res => res.json())
            .then(setPkg)
            .catch(console.error)
    }, [id])

    if (!pkg) return <div className="m-2 p-4">Loading...</div>

    return (
        <>
            <div className="px-4 py-6 sm:p-6 bg-sky-50 min-h-screen flex justify-center items-start">
                <div className="bg-white mt-4 rounded-xl shadow-xl px-4 py-6 sm:p-8 max-w-2xl w-full">
                    <h1 className="text-2xl font-extrabold mb-2 text-gray-900 drop-shadow-md">
                        {pkg.name}
                    </h1>
                    <p className="text-xl mb-4 font-semibold text-blue-600 select-text">{pkg.destination}</p>
                    <img
                        src={pkg.imageUrl}
                        alt={pkg.destination}
                        className="w-full max-w-xl mx-auto mb-4 rounded-lg border border-gray-300 shadow-lg max-h-[60vh] sm:max-h-[70vh] object-contain"
                    />
                    <p className="text-lg mb-2 text-gray-800">{pkg.description}</p>
                    <p className="text-xl font-semibold text-gray-900">
                        £{pkg.price} for {pkg.nights} nights
                    </p>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => {
                                if (fromReservation) {
                                    navigate(-1);
                                } else {
                                    navigate('/', { state: { fromId } });
                                }
                            }}
                            className="mt-6 px-4 py-2 text-sm sm:text-base font-semibold rounded-md shadow transition duration-200 bg-blue-600 hover:bg-blue-700 text-white"

                        >
                            Go Back
                        </button>
                        <button
                            disabled={fromReservation}
                            onClick={() => navigate(`/reservations/new/${id}`)}
                            className={bookingButtonClass}

                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PackageDetail
