// hooks/useInfiniteScroll.ts
import React, { useEffect, useRef, useCallback, useState } from 'react';

interface UseInfiniteScrollProps<T> {
    fetchData: (page: number) => Promise<{
        data: T[];
        hasMore: boolean;
    }>;
    initialData?: T[];
    itemsPerPage?: number;
}

interface UseInfiniteScrollReturn<T> {
    data: T[];
    isLoading: boolean;
    hasMore: boolean;
    observerRef: React.RefObject<HTMLDivElement>;
}

export function useInfiniteScroll<T>({
                                         fetchData,
                                         initialData = [],
                                         itemsPerPage = 10
                                     }: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
    const [data, setData] = useState<T[]>(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(true);

    // cleanup on unmount
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Intersection Observer 콜백
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasMore && !isLoading) {
            setCurrentPage(prev => prev + 1);
        }
    }, [hasMore, isLoading]);

    // Intersection Observer 설정
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,        // viewport를 root로 사용
            rootMargin: '20px', // viewport 경계로부터의 여백
            threshold: 0.1,    // 타겟 요소가 10% 이상 보일 때 콜백 실행
        });

        const currentObserverRef = observerRef.current;

        if (currentObserverRef) {
            observer.observe(currentObserverRef);
        }

        return () => {
            if (currentObserverRef) {
                observer.unobserve(currentObserverRef);
            }
        };
    }, [handleObserver]);

    // 데이터 fetch
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const loadData = async () => {
            if (isLoading) return;

            setIsLoading(true);
            try {
                // 디바운스 적용 (300ms)
                await new Promise(resolve => {
                    timeoutId = setTimeout(resolve, 300);
                });

                const response = await fetchData(currentPage);

                if (!isMounted.current) return;

                if (currentPage === 1) {
                    setData(response.data);
                } else {
                    setData(prev => [...prev, ...response.data]);
                }
                setHasMore(response.hasMore);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                if (isMounted.current) {
                    setIsLoading(false);
                }
            }
        };

        loadData();

        // cleanup timeout on unmount or when dependencies change
        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentPage, fetchData]);

    return {
        data,
        isLoading,
        hasMore,
        observerRef
    };
}