// src/routes/index.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../components/ErrorPage";
import {
  EducationalMaterials,
  CorruptionRisks,
  NewsReporting,
  BenefitsCalculator,
  Operations,
  LandingPage,
  UsefulResources,
  StatusCheck,
  ComplianceOfficers,
  Violations,
  Announcements,
  CourseItem,
  OperationsItem,
  CorruptionRisksItem,
  NewsItem,
  BenefitsItem,
  BenefitsItem2,
  BenefitsItem3,
  Register,
  Login,
  ForgotPassword,
  TrainingCourses,
  ElectronicLibrary,
  Handouts,
  AnnouncementsItem,
  Profile,
} from "../pages";
import { allowedLanguages, defaultLanguage } from '../utils/constants';

// URL dan tilni tekshirish uchun funksiya


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/${defaultLanguage}`} replace />
  },
  {
    path: "/*",
    element: <Navigate to={`/${defaultLanguage}`} replace />
  },
  {
    path: "/:lang",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LandingPage />
      },
      {
        path: "educational-materials",
        element: <EducationalMaterials />
      },
      {
        path: "training-courses",
        element: <TrainingCourses />
      },
      {
        path: "electronic-library",
        element: <ElectronicLibrary />
      },
      {
        path: "educational-materials/:courseId",
        element: <CourseItem />
      },
      {
        path: "operations/:operationId",
        element: <OperationsItem />
      },
      {
        path: "corruption-risks",
        element: <CorruptionRisks />
      },
      {
        path: "corruption-risks/:taskId",
        element: <CorruptionRisksItem />
      },
      {
        path: "xabar-berish",
        element: <NewsReporting />
      },
      {
        path: "news/:newsId",
        element: <NewsItem />
      },
      {
        path: "benefits",
        element: <BenefitsCalculator />
      },
      {
        path: "benefits/shablon1",
        element: <BenefitsItem />
      },
      {
        path: "benefits/shablon2",
        element: <BenefitsItem2 />
      },
      {
        path: "benefits/shablon3",
        element: <BenefitsItem3 />
      },
      {
        path: "operations",
        element: <Operations />
      },
      {
        path: "resources",
        element: <UsefulResources />
      },
      {
        path: "status",
        element: <StatusCheck />
      },
      {
        path: "compliance",
        element: <ComplianceOfficers />
      },
      {
        path: "violations",
        element: <Violations />
      },
      {
        path: "announcements",
        element: <Announcements />
      },
      {
        path: "announcements/:announcementId",
        element: <AnnouncementsItem />
      },
      {
        path: "handouts",
        element: <Handouts />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  },
  {
    path: "/:lang",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },

    ]
  }
]);






