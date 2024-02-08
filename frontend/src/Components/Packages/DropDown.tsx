import React, { useState, ReactNode } from "react";

interface ExpandableSectionProps {
  buttonLabel: string;
  expandedContent?:
    | string
    | ReactNode
    | { dangerouslySetInnerHTML: { __html: string } };
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  buttonLabel,
  expandedContent,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!isExpanded);
  };
const renderContent = (
  content: string | { dangerouslySetInnerHTML: { __html: string } } | ReactNode
) => {
  if (typeof content === "string") {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  } else if (content && typeof content !== "string") {
    return <div {...content} />;
  }
  return null; 
};



  return (
    <div>
      <div className="pt-2 rounded-lg pb-2">
        <button
          className="text-xl font-bold text-black"
          onClick={handleExpandClick}
        >
          {buttonLabel}
        </button>

        {isExpanded && (
          <div className=" ">{renderContent(expandedContent)}</div>
        )}
      </div>
      <hr className="border-black p-px2" />
    </div>
  );
};

export default ExpandableSection;
