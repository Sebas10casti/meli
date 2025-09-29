const headerStyle = {
  backgroundColor: "#ffe600",
  display: "flex",
  alignItems: "center",
  padding: "12px 24px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

const logoStyle = {
  height: "40px",
  display: "block",
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <a href="https://www.mercadolibre.com/" aria-label="Mercado Libre">
        <img
          src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.150/mercadolibre/logo_large_plus@2x.webp"
          alt="Mercado Libre"
          style={logoStyle}
        />
      </a>
    </header>
  );
}

export default Header;


