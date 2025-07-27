import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Reservations from './pages/Reservations'
import PackageDetail from './pages/PackageDetail' // You'll create this
import ReservationDetail from './pages/ReservationDetail'; 
import ReservationForm from './pages/ReservationForm'; 

function App() {
  return (
    <>    
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations/" element={<Reservations />} />
        <Route path="/package/:id" element={<PackageDetail />} />
        <Route path="/reservations/:id" element={<ReservationDetail />} />
        <Route path="/reservations/new/:packageId" element={<ReservationForm />} />
        <Route path="/reservations/edit/:id" element={<ReservationForm />} />

      </Routes>
    </>

  )
}
export default App;