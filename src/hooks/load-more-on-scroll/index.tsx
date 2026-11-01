import { useEffect, useRef } from 'react';

interface UseLoadMoreOnScrollProps {
  isFetching: boolean;
  onLoadMore: () => void;
  hasMore?: boolean;
  threshold?: number;
}

export const useLoadMoreOnScroll = ({
  isFetching,
  onLoadMore,
  hasMore = true,
  threshold = 0.1,
}: UseLoadMoreOnScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          onLoadMore();
        }
      },
      { threshold }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [isFetching, onLoadMore, hasMore, threshold]);

  return loadMoreRef;
};
