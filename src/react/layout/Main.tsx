import { FC, ReactNode } from "react";

type MainProp = {
  children?: ReactNode;
};
const Main: FC<MainProp> = ({ children }) => {
  return <main className="main">{children}</main>;
};

export default Main;
