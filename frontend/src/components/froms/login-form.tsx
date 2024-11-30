import Style from "./layout.module.css";
import { Button, ButtonStyle } from "@/components/button/button";
import { FaEnvelope, FaLock, FaEye } from "react-icons/fa"; // Import der Icons

export default function LoginItems() {
  return (
    <div className={Style["login-container"]}>
      <div className={Style["login-form"]}>
        {/* Email Field */}
        <div className={Style["form-group"]}>
          <label htmlFor="email">Email Address</label>
          <div className={Style["input-container"]}>
            <FaEnvelope className={Style["icon"]} /> {/* Icon für Email */}
            <input
              type="email"
              id="email"
              placeholder="stepsync@miau.co"
              required
            />
          </div>
        </div>

        <div className={Style["form-group"]}>
          <label htmlFor="password">Password</label>
          <div className={Style["input-container"]}>
            <FaLock className={Style["icon"]} /> {/* Icon für Passwort */}
            <input
              type="password"
              id="password"
              placeholder="********"
              required
            />
            <FaEye className={Style["icon eye"]} />{" "}
          </div>
        </div>

        <Button style={ButtonStyle.PRIMARY} label="Login" />

        <div className={Style["login-links"]}>
          <p>
            Hast Du kein Account? <a href="/registration">Registrieren</a>
          </p>
          {/* <a href="/forgot-password">Forgot Password</a> */}
        </div>
      </div>
    </div>
  );
}
