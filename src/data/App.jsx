import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop/>
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
