import { useState, useEffect, useRef } from "react";
import "../styles/common.css";
import { MdWidgets } from "react-icons/md";
import Collapse from "./Collapse";
import ColorsContent from "./ColorsContent";
import BgContent from "./BgContent";
import ModeContent from "./ModeContent";
import Weather from "./weather/Weather";

function SettingBox() {
  const [toggle, setToggle] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    // add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref}>
      <div
        className={`toggle-settings ${toggle ? "toggle-settings--open" : ""}`}
        onClick={() => setToggle(!toggle)}
      >
        <MdWidgets className={`gear ${toggle ? "active" : ""}`} />
      </div>

      {toggle && (
        <div className="settings-box">
          <div className="settings-container">
            <ModeContent></ModeContent>
            <Collapse title="Couleurs"> {<ColorsContent />}</Collapse>
            <Collapse title="Backgrounds"> {<BgContent />} </Collapse>
            <Weather></Weather>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingBox;
