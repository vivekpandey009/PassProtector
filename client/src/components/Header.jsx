const Header = () => {
  return (
    <nav className="p-4 bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">Pass Protector</div>

        {/* Links */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
