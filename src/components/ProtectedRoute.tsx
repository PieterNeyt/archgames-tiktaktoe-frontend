import { Navigate } from "react-router-dom";

import { useSession } from "@/context/SessionContext";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { sessionId } = useSession();

  if (!sessionId) {
    // No session = no access
    return <Navigate replace to="/403" />;
  }

  return children;
}
