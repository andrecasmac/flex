"use client";
import React from "react";
import { PageTitle } from "@/components/page-title";
import DocConfig from "./conf-doc";

export default function Page({searchParams/*Parameters we receive from Partnerhsips Page*/}:{
  searchParams :{
  id:string,
  name: string
  }
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <PageTitle title={"Document Configuration "+ searchParams.name} />
      <div className="flex w-screen justify-center pb-20">
        <DocConfig documentId={searchParams.id}/>
      </div>
    </div>
  );
}
