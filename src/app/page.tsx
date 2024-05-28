"use client"
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";

import { AdminIcon, ClientIcon } from "../assets/clientsIcons";
import PartnershipsOnboarding from "./client/PartnershipsOnboardingPage/partnershipsOnboarding";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <PartnershipsOnboarding />
      <div className="pt-3">
      </div>
    </main>
  );
}
