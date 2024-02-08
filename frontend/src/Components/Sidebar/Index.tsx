import React from "react";
import { Sidebar, SidebarItem } from "@/Components/Sidebar/Sidebar";
import { Home, Package, Book, Users, CalendarClock, HelpCircle,Map } from "lucide-react";

import Link from "next/link";

export const Index = () => {
  return (
    <div className="h-full w-auto flex flex-col bg-blue-400 border-r shadow-sm">
      <Sidebar>
        <Link href="/admin/dash">
          <SidebarItem icon={<Map size={20} />} text="Locations" />
        </Link>
        <Link href="/admin/packages">
          <SidebarItem icon={<Package size={20} />} text="Packages" />
        </Link>
        <Link href="/admin/blogs">
          <SidebarItem icon={<Book size={20} />} text="Blogs" />
        </Link>
        <Link href="/admin/contactus">
          <SidebarItem icon={<HelpCircle size={20} />} text="Queries" />
        </Link>
        <Link href="/admin/plantrip">
          <SidebarItem icon={<CalendarClock size={20} />} text="Plan Trip" />
        </Link>
        <Link href="/auth/signup">
          <SidebarItem icon={<Users size={20} />} text="Create admin" />
        </Link>
      </Sidebar>
    </div>
  );
};
