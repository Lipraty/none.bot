import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_SCROLL_TIMEOUT_DURATION = 1000;

export function usePageNavigation(
  numSections: number,
  scrollTimeoutDuration = DEFAULT_SCROLL_TIMEOUT_DURATION
) {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>(Array(numSections).fill(null));
  const scrolling = useRef(false);
  const isInitialLoad = useRef(true);

  const assignSectionRef = useCallback((index: number) => (el: HTMLElement | null) => {
    if (index < numSections) { // Ensure index is within bounds
        sectionsRef.current[index] = el;
    }
  }, [numSections]);

  useEffect(() => {
    // Adjust refs array size if numSections changes dynamically (though not typical for this setup)
    if (sectionsRef.current.length !== numSections) {
        sectionsRef.current = Array(numSections).fill(null);
    }
  }, [numSections]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrolling.current || !sectionsRef.current.some(ref => ref) || numSections === 0) return;

      const windowHeight = window.innerHeight;
      if (windowHeight === 0) return;

      let bestMatch = { index: activeSection, visibility: -1, distance: Infinity };

      sectionsRef.current.forEach((sectionEl, index) => {
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;
          const sectionHeight = rect.height;

          const visibleTop = Math.max(0, sectionTop);
          const visibleBottom = Math.min(windowHeight, sectionBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = sectionHeight > 0 ? visibleHeight / sectionHeight : 0;

          const viewportCenter = windowHeight / 2;
          const sectionCenterInViewport = sectionTop + sectionHeight / 2;
          const distanceToCenter = Math.abs(viewportCenter - sectionCenterInViewport);

          if (visibilityRatio > 0.5) {
            if (bestMatch.visibility < 0.5 || visibilityRatio > bestMatch.visibility || (visibilityRatio === bestMatch.visibility && distanceToCenter < bestMatch.distance)) {
              bestMatch = { index, visibility: visibilityRatio, distance: distanceToCenter };
            }
          } else if (bestMatch.visibility <= 0.5 && distanceToCenter < bestMatch.distance) { // Changed from < 0.5 to <= 0.5
            bestMatch = { index, visibility: visibilityRatio, distance: distanceToCenter };
          }
        }
      });
      
      if (new Set(sectionsRef.current).size === 1 && sectionsRef.current[0] === null && numSections > 0) {
        // All refs are null, likely not rendered yet, do nothing.
      } else if (bestMatch.index !== activeSection) {
        setActiveSection(bestMatch.index);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (numSections === 0) return;
      const targetElement = e.target as HTMLElement;
      // Check if the wheel event originated from an element that should allow default scroll behavior
      if (targetElement.closest('.allow-scroll') || (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName))) {
        const modal = (document.activeElement as HTMLElement)?.closest('[role="dialog"], [aria-modal="true"]');
        if (modal && modal.contains(targetElement)) {
             return; // Allow scroll within modals or specified elements
        }
      }
        
      e.preventDefault();

      if (scrolling.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const currentActive = activeSection; // Use a stable value for calculation
      const nextSection = Math.max(0, Math.min(numSections - 1, currentActive + direction));

      if (nextSection !== currentActive) {
        scrolling.current = true;
        setActiveSection(nextSection); // Update state
        const targetSectionEl = sectionsRef.current[nextSection];
        if (targetSectionEl) {
          targetSectionEl.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            scrolling.current = false;
          }, scrollTimeoutDuration);
        } else {
          scrolling.current = false;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Listen on documentElement for wheel events to ensure capture and preventDefault works as expected.
    document.documentElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("wheel", handleWheel);
    };
  }, [activeSection, numSections, scrollTimeoutDuration, sectionsRef]); // Added sectionsRef to dependencies

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= numSections) return; // Index out of bounds

    if (index === activeSection && !scrolling.current && !isInitialLoad.current) {
      return;
    }
    if (scrolling.current) {
      return;
    }
    isInitialLoad.current = false;

    scrolling.current = true;
    setActiveSection(index);
    const targetSectionEl = sectionsRef.current[index];
    if (targetSectionEl) {
      targetSectionEl.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        scrolling.current = false;
      }, scrollTimeoutDuration);
    } else {
      scrolling.current = false; 
    }
  }, [activeSection, numSections, scrollTimeoutDuration, sectionsRef]); // Added numSections and sectionsRef

  useEffect(() => {
    if (isInitialLoad.current && numSections > 0) {
        // On initial load, ensure activeSection is 0 if scrolled to top,
        // or set by current scroll position otherwise.
        const currentScrollY = window.scrollY;
        if (currentScrollY === 0) {
            setActiveSection(0);
        } else {
            // Trigger a scroll event handle to determine initial section
             const scrollEvent = new Event('scroll');
             window.dispatchEvent(scrollEvent);
        }
    }
    const timer = setTimeout(() => { isInitialLoad.current = false; }, 100);
    return () => clearTimeout(timer);
  }, [numSections]); // Only run on numSections change (effectively once on mount)

  return { activeSection, assignSectionRef, scrollToSection, sectionsRef };
}
