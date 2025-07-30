import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PackageCard from '../components/PackageCard';

const formatDate = (iso) => {
    const date = new Date(iso);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

function ReservationDetail() {
    const location = useLocation();
    const fromId = location.state?.fromId;
    const { id } = useParams();
    const navigate = useNavigate();
    const [reservation, setReservation] = useState(null);
    const [packageDetails, setPackageDetails] = useState(null);

    const handleGoBack = () => {
        navigate('/reservations', { state: { fromId } });
    };

    useEffect(() => {
        fetch(`http://localhost:5000/booking/reservations/${id}`)
            .then(res => res.json())
            .then(data => {
                setReservation(data);

                if (data?.packageId) {
                    fetch(`http://localhost:5000/catalog/packages/${data.packageId}`)
                        .then(res => res.json())
                        .then(setPackageDetails)
                        .catch(console.error);
                }
            })
            .catch(console.error);
    }, [id]);

    if (!reservation) return <div className="m-2 p-4">Loading...</div>;

    return (
        <div className="mt-8 md:mt-10 px-4 md:px-6 bg-sky-50 min-h-screen flex justify-center items-start overflow-y-auto">
            <div className="bg-white mt-4 rounded-xl shadow-xl p-4 md:p-8 max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">

                {/* Left column: Reservation details */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-gray-900">
                        Reservation #{reservation.id}
                    </h1>
                    <p className="text-xl font-semibold text-blue-600 mb-2">
                        Guest: {reservation.guestName}
                    </p>
                    <div className="mb-6">
                        <p className="text-base md:text-lg text-gray-700">
                            <span className="font-semibold">Check-In:</span> {formatDate(reservation.checkIn)}
                        </p>
                        <p className="text-base md:text-lg text-gray-700">
                            <span className="font-semibold">Check-Out:</span> {formatDate(reservation.checkOut)}
                        </p>
                        <p className="text-base md:text-lg text-gray-700">
                            <span className="font-semibold">Total Price:</span> £{reservation.totalPrice}
                        </p>
                        <p className="text-base md:text-lg text-gray-700">
                            <span className="font-semibold">Extra Info:</span> {reservation.extraInfo}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleGoBack}
                            className="mt-6 px-3 py-1.5 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200"
                        >
                            Go Back
                        </button>

                        <button
                            onClick={() => navigate(`/reservations/edit/${reservation.id}`)}
                            className="mt-6 px-3 py-1.5 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200"
                        >
                            Make Changes
                        </button>

                    </div>
                </div>

                {/* Right column: Package details */}
                {packageDetails && (
                    <PackageCard
                        onClick={() => navigate(`/package/${packageDetails.id}`, { state: { fromReservation: true } })}
                        packageDetails={packageDetails}
                    />
                )}

            </div>
        </div>
    );
}

export default ReservationDetail;
