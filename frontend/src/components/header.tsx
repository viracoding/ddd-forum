import logo from "../assets/dddforumlogo.png";
import { Link, useLocation } from "react-router";
import { useUser } from "@/contexts/usersContext.tsx";

const Logo = () => (
  <div id="app-logo">
    <img src={logo} width={100} alt="DDD-Forum Logo"></img>
  </div>
);
const TitleAndSubmission = () => (
  <div id="title-container">
    <h1 className="text-2xl font-mono font-bold">Domain-Driven Designers</h1>
    <p className="text-sm font-mono mb-2">
      Where awesome Domain-Driven Designers are made
    </p>
    <Link to={"/submit"} className="text-blue-600 underline font-mono text-sm">
      submit
    </Link>
  </div>
);

const HeaderActionButton = ({ user }: { user?: any }) => (
  <div id="header-action-button">
    {user ? (
      <div>
        <div>{user.username}</div>
        <u>
          <div>logout</div>
        </u>
      </div>
    ) : (
      <Link
        to="/join"
        className="bg-black text-white px-4 py-2 text-sm font-mono hover:bg-gray-800"
      >
        Join
      </Link>
    )}
  </div>
);

const shouldShowActionButton = (pathName: string) => {
  return pathName !== "/join";
};

export const Header = () => {
  const location = useLocation();
  const { user } = useUser();

  return (
    <header className="mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Logo />
          <div>
            <TitleAndSubmission />
          </div>
        </div>
        {shouldShowActionButton(location.pathname) ? (
          <HeaderActionButton user={user} />
        ) : (
          ""
        )}
      </div>
    </header>
  );
};
