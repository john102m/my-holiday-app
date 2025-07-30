import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PackageCard from '../components/PackageCard';

const initialForm = {
    guestName: '',
    checkIn: '',
    checkOut: '',
    totalPrice: '',
    packageId: '',
    extraInfo: ''
};

function ReservationForm() {
    const { id, packageId } = useParams(); // id = reservation id, packageId from new booking
    const navigate = useNavigate();

    const [form, setForm] = useState(initialForm);
    const [packageDetails, setPackageDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isEditMode = !!id;

    // Load reservation if editing
    useEffect(() => {
        if (isEditMode) {
            setIsLoading(true);
            fetch(`http://localhost:5000/booking/reservations/${id}`)
                .then(res => res.json())
                .then(data => {
                    setForm({
                        guestName: data.guestName,
                        checkIn: data.checkIn.slice(0, 10),
                        checkOut: data.checkOut.slice(0, 10),
                        totalPrice: data.totalPrice,
                        packageId: data.packageId,
                        extraInfo: data.extraInfo || ''
                    });
                })
                .catch(console.error)
                .finally(() => setIsLoading(false));
        } else if (packageId) {
            setForm(prev => ({ ...prev, packageId }));
        }
    }, [id, isEditMode, packageId]);

    // Load package details when packageId changes
    useEffect(() => {
        if (!form.packageId) {
            setPackageDetails(null);
            return;
        }

        fetch(`http://localhost:5000/catalog/packages/${form.packageId}`)
            .then(res => res.json())
            .then(setPackageDetails)
            .catch(err => {
                console.error('Failed to fetch package details', err);
                setPackageDetails(null);
            });
    }, [form.packageId]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode
            ? `http://localhost:5000/booking/reservations/${id}`
            : 'http://localhost:5000/booking/reservations';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
            .then(async (res) => {
                if (res.status === 204) {
                    // No content to parse, return empty or a default
                    return {};
                }
                if (!res.ok) {
                    // Handle errors, maybe throw
                    const errorText = await res.text();
                    throw new Error(errorText || 'Request failed');
                }
                return res.json();
            })
            .then(data => {
                const reservationId = isEditMode ? id : data.id;
                navigate(`/reservations/${reservationId}`);
            })
            .catch(console.error);
    }
    if (isLoading) return <div className="m-4">Loading reservation data...</div>;

    return (
        <div className="p-6 mt-10 bg-sky-50 min-h-screen flex justify-center items-start">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
                {/* Left column: Form */}
                <div>
                    <h1 className="text-2xl font-semibold mb-6">
                        {isEditMode ? `Edit Reservation #${id}` : 'Create New Reservation'}
                    </h1>

                    <div className="mb-4">
                        <label className="block text-gray-700">Guest Name</label>
                        <input
                            type="text"
                            name="guestName"
                            value={form.guestName}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-2 py-1.5 border rounded shadow-sm text-sm sm:text-base"
                        />
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">Check-In</label>
                            <input
                                type="date"
                                name="checkIn"
                                value={form.checkIn}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-2 py-1.5 border rounded text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Check-Out</label>
                            <input
                                type="date"
                                name="checkOut"
                                value={form.checkOut}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 px-2 py-1.5 border rounded text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Total Price (£)</label>
                        <input
                            type="number"
                            name="totalPrice"
                            value={form.totalPrice}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-2 py-1.5 border rounded text-sm sm:text-base"
                            step="1"
                            min="0"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Extra Info (optional)</label>
                        <textarea
                            name="extraInfo"
                            value={form.extraInfo}
                            onChange={handleChange}
                            rows={3}
                            placeholder="e.g. Birthday trip, airport transfer requested..."
                            className="w-full mt-1 px-2 py-1.5 border rounded shadow-sm text-sm sm:text-base"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Package ID</label>
                        <input
                            type="text"
                            name="packageId"
                            value={form.packageId}
                            readOnly
                            className="w-full mt-1 px-2 py-1.5 border rounded bg-gray-100 cursor-not-allowed text-sm sm:text-base"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                        >
                            {isEditMode ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>

                {/* Right column: Package details */}
                <PackageCard packageDetails={packageDetails} />
            </form>
        </div>

    );
}

export default ReservationForm;
