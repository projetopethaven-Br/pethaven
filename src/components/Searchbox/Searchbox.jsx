import "./SearchBox.css";
import { SearchRounded } from "@mui/icons-material";

export default function SearchBox({
  value,
  onChange,
  placeholder = "Pesquisar...",
}) {
  return (
    <div className="search-box">
      <SearchRounded className="search-box__icon" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}