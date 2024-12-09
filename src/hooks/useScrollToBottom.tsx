import { useEffect, useRef, MutableRefObject } from "react";

const useAutoScrollToBottom = (): MutableRefObject<HTMLDivElement | null> => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });

    observer.observe(container, { childList: true, subtree: true });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  return containerRef;
};

export default useAutoScrollToBottom;
