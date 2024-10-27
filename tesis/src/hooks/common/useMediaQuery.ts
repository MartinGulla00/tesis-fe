import { useState, useEffect } from "react";

export function useMediaQuery() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
      setIsTablet(
        window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches
      );
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };

    window.addEventListener("resize", updateMedia);
    updateMedia(); // initial check

    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return { isDesktop, isTablet, isMobile };
}
