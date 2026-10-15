import { useRef, useEffect, useState, useCallback, useMemo } from 'react';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PADDING = (WHEEL_HEIGHT - ITEM_HEIGHT) / 2;
const WHEEL_COOLDOWN_MS = 10;

function AreaWheelPicker({ areas, selectedArea, onSelect, accentColor }) {
  const containerRef = useRef(null);
  const options = useMemo(() => ['Todas', ...areas], [areas]);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, selectedArea ? options.indexOf(selectedArea) : 0)
  );
  const initialIndex = useRef(activeIndex);
  const isWheelLocked = useRef(false);
  const isDragging = useRef(false);

  const selectIndex = useCallback(
    (index) => {
      const clamped = Math.min(options.length - 1, Math.max(0, index));
      const container = containerRef.current;
      if (container) {
        container.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: 'smooth' });
      }
      setActiveIndex(clamped);
      onSelect(clamped === 0 ? null : options[clamped]);
    },
    [onSelect, options]
  );

  // Interceptamos la rueda del ratón manualmente: 1 "click" = 1 sección
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isWheelLocked.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      isWheelLocked.current = true;
      selectIndex(activeIndex + direction);

      setTimeout(() => {
        isWheelLocked.current = false;
      }, WHEEL_COOLDOWN_MS);
    };

    // passive: false es necesario para poder usar preventDefault en wheel
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [activeIndex, selectIndex]);

  // Soporte para arrastrar con el dedo/ratón (touch y drag en desktop)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout;
    const handleScroll = () => {
      if (!isDragging.current) return;
      const index = Math.round(container.scrollTop / ITEM_HEIGHT);
      setActiveIndex(index);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const snapped = Math.round(container.scrollTop / ITEM_HEIGHT);
        onSelect(snapped === 0 ? null : options[snapped]);
      }, 120);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [onSelect, options]);

  // Al montar, colocamos la rueda en la zona seleccionada
  useEffect(() => {
    containerRef.current?.scrollTo({ top: initialIndex.current * ITEM_HEIGHT, behavior: 'auto' });
  }, []);

  return (
    <div className="relative" style={{ height: WHEEL_HEIGHT, width: 180 }}>
      <div
        className="absolute left-0 right-0 pointer-events-none border-y transition-colors duration-500"
        style={{
          top: PADDING,
          height: ITEM_HEIGHT,
          borderColor: accentColor,
          backgroundColor: `${accentColor}1a`,
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-neutral-950 to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onTouchStart={() => (isDragging.current = true)}
        onTouchEnd={() => (isDragging.current = false)}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ paddingTop: PADDING, paddingBottom: PADDING }}
      >
        {options.map((option, index) => {
          const distance = Math.abs(index - activeIndex);
          const isActive = index === activeIndex;

          return (
            <div
              key={option}
              onClick={() => selectIndex(index)}
              className="snap-center flex items-center justify-center cursor-pointer transition-all duration-300 ease-out select-none"
              style={{
                height: ITEM_HEIGHT,
                opacity: isActive ? 1 : Math.max(0.25, 1 - distance * 0.3),
                transform: `scale(${isActive ? 1 : Math.max(0.8, 1 - distance * 0.1)})`,
                color: isActive ? accentColor : '#a3a3a3',
                fontWeight: isActive ? 600 : 400,
                fontSize: isActive ? '0.95rem' : '0.85rem',
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AreaWheelPicker;