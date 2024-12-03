"use client";

import { useEffect } from "react";
import { store } from "@/Globals/store/store";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname:any = usePathname();

  useEffect(() => {
    // Only load Tawk.to on non-admin routes
    if (!pathname.startsWith("/admin")) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = "https://embed.tawk.to/672789cd2480f5b4f59811b9/1ibp74j6r";
      s1.setAttribute("crossorigin", "*");
      const s0 = document.getElementsByTagName("script")[0];
      s0.parentNode?.insertBefore(s1, s0);
    }
  }, [pathname]);

  return <Provider store={store}>{children}</Provider>;
}
