import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import type { IProduct } from "../slices/productSlice";
import { Card } from "../components/Card/Card";
import { Preloader } from "../components/Preloader/Preloader";
import { Pagination } from "../components/Pagination/Pagination";
import { Search } from "../components/Search/Search";
import { FavoriteFilter } from "../components/FavoriteFilter/FavoriteFilter";
import { SortFilter } from "../components/SortFilter/SortFilter";

export const ProductPage = () => {
  const { items, isLoading } = useAppSelector((state) => state.product);
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortItem, setSortItem] = useState("default");
  const [searchParams, setSearchParams] = useSearchParams();

  const limit_perpage = 10;
  const currentPage = parseInt(searchParams.get("page") || "1");

  const favoriteProduct = useMemo(() => items.filter((item) => item.like === true), [items]);

  const baseProducts = useMemo(() => (isFavorite ? favoriteProduct : items), [isFavorite, favoriteProduct, items]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return baseProducts;

    const term = searchTerm.toLowerCase();
    return baseProducts.filter(
      (item) => item.title.toLowerCase().includes(term) || item.summary.toLowerCase().includes(term)
    );
  }, [baseProducts, searchTerm]);

  const sortProduct = useMemo(() => {
    if (!filteredProducts) return baseProducts;
    switch (sortItem) {
      case "asc":
        return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
      case "desc":
        return [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return filteredProducts;
    }
  }, [filteredProducts, sortItem, baseProducts]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * limit_perpage;
    const endIndex = startIndex + limit_perpage;
    return sortProduct.slice(startIndex, endIndex);
  }, [currentPage, limit_perpage, sortProduct]);

  const totalPages = Math.ceil(filteredProducts.length / limit_perpage);

  useEffect(() => {
    if (isFavorite && currentPage !== 1) {
      setSearchParams([["page", "1"]]);
    }
  }, [isFavorite]);

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams([["page", page.toString()]]);
    },
    [setSearchParams]
  );

  const handleSearchChange = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (currentPage !== 1) {
        setSearchParams([["page", "1"]]);
      }
    },
    [currentPage, setSearchParams]
  );

  const handleFilterChange = useCallback((favorite: boolean) => {
    setIsFavorite(favorite);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (!items || items.length === 0) {
    return <div className="text-center py-8">Товары не найдены</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 space-y-4">
        <Search searchTerm={handleSearchChange} />
        <div className="flex justify-between md:flex-row flex-col items-center">
          <FavoriteFilter
            isFavorite={isFavorite}
            onFilterChange={handleFilterChange}
            favoriteCount={favoriteProduct.length}
          />
          <SortFilter setSortItem={setSortItem} />
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Показано {paginatedProducts.length} из {filteredProducts.length} товаров
        {searchTerm && ` по запросу "${searchTerm}"`}
        {isFavorite && " (только избранные)"}
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? "По вашему запросу ничего не найдено" : "Нет товаров для отображения"}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-6">
            {paginatedProducts.map((item: IProduct) => (
              <Card key={item.id} {...item} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </div>
  );
};
