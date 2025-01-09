import { FRONT_END_MENTOR_URL, MY_URL_Link } from "../config/config";

const Footer = () => {
  return (
    <footer className="footer">
      Challenge by
      <a
        className="a"
        href={FRONT_END_MENTOR_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by
      <a
        className="a"
        href={MY_URL_Link}
        target="_blank"
        rel="noopener noreferrer"
      >
        Peter Godspower
      </a>
      .
    </footer>
  );
};

export default Footer;
