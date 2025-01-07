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
  UsefulResources,
  StatusCheck,
  ComplianceOfficers,
  Violations,
  Announcements
} from "../pages";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EducationalMaterials />
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






