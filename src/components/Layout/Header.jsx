import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Change header after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isScrolled ? '0.5rem 1rem' : '1rem',
      borderBottom: '1px solid #eaeaea',
      marginBottom: '2rem',
      transition: 'all 0.3s ease-in-out',
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: isScrolled ? '1.2rem' : '1.5rem',
          transition: 'font-size 0.3s ease-in-out'
        }}>
          David Salathé
        </h1>
      </div>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center',
        opacity: isScrolled ? 0 : 1,
        transform: `scale(${isScrolled ? 0.8 : 1})`,
        transition: 'all 0.3s ease-in-out',
        visibility: isScrolled ? 'hidden' : 'visible',
        height: isScrolled ? '0' : '50px',
      }}>
        <img
          src="/profile-picture.jpg"
          alt="David Salathé"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </div>

      <nav style={{ 
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem'
      }}>
        <Link 
          to="/"
          style={{
            textDecoration: 'none',
            color: '#333',
            fontWeight: 500
          }}
        >
          Blog
        </Link>
        <a 
          href="https://dsalathe.github.io"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#333',
            fontWeight: 500
          }}
        >
          About
        </a>
      </nav>
    </header>
  );
}

export default Header;