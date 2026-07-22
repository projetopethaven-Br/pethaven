import logo from "../../assets/logo branca1.png";
import "./Logo.css";

function Logo({ width = 6000, className = "" }) {
  return (
    <img
      src={logo}
      alt="PetHaven"
      className={`pethaven-logo ${className}`}
      style={{ width }}
    />
  );
}

export default Logo;