import Header from "./partials/Header.jsx";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
