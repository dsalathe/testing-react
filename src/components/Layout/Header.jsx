import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // Get the base URL from the router's basename
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="header-title">
            <h1>David Salathé</h1>
          </Link>
        </div>
        
        <div className={`header-center ${isScrolled ? 'header-center-hidden' : ''}`}>
          <a 
            href="https://dsalathe.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="profile-pic-link"
          >
            <img
              // Use the baseUrl for the image path
              src={`${baseUrl}profile-picture.jpg`}
              alt="David Salathé"
              className="header-profile-pic"
            />
          </a>
        </div>

        <nav className="header-nav">
          <Link to="/" className="nav-link">Blog</Link>
          <a 
            href="https://dsalathe.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;