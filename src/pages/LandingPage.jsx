import HeroCarousel from "../components/HeroCarousel";
import Announcements from "../sections/Announcements";
import VideoCourseDashboard from "../sections/VideoCourseDashboard";
import NewsGrid from "../sections/NewsGrid";
import EvaluationResults from "../sections/EvaluationResults";


const LandingPage = () => {
  return (
    <>
      <HeroCarousel />
      <VideoCourseDashboard />
      <EvaluationResults />
      <Announcements />
      <NewsGrid />
    </>
  );
};

export default LandingPage;