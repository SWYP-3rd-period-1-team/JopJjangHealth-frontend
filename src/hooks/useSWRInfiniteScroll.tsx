/*
import { useEffect } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

export const useSWRInfiniteScroll = (
    query,
    data,
    setSize,
    isValidating,
    error,
    intersectionRef
) => {
    const intersectionCallback = () => {
        setSize((pre) => pre + 1);
    };
    
    const isReachEnd =
        data.length !== 0 &&
        data[data.length - 1].page.current_page *
        data[data.length - 1].page.per_page >=
        data[data.length - 1].page.total_count;
    
    const { unobserve, registerObserver } = useIntersectionObserver();
    
    useEffect(() => {
        if (!intersectionRef.current || isReachEnd) return;
        if (isValidating) {
            unobserve(intersectionRef.current);
            return;
        }
        
        registerObserver(intersectionCallback, intersectionRef.current, {});
        
        return () => {
            unobserve(intersectionRef.current);
        };
    }, [isValidating, query]);
    
    useEffect(() => {
        if (isReachEnd || error) {
            unobserve(intersectionRef.current);
        }
    }, [isReachEnd, query, error]);
};

 */
