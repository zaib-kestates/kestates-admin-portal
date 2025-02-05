import AppLogo from '../../assets/app-logo.png';
import './index.css';

function Header() {
  return (
    <div className="dv-header d-flex align-items-center justify-content-between px-5">
      <img src={AppLogo} className="img-app-logo" alt="application logo" />
      <div className="dv-user">
        <label className="label-username">Admin</label>
        <label className="label-useremail">admin@kestates.ae</label>
      </div>
    </div>
  );
}

export default Header;
