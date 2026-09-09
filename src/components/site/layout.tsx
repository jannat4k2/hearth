import type { ReactNode } from "react";
import { SiteHeader } from "./header";
import { SiteFooter } from "./footer";
import {
  DesktopAdRails,
  GlobalAdScripts,
  GlobalBottomAds,
  ResponsiveLeaderboard,
} from "@/components/ads/adsterra";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <GlobalAdScripts />
      <SiteHeader />
      <DesktopAdRails />
      <div className="no-print border-b border-line bg-elevated/70 py-3">
        <ResponsiveLeaderboard />
      </div>
      <div className="flex-1">{children}</div>
      <GlobalBottomAds />
      <SiteFooter />
    </div>
  );
}
