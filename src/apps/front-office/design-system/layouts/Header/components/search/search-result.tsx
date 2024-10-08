import { trans } from "@mongez/localization";
import { navigateTo } from "@mongez/react-router";
import { Button } from "apps/front-office/design-system/components/ui/button";
import { ScrollArea } from "apps/front-office/design-system/components/ui/scroll-area";
import { useDebouncedSearch } from "apps/front-office/design-system/hooks/useDebouncedSearch";
import { formatPrice } from "apps/front-office/design-system/lib/formats";
import { Product } from "apps/front-office/design-system/utils/types";
import { isLTR } from "apps/front-office/utils/helpers";
import URLS from "apps/front-office/utils/urls";
import { FiX } from "react-icons/fi";
import SkeletonSearchCard from "../SkeletonLoading/skeleton-search-card";

type SearchResultProps = {
  value?: string;
  category?: number | null;
  OnClose?: () => void;
};

const SearchResult = ({ value, category, OnClose }: SearchResultProps) => {
  const { data, isLoading, params } = useDebouncedSearch({ value, category });

  const viewProduct = (id: number) => {
    navigateTo(URLS.products.view(id));
  };

  const searchProducts = () => {
    navigateTo(URLS.search.search("product", params));
  };

  return (
    <ScrollArea className="w-full h-[380px] bg-white">
      <div className="flex flex-col items-start gap-5 py-5 px-7 relative">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonSearchCard key={index} />
          ))
        ) : data && data.paginationInfo.total > 0 ? (
          <>
            {data.products.slice(0, 5).map((product: Product) => (
              <div
                className="flex items-center gap-4 w-full border-b border-dashed border-slate-300 pb-3"
                key={product.id}
                onClick={() => viewProduct(product.id)}>
                <div className="min-w-16 h-16 cursor-pointer">
                  <img
                    src={product.images[0].url}
                    alt={trans(
                      product.name.find(n => n.localeCode === "en")?.value ||
                        product.name[0].value,
                    )}
                    className="w-full h-full truncate"
                  />
                </div>
                <div className="flex items-start flex-col gap-1">
                  <h1 className="text-[15px] font-semibold hover:text-blue cursor-pointer">
                    {isLTR()
                      ? product.name.find(n => n.localeCode === "en")?.value
                      : product.name.find(n => n.localeCode === "ar")?.value}
                  </h1>
                  <div className="flex items-center gap-1 text-sm">
                    {!product.salePrice ||
                    product.salePrice === product.price ? (
                      <span className="text-blue font-semibold">
                        {formatPrice(product.price)}
                      </span>
                    ) : (
                      <>
                        <span className="text-red font-semibold">
                          {formatPrice(product.salePrice)}
                        </span>
                        <span className="line-through text-slate-500">
                          {formatPrice(product.price)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {data.paginationInfo.total > 5 && (
              <Button
                asChild
                variant={"secondary"}
                onClick={searchProducts}
                className="w-full h-12 hover:bg-black hover:text-white transition cursor-pointer">
                <p className="p-0 m-0 text-sm font-semibold">
                  {trans("viewAllBtn")} ({data.paginationInfo.total - 5})
                </p>
              </Button>
            )}
          </>
        ) : (
          <div className="text-base text-slate-600 flex items-center justify-center italic w-full">
            {trans("notFoundProducts")}
          </div>
        )}

        <FiX
          className="w-5 h-5 absolute top-2 right-2 cursor-pointer"
          onClick={OnClose}
        />
      </div>
    </ScrollArea>
  );
};

export default SearchResult;
