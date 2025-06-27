
import { Car } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-[#363636] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8" />
            <span className="font-poppins font-semibold text-xl">AutoStock</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
