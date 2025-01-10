// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
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
  OperationsItem
} from "../pages";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/educational-materials",
        element: <EducationalMaterials />
      },
      {
        path: "/educational-materials/:courseId",
        element: <CourseItem />
      },
      {
        path: "/operations/:operationId",
        element: <OperationsItem />
      },
      {
        path: "corruption-risks",
        element: <CorruptionRisks />
      },
      {
        path: "news",
        element: <NewsReporting />
      },
      {
        path: "benefits",
        element: <BenefitsCalculator />
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
      }
    ]
  }
]);






