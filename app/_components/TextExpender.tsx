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
      setExpandedHeight(fullTextRef.current.scrollHeight);
    }
  }, []);

  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 40).join(' ') + '...';

  // Callback to toggle expansion
  const handleToggle = useCallback(() => setIsExpanded((v) => !v), []);

  return (
    <span
      className={`${
        expandedHeight &&
        !isExpanded &&
        `inline-block h-[${expandedHeight}] overflow-hidden align-top`
      }`}
    >
      {/* Hidden full text for measuring height */}
      <span
        ref={fullTextRef}
        className='absolute hidden -z-10 whitespace-pre-wrap'
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
