import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <div className="mountain-background" />
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <Header />
        {children}
      </div>
    </>
  );
}

export default Layout;