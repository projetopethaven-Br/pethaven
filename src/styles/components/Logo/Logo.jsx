import logo from "../../assets/hero.png";
import "./Logo.css";

function Logo({ width = 220, className = "" }) {
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