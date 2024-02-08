import Image from "next/image";

interface LeftPanelProps {
  imagePath: string;
  title: string;
  date: string; 
}

const LeftPanel: React.FC<LeftPanelProps> = ({ imagePath, title, date }) => {
  return (
    <div className="relative w-45 p-7 mb-4 bg-white border border-gray-300 rounded-md transition duration-300 hover:shadow-md hover:bg-gray-100">
      <div className="mb-2">
        <Image
          src={imagePath}
          alt="Lumbini Image"
          layout="intrinsic"
          width={85}
          height={89}
          className="rounded"
        />
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="absolute top-2 right-2 text-sm text-gray-500">{date}</div>
    </div>
  );
};

export default LeftPanel;
