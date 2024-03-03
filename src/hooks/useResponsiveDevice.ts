import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    const mobile = useMediaQuery({ query: "(max-width:768px)" });
    
    useEffect(() => {
        setIsMobile(mobile);
    }, [mobile]);
    
    return isMobile;
}

export function useIsTablet() {
    const [isTablet, setIsTablet] = useState(false);
    const tablet = useMediaQuery({ query: "(max-width:1024px)" });
    
    useEffect(() => {
        setIsTablet(tablet);
    }, [tablet]);
    
    return isTablet;
}

export function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false);
    const desktop = useMediaQuery({ query: "(min-width:1025px)" });
    
    useEffect(() => {
        setIsDesktop(desktop);
    }, [desktop]);
    
    return isDesktop;
}

export function useCustomMobile(size: number) {
    const [isMobile, setIsMobile] = useState(false);
    const mobile = useMediaQuery({ query: `(max-width:${size}px)` });
    
    useEffect(() => {
        setIsMobile(mobile);
    }, [mobile]);
    
    return isMobile;
}
