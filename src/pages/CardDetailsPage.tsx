import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import { CardDetails } from "../components/CardDetails/CardDetails";
import { Preloader } from "../components/Preloader/Preloader";

export const CardDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const id = Number(productId);
  const { items, isLoading } = useAppSelector((state) => state.product);
  const productFil = items.find((item) => item.id === id);

  if (!productFil && !isLoading) return <Navigate replace to="/" />;
  if (!productFil) return <Preloader />;
  

  return <CardDetails {...productFil} />;
};
