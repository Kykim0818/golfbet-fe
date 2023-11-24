import { useAppSelector } from "../../hooks/redux";
import { Loading } from "../Loading/Loading";

export const LoadingContainer = () => {
  const loadingStatus = useAppSelector((state) => state.loading.status);
  return loadingStatus ? <Loading /> : null;
};
