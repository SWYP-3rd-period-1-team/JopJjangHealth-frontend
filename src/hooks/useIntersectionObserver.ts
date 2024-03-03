/*
import { useCallback, useRef } from "react";

const useIntersectionObserver = () => {
    const observer = useRef<IntersectionObserver | null>(null);
    
    const registerObserver = useCallback(
        (
            callback: () => void,
            target: Element | null,
            options: IntersectionObserverInit
        ) => {
            observer.current = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callback();
                    }
                });
            }, options);
            observer.current.observe(target);
        },
        []
    );
    
    const observe = useCallback((target: Element | null) => {
        observer.current.observe(target);
    }, []);
    
    const unobserve = useCallback((target: Element) => {
        if (!target || !observer.current) return;
        observer.current.unobserve(target);
    }, []);
    
    return { observe, unobserve, registerObserver };
};

export default useIntersectionObserver;

 */
