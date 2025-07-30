import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



export default function Reservations() {
    const location = useLocation();
    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // sortKey: which column; sortDir: 1 = asc, -1 = desc
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState(1);

    const navigate = useNavigate();
    const MIN_CHARS = 3;     // only search when term is at least this long
    const DEBOUNCE_MS = 500;   // wait half a second after last keystroke
    const isSearching = searchTerm.length >= MIN_CHARS;
    const noResults = isSearching && reservations.length === 0;
    const underLimit = searchTerm !== '' && searchTerm.length < MIN_CHARS;

    useEffect(() => {
        console.log('fromId:', location.state?.fromId, 'reservations length:', reservations.length);
        if (location.state?.fromId && reservations.length > 0) {
            const el = document.getElementById(`reservation-${location.state.fromId}`);
            if (el) {
                el.scrollIntoView({ behavior: 'auto', block: 'center' });
                el.classList.add('highlight-flash');
                const handleAnimationEnd = () => {
                    el.classList.remove('highlight-flash');
                    el.removeEventListener('animationend', handleAnimationEnd);

                };

                el.addEventListener('animationend', handleAnimationEnd);

            }
        }
    }, [location.state?.fromId, reservations]);




    // Fetch logic, re-used for both initial load & debounced search
    const fetchData = useCallback((term) => {
        const base = 'http://localhost:5000/booking/reservations';
        const url = term
            ? `${base}/search?searchTerm=${encodeURIComponent(term)}`
            : `${base}/`;

        fetch(url)
            .then(res => res.json())
            .then(setReservations)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (location.pathname === '/reservations') {
            fetchData('');
        }
    }, [location.pathname, fetchData]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.length >= MIN_CHARS) {
                // valid search
                fetchData(searchTerm);
            } else if (searchTerm === '') {
                // optional: reload full list on empty
                fetchData('');
            } else {
                // optional: clear results or keep previous
                setReservations([]);
            }
        }, DEBOUNCE_MS);

        return () => clearTimeout(handler);
    }, [searchTerm, fetchData]);

    function handleSort(key) {
        // Reverse direction if clicking the same column twice
        const dir = key === sortKey ? -sortDir : 1;
        setSortKey(key);
        setSortDir(dir);
    }
    const sortedReservations = useMemo(() => {
        if (!sortKey) return reservations;

        return [...reservations].sort((a, b) => {
            let aVal = a[sortKey];
            let bVal = b[sortKey];

            // If it’s a date column, compare as dates
            if (sortKey.toLowerCase().includes("date") || sortKey === "checkIn" || sortKey === "checkOut") {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            }

            if (aVal > bVal) return sortDir;
            if (aVal < bVal) return -sortDir;
            return 0;
        });
    }, [reservations, sortKey, sortDir]);

    function SortIcon({ active, dir }) {
        return (
            <span
                className={`
        inline-block ml-1 transition-transform duration-200 
        ${active ? 'opacity-100' : 'opacity-30'} 
        ${dir === -1 ? 'rotate-180' : ''}
      `}
            >
                ▲
            </span>
        );
    }

    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });

    return (
        <div className="p-6 max-h-screen flex flex-col">
            <h2 className="text-2xl font-semibold mt-2 mb-4">Reservations</h2>

            {/* Search box */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search by guest or package…"
                    className="w-full p-2 border rounded"
                />
            </div>
            {/* Table wrapper with fixed height */}
            <div className="border border-gray-300 rounded-md shadow-md overflow-hidden flex-grow">
                <div className="overflow-auto max-h-[70vh]">
                    <table className="min-w-full text-left border-collapse-separate border-spacing-0">
                       <thead className="bg-blue-100 text-blue-800 sticky top-0 z-10 border-b border-blue-700 shadow-md">
                            <tr >

                                <th onClick={() => handleSort('guestName')}
                                    className="cursor-pointer py-2 px-4  w-[10rem]"
                                    aria-sort={sortKey === 'guestName' ? (sortDir === 1 ? 'ascending' : 'descending') : 'none'
                                    }>
                                    Guest  <SortIcon active={sortKey === 'guestName'} dir={sortDir} />
                                </th>

                                <th className="py-2 px-4  w-[16rem]">Package</th>

                                <th onClick={() => handleSort('checkIn')}
                                    className="cursor-pointer whitespace-nowrap py-2 px-4  w-[10rem]"
                                    aria-sort={sortKey === 'checkIn' ? (sortDir === 1 ? 'ascending' : 'descending') : 'none'
                                    }>
                                    <span className="whitespace-nowrap">Check-in</span>
                                    <SortIcon active={sortKey === 'checkIn'} dir={sortDir} />
                                </th>
                                <th
                                    onClick={() => handleSort('checkOut')}
                                    className="cursor-pointer py-2 px-4 min-w-[8rem] flex items-center"
                                    aria-sort={sortKey === 'checkOut' ? (sortDir === 1 ? 'ascending' : 'descending') : 'none'
                                    }>
                                    <span className="whitespace-nowrap">Check-out</span>
                                    <SortIcon active={sortKey === 'checkOut'} dir={sortDir} />
                                </th>

                                <th className="whitespace-nowrap py-2 px-4 w-[8rem]">Total (£)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {underLimit && (
                                <tr>
                                    <td colSpan="5" className="py-4 text-center text-gray-500">
                                        Type at least {MIN_CHARS} letters to search…
                                    </td>
                                </tr>
                            )}

                            {noResults && (
                                <tr className={`col-span-5 ${noResults ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                                    } transition-all duration-500 ease-in-out`}>
                                    <td colSpan="5" className="py-4 text-center text-gray-500">
                                        No matching reservations found
                                    </td>
                                </tr>
                            )}

                            {!noResults && !underLimit && sortedReservations.map((res, i) => (
                                <tr
                                    key={res.id}
                                    id={`reservation-${res.id}`}
                                    className={`${i % 2 ? 'bg-gray-200' : 'bg-white'} hover:bg-blue-100 cursor-pointer`}
                                    onClick={() => navigate(`/reservations/${res.id}`, { state: { fromId: res.id } })}
                                >
                                    <td className="py-2 px-4 border-b">{res.guestName}</td>
                                    <td className="py-2 px-4 border-b">{res.packageName}</td>
                                    <td className="py-2 px-4 border-b">{formatDate(res.checkIn)}</td>
                                    <td className="py-2 px-4 border-b">{formatDate(res.checkOut)}</td>
                                    <td className="py-2 px-4 border-b font-semibold text-green-700">
                                        {Math.round(res.totalPrice)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}
