import "./Footer.css";

const Footer = () => {
  return (
    <div className="py-1 footer fixed-bottom">
      <p>Copyright &copy; {new Date().getFullYear()} Petohub. All rights reserved</p>
    </div>
  );
};

export default Footer;
