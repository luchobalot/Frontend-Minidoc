import { useState } from 'react';

export const useSidebar = (sections, onSectionChange, onClose) => {
  const [expanded, setExpanded] = useState(
    sections.reduce((acc, s) => ({ ...acc, [s.id]: true }), {})
  );

  const toggleSection = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClick = (id) => {
    onSectionChange(id);
    if (window.innerWidth < 900) {
      onClose();
    }
  };

  return {
    expanded,
    toggleSection,
    handleClick,
  };
};