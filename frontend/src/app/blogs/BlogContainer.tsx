// import React from 'react';
// import Image from 'next/image';

// interface BlogContainerProps {
//   title: string;
//   description: string;
//   publishedDate: string;
//   imageSrc: string;
// }

// const BlogContainer: React.FC<BlogContainerProps> = ({
//   title,
//   description,
//   publishedDate,
//   imageSrc,
// }) => {
//   return (
//     <div
//       style={{
//         flexShrink: 0,
//         width: "32%",
//         height: "600px",
//         boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
//         borderRadius: "10px",
//         padding: "20px",
//         overflow: "hidden",
//         transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//         cursor: "pointer",
//         boxSizing: "border-box",
//       }}
//     >
//       <div>
//         <h2
//           style={{
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           {title}
//         </h2>
//         <small>Date: {new Date(publishedDate).toLocaleDateString()}</small>
//       </div>

//       <div style={{ height: "500px", position: "relative" }}>
//         <Image src={imageSrc} alt={title} width={600} height={150} />
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// };

// export default BlogContainer;
import Image from 'next/image';
import React from 'react';

interface BlogContainerProps {
  title: string;
  description: string;
  publishedDate: string;
  imageSrc: string;
}

const BlogContainer: React.FC<BlogContainerProps> = ({
  title,
  description,
  publishedDate,
  imageSrc,
}) => {
  // Function to sanitize HTML by removing unwanted tags
  const sanitizeHtml = (html: string) => {
    const allowedTags = ['p', 'strong', 'em', 'u', 'a', 'br', 'h1', 'h2', 'h3']; // Add more tags if needed
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Remove unwanted tags
    doc.body.querySelectorAll('*').forEach((node) => {
      if (!allowedTags.includes(node.tagName.toLowerCase())) {
        node.parentNode.removeChild(node);
      }
    });

    return doc.body.innerHTML;
  };

  const sanitizedDescription = sanitizeHtml(description);

  return (
    <div
      style={{
        flexShrink: 0,
        width: "32%",
        height: "600px",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
        borderRadius: "10px",
        padding: "20px",
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        cursor: "pointer",
        boxSizing: "border-box",
      }}
    >
      <div>
        <h2
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h2>
        <small>Date: {new Date(publishedDate).toLocaleDateString()}</small>
      </div>

      <div style={{ height: "500px", position: "relative" }}>
        <Image src={imageSrc} alt={title} width={600} height={150} />
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          style={{ fontSize: "16px", color: "#555" }}
        />
      </div>
    </div>
  );
};

export default BlogContainer;
