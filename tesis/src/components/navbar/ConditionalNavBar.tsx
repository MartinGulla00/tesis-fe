import React from "react";
import { useLocation } from "react-router-dom";
import { DesktopNavBar } from "@/components/navbar/DesktopNavBar";
import { TabletNavBar } from "@/components/navbar/TabletNavBar";
import { MobileNavBar } from "@/components/navbar/MobileNavBar";
import * as paths from "@/routing/paths";
import { useMediaQuery } from "@/hooks/common/useMediaQuery";

const ConditionalNavBar: React.FC = () => {
  const { isDesktop, isTablet, isMobile } = useMediaQuery();
  const location = useLocation();

  if (location.pathname === paths.LOGIN) {
    return null;
  } else if (isDesktop) {
    return <DesktopNavBar />;
  } else if (isTablet) {
    return <TabletNavBar />;
  } else if (isMobile) {
    return <MobileNavBar />;
  } else {
    return null;
  }
};

export default ConditionalNavBar;
