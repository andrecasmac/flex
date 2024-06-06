"use client";
import React from "react";
import { PageTitle } from "@/components/page-title";
import DocConfig from "./conf-doc";
export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <PageTitle title="Document Configuration" />
      <div className="flex w-screen justify-center pb-20">
        <DocConfig />
      </div>
    </div>
  );
}
