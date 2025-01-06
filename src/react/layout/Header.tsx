import { ReactNode } from "react";

type PropType = {
  children?: ReactNode;
};

const Header = ({ children }: PropType) => {
  return (
    <header className="header">
      <section className="header__wrapper">
        <h1 className="heading-primary"> IP Address Tracker</h1>
        {children}
      </section>
    </header>
  );
};

export default Header;
