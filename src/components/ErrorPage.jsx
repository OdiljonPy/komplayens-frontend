import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-600 mb-6">
          {error.statusText || error.message}
        </p>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;