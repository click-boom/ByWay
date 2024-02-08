import React from 'react';

type TravelPackageTableProps = {
  depature_and_return: string | { dangerouslySetInnerHTML: { __html: string } };
  guidance_language: string | { dangerouslySetInnerHTML: { __html: string } };
  accessibility: string | { dangerouslySetInnerHTML: { __html: string } };
};

const TravelPackageTable: React.FC<TravelPackageTableProps> = ({
  depature_and_return,
  guidance_language,
  accessibility,
}) => {
  const renderContent = (content: string | { dangerouslySetInnerHTML: { __html: string } }) => {
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return <div {...content} />;
  };

  return (
    <table className="w-full mt-4 border-collapse border border-amber-50c">
      <tbody>
        <tr>
          <td className="font-semibold pr-2 border border-gray-400">Depature and Return:</td>
          <td className="border border-gray-400">{renderContent(depature_and_return)}</td>
        </tr>
        <tr>
          <td className="font-semibold pr-2 border border-gray-400">Guidance language:</td>
          <td className="border border-gray-400">{renderContent(guidance_language)}</td>
        </tr>
        <tr>
          <td className="font-semibold pr-2 border border-gray-400">Accessibility:</td>
          <td className="border border-gray-400">{renderContent(accessibility)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TravelPackageTable;
