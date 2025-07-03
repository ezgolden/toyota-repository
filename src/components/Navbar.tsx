
const Navbar = () => {
  return (
    <nav className="bg-[#363636] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/eaaeb670-65bd-464e-a3b7-b90dc8f5cc2c.png" 
              alt="Toyota Logo" 
              className="h-8 w-auto"
            />
            <span className="font-poppins font-semibold text-xl">Estoque</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
