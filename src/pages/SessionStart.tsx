import { Spinner } from "@heroui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useStartGameFromSession } from "@/hooks/useGames";
import { useSession } from "@/context/SessionContext.tsx";

export default function SessionStart() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { setSessionId } = useSession();

  const startGame = useStartGameFromSession();

  useEffect(() => {
    if (!sessionId) return;

    startGame.mutate(
      { sessionId },
      {
        onSuccess: () => {
          setSessionId(sessionId);

          navigate(`/home`);
        },
        // onError: () => {
        //   alert("Invalid or expired session");
        //   navigate("/");
        // },
      },
    );
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}
