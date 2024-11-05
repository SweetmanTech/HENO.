import React from "react"
import Navbar from "@/components/Navbar"
import { usePageLoadProvider } from "@/providers/PageLoadProvider"
import SocialLinks from "@/components/SocialLinks"
import { ILayout } from "../types"

const FullLayout = ({ children }: ILayout) => {
  const { entered } = usePageLoadProvider()

  return (
    <div className="w-screen h-screen py-[30px] px-[50px]">
      <div className="flex flex-col h-[calc(100vh-105px)] gap-y-[5px]">
        {entered && (
          <div className="flex justify-between">
            <Navbar />
            <SocialLinks className="!w-auto !gap-x-[5px]" />
          </div>
        )}
        <div className="flex w-full h-full gap-x-[20px]">{children}</div>
      </div>
    </div>
  )
}

export default FullLayout
