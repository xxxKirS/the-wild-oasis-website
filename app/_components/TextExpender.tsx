'use client';

import { useState, useRef, useLayoutEffect, useCallback } from 'react';

type Props = {
  children: string;
};

function TextExpander({ children }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
  const fullTextRef = useRef<HTMLSpanElement>(null);

  // Measure expanded height once after mount
  useLayoutEffect(() => {
    if (fullTextRef.current) {
      const height = fullTextRef.current.getBoundingClientRect().height;
      setExpandedHeight(height);
    }
  }, []);

  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 40).join(' ') + '...';

  // Callback to toggle expansion
  const handleToggle = useCallback(() => setIsExpanded((v) => !v), []);

  return (
    <span
      className={`relative inline-block align-top transition-all duration-300 ${
        !isExpanded && expandedHeight ? 'overflow-hidden' : 'overflow-visible'
      }`}
      style={expandedHeight ? { height: `${expandedHeight}px` } : undefined}
    >
      {/* Hidden full text for measuring height */}
      <span
        ref={fullTextRef}
        className='absolute invisible whitespace-pre-wrap pointer-events-none'
      >
        {children}
      </span>
      {/* Visible text */}
      <span>{displayText} </span>
      <button
        className='text-primary-700 border-b border-primary-700 leading-3 pb-1 h-auto'
        onClick={handleToggle}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
}

export default TextExpander;
