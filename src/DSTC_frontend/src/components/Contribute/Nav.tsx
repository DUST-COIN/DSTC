import { Link } from "react-router-dom";
import { mediumLogo, moreIcon, NotificationIcon } from "./icons";
import AvatarMenu from "./AvatarMenu";
import AppLogo from "../sub-components/AppLogo";
type WriteNavType = {
  onClick(): void;
  disabled: boolean;
  buttonText: string;
  publish: any;
};

export default function WriteNavbar({
  onClick,
  disabled,
  buttonText,
  publish,
}: WriteNavType) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px",
        paddingInline: "10px",
      }}
    >
      <Link to="/">
        <div className="left_write_nav">
          <h1>$DUST</h1>
        </div>
      </Link>

      <div
        className="right_write_nav"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* cbe4ca */}
        <button
          onClick={() => {
            publish();
          }}
          style={{
            color: "white",
            backgroundColor: "#1a8917",
            border: "none",
            outline: "none",
            padding: "6px 12px",
            borderRadius: "15px",
            letterSpacing: "0.2px",
            cursor: "pointer",
          }}
        >
          Publish article
        </button>
        <span style={{ color: "gray", cursor: "pointer" }}>{moreIcon}</span>
        {/* <Link to="/notifications"> */}
        <span style={{ color: "gray", cursor: "pointer" }}>
          {NotificationIcon}
        </span>
        {/* </Link> */}
      </div>
    </div>
  );
}
