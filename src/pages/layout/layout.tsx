import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/nav-bar/nav-bar";

const Layout: React.FC = () => {
  return (
    <div className="App ">
      <Navbar />

      <main className="min-h-screen bg-gray-100 m-0 p-5">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
