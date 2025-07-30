import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import '../App.css'
import HolidayCard from '../components/HolidayCard';

function Home() {
    const location = useLocation();
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

    useEffect(() => {
        console.log('fromId:', location.state?.fromId, 'packages length:', packages.length);
        if (location.state?.fromId && packages.length > 0) {
            // Wait for the DOM to render
            requestAnimationFrame(() => {
                const el = document.getElementById(`package-${location.state.fromId}`);
                if (el) {
                    console.log("I want to scroll");
                    el.scrollIntoView({ behavior: 'auto', block: 'center' });
                }
            });
        }
    }, [location.state?.fromId, packages]);



    return (
        <>
            <div className="mt-10 p-6 bg-sky-50 min-h-screen">
                <h1 className="text-5xl font-bold mb-6">🌴 Holiday Offers</h1>

                <div className="flex flex-wrap gap-6 justify-center">
                    {packages.map(pkg => (
                        <HolidayCard
                            id={`package-${pkg.id}`}
                            key={pkg.id}
                            destination={pkg.destination}
                            name={pkg.name}
                            price={pkg.price}
                            description={pkg.description}
                            nights={pkg.nights}
                            image={pkg.imageUrl}
                            onClick={() => navigate(`/package/${pkg.id}`, { state: { fromId: pkg.id } })}
                        />
                    ))}
                </div>

            </div>
        </>
    )
}

export default Home
