import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    if (!title || title === "Digiflix") {
      document.title = "Digiflix";
    } else {
      document.title = `${title} - Digiflix`;
    }
  }, [title]);
};
