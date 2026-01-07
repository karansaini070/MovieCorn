import { Instagram, Linkedin, Mail, Popcorn } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-amber-500 text-xl font-bold">
            <Popcorn />
            MovieCorn
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            MovieCorn is a modern movie discovery app where you can explore
            trending, top-rated movies and watch trailers instantly.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Trending Movies</li>
            <li className="hover:text-white cursor-pointer">Top Rated</li>
            <li className="hover:text-white cursor-pointer">Search</li>
          </ul>
        </div>

        {/* FEATURES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Features</h3>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li>🎬 Watch Trailers</li>
            <li>⭐ Top Rated Movies</li>
            <li>🔥 Trending Content</li>
            <li>📱 Fully Responsive</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect with Me</h3>

          <div className="flex flex-col gap-3 text-gray-400 text-sm">

            <a
              href="https://www.instagram.com/____karansaini____/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Instagram size={18} />
              @____karansaini____
            </a>

            <a
              href="https://www.linkedin.com/in/karan-75931a3a0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Linkedin size={18} />
              LinkedIn Profile
            </a>

            <a
              href="mailto:karansainibro@gmail.com"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Mail size={18} />
              karansainibro@gmail.com
            </a>

          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MovieCorn. Built with ❤️ by Karan Saini
      </div>
    </footer>
  );
};

export default Footer;
