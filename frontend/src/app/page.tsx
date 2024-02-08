import SectionTitle from "@/Components/Common/SectionTitle";
import Features from "@/Components/Features";
import FooterTab from "@/Components/Footer";
import HeaderTab from "@/Components/Header";
import { ClientMap } from "@/Components/Maps/ClientMap";
import PhotoGallery from "@/Components/Screenshot/page";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <HeaderTab />
    
      <div style={{ height: "80vh", position: "relative" }}>
        <Image
          src="/assets/coverimage.jpg"
          alt="Welcome To ByWay"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <SectionTitle
        title="Our Services"
        paragraph="Embark on extraordinary adventures with seamless and enriching experience that goes beyond the ordinary with Byway"
        center
        mb="0"
      />
      <Features />
      <SectionTitle
        title="Our Packages"
        paragraph="Byway has been providing travel packages on popular destinations across the nation "
        center
        mb="0"
      />
        <PhotoGallery/>
      <ClientMap id="clientMap" />
      <FooterTab />
    </>
  );
}