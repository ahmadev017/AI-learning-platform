"use client"; // Only if required by imported client components

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Book,
  Compass,
  LayoutDashboard,
  NotebookPen,
  Sparkles,
  User2Icon,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GenerateContentDialog from "./GenerateContentDialog";

function AppSidebar() {
  const path = usePathname();
  const options = [
    { title: "Dashboard", url: "/workspace", icon: <LayoutDashboard /> },
    { title: "My Learning", url: "/workspace/mylearning", icon: <Book /> },
    { title: "Explore Courses", url: "/workspace/explore", icon: <Compass /> },
    { title: "AI Tools", url: "#", icon: <NotebookPen /> },
    { title: "Billing", url: "/workspace/billing", icon: <WalletCards /> },
    { title: "Profile", url: "/workspace/profile", icon: <User2Icon /> },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between my-4 mt-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        MindSpark
                      </span>
                    </div>
                    </div>

        <GenerateContentDialog>
          <Button className="cursor-pointer w-full">Create New Course</Button>
        </GenerateContentDialog>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {options.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <Link
                    href={item.url}
                    className={`${path === item.url ? "text-primary" : ""}`}

                  >
                    <SidebarMenuButton asChild>
                      <div className="flex gap-2 items-center">
                        {item.icon}
                        <span className="text-sm">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
