// PackageDetail.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PackageDetail() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [pkg, setPkg] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/catalog/packages/${id}`)
            .then(res => res.json())
            .then(setPkg)
            .catch(console.error)
    }, [id])

    if (!pkg) return <div className="p-4">Loading...</div>

    return (
        <>
            <div className="p-6 bg-sky-50 min-h-screen flex justify-center items-start">
                <div className="bg-white rounded-xl shadow-xl p-8 max-w-3xl w-full">
                    <h1 className="text-3xl font-extrabold mb-6 text-gray-900 drop-shadow-md">
                        {pkg.name}
                    </h1>
                    <p className="text-xl mb-4 font-semibold text-blue-600 select-text">{pkg.destination}</p>
                    <img
                        src={pkg.imageUrl}
                        alt={pkg.destination}
                        className="w-full max-w-xl mx-auto mb-4 rounded-lg border border-gray-300 shadow-lg"
                    />
                    <p className="text-lg mb-2 text-gray-800">{pkg.description}</p>
                    <p className="text-xl font-semibold text-gray-900">
                        £{pkg.price} for {pkg.nights} nights
                    </p>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-8 px-4 py-2 bg-blue-600 text-white text-base font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={() => navigate(`/reservations/new/${id}`)}
                            className="mt-8 px-4 py-2 bg-blue-600 text-white text-base font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200"
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
