export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p className="mt-2">20, L.B. Shastri Marg, Civil Lines, Prayagraj-211001</p>
          <p className="mt-1">Email: imperiablessings@gmail.com</p>
          <p className="mt-1">Phone: +91 9415164170 (reservation) ,+91 9151732969</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="/rooms" className="hover:text-orange-400">Rooms</a></li>
            <li><a href="/gallery" className="hover:text-orange-400">Gallery</a></li>
            <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <p className="mt-2">Stay connected with us on social media.</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-orange-400">Facebook</a>
            <a href="#" className="hover:text-orange-400">Instagram</a>
            <a href="#" className="hover:text-orange-400">Twitter</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>&copy; 2024 Imperia Blessings. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
