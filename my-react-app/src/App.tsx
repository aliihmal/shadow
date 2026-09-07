import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/tokens.css";

import AboutPage from "./components/AboutPage";
import CategoriesPage from "./components/CategoriesPage";
import MachineDetailPage from "./components/MachineDetailPage";

import ArabicBreadPage from "./pages/arabic/ArabicPitaBread";
import BreadPitaDescriptionPage from "./pages/arabic/BreadPitaDescriptionPage";

import PizzaManakishMachinesPage from "./pages/pizzaManakish/PizzaManakishMachinesPage";
import PizzaManakishDescriptionPage from "./pages/pizzaManakish/PizzaManakishDescriptionPage";
import PastryMachinesPage from "./pages/Pastry/PastryMachinesPage";
import PastryMachineDetails from "./pages/Pastry/PastryMachineDetails";
import TannourMachinesPage from "./pages/Tannour/TannourMachinesPage";
import TannourMachineDescriptionPage from "./pages/Tannour/TannourMachineDescriptionPage";
import KatayefMachinesPage from "./pages/Katayef/KatayefMachinesPage";
import KatayefMachineDescriptionPage from "./pages/Katayef/KatayefMachineDescriptionPage";
import MaamoulMachinesPage from "./pages/Maamoul/MaamoulMachinesPage";
import MaamoulMachineDescriptionPage from "./pages/Maamoul/MaamoulMachineDescriptionPage";
import PackagingMachinesPage from "./pages/packaging/PackagingMachinesPage";
import PackagingMachineDescriptionPage from "./pages/packaging/PackagingMachineDescriptionPage";
import RotaryOvenPage from "./pages/rotary/RotaryOvenPage";
import ContactPage from "./pages/contact/contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<CategoriesPage />}
        />

        {/* About */}
        <Route
          path="/About"
          element={<AboutPage />}
        />

        {/* ==================== */}
        {/* Arabic Bread */}
        {/* ==================== */}

        <Route
          path="/category/arabic-bread"
          element={<ArabicBreadPage />}
        />

        <Route
          path="/category/arabic-bread/machine/:machineId"
          element={<BreadPitaDescriptionPage />}
        />

        {/* ==================== */}
        {/* Pizza & Manakish */}
        {/* ==================== */}

       

        <Route
          path="/category/pizza-manakish/machine/:machineId"
          element={<PizzaManakishDescriptionPage />}
        /> <Route
          path="/category/pizza-manakish"
          element={<PizzaManakishMachinesPage />}
        />

        {/* ==================== */}
        {/* Other Categories */}
        {/* ==================== */}
          <Route path="/category/pastry"  element={<PastryMachinesPage />}/>

          <Route path="/category/pastry/machine/:machineId" element={<PastryMachineDetails />}/>
        



    <Route path="/category/bread-production" element={<TannourMachinesPage />} />
    <Route path="/category/bread-production/machine/:machineId" element={<TannourMachineDescriptionPage />} />
    <Route path="/category/Katayf" element={<KatayefMachinesPage />} />
     <Route path="/category/Katayf/machine/:machineId" element={<KatayefMachineDescriptionPage />} />

     <Route path="/category/maamoul-mooncake" element={<MaamoulMachinesPage />} />
      <Route path="/category/maamoul-mooncake/machine/:machineId" element={<MaamoulMachineDescriptionPage />} />

      <Route path="/category/packaging-machines" element={<PackagingMachinesPage />} />
       <Route path="/category/packaging-machines/machine/:machineId" element={<PackagingMachineDescriptionPage />} />
       <Route path="/category/rotary-oven" element={<RotaryOvenPage />}/>
       <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}