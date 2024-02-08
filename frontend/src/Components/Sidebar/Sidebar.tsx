import React, { createContext, useContext, useState, useEffect } from "react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({
  expanded: false,
});

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [userInfo, setUserInfo] = useState<{ username: string; email: string }>(
    { username: "", email: "" }
  );
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8081/admin/dash", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserInfo(response.data.UserData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8081/auth/logout");
      router.push("/auth");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-slate-900 border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={"/assets/logos/logo.png"}
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt="Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-2 rounded-sm bg-gray-500 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex flex-col p-3 px-4">
            <button
              onClick={handleLogout}
              className="py-3 px-2 rounded-lg bg-gray-500 hover:bg-green-700 flex items-center"
            >
              <RiLogoutCircleRLine size={25} color="white" />
              {expanded && <span className="ml-2 text-white">Logout</span>}
            </button>

            <div className="flex mt-3">
              <div
                className={`w-10 h-10 rounded-md flex items-center justify-center bg-green-600 text-white`}
              >
                {userInfo.username && (
                  <span className="text-lg">
                    {userInfo.username.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div
                className={`flex justify-between items-center overflow-hidden transition-all ${
                  expanded ? "w-52 ml-3" : "w-0"
                } `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold text-green-400">
                    {userInfo.username}
                  </h4>
                  <span className="text-xs text-gray-600">
                    {userInfo.email}
                  </span>
                </div>
                <MoreVertical size={20} />
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-green-200 to-green-400 text-green-800"
          : "hover:bg-green-700 hover:text-white  text-gray-400"
      }`}
    >
      {icon}
      <span className={`overflow-hidden ${expanded ? "ml-3" : "w-0"}`}>
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-green-200 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-green-700 text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
