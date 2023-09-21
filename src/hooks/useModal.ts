import { useEffect, useState } from "react";
import { history } from "..";

export const useModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      window.history.pushState(null, "", window.location.href);
      // window.addEventListener("popstate", preventGoBack);
    }
  }, [open]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    history.back();
    setOpen(false);
  };

  const closeModalByUI = () => {
    setOpen(false);
  };

  return {
    open,
    openModal,
    closeModal,
    closeModalByUI,
  };
};
