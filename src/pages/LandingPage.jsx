import HeroCarousel from "../components/HeroCarousel";
import Announcements from "../sections/Announcements";
import VideoCourseDashboard from "../sections/VideoCourseDashboard";
import NewsGrid from "../sections/NewsGrid";


const LandingPage = () => {
  return (
    <>
      <HeroCarousel />
      <VideoCourseDashboard />
      <Announcements />
      <NewsGrid />
    </>
  );
};

export default LandingPage;