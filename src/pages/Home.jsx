import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import '../App.css'
import HolidayCard from '../components/HolidayCard';

function Home() {
    const navigate = useNavigate();
    //const [count, setCount] = useState(0)
    const [packages, setPackages] = useState([])
    //const thing = true;
    useEffect(() => {
        fetch('http://localhost:5000/catalog/packages')  // your gateway URL
            .then(res => res.json())
            .then(data => setPackages(data))
            .catch(console.error)
    }, [])

    return (
        <>
            <div className="mt-10 p-6 bg-sky-50 min-h-screen">
                <h1 className="text-5xl font-bold mb-6">🌴 Holiday Offers</h1>

                <div className="flex flex-wrap gap-6 justify-center">
                    {packages.map(pkg => (
                        <HolidayCard
                            key={pkg.id}
                            destination={pkg.destination}
                            name={pkg.name}
                            price={pkg.price}
                            description={pkg.description}
                            nights={pkg.nights}
                            image={pkg.imageUrl}
                            onClick={() => navigate(`/package/${pkg.id}`)}
                        />
                    ))}
                </div>

            </div>
        </>
    )
}

export default Home
