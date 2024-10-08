import { wishlistAtom } from "apps/front-office/design-system/atoms/wishlist-atom";
import { Button } from "apps/front-office/design-system/components/ui/button";
import { useWishlist } from "apps/front-office/design-system/hooks/useWishlist";
import parseError from "apps/front-office/utils/parse-error";
import { FaRegHeart } from "react-icons/fa";
import WishlistSidebar from "./wishlist-sidebar";

const WishlistSidebarContainer = ({ navbar }: { navbar?: boolean }) => {
  const { data, isLoading, error } = useWishlist();

  if (isLoading) {
    return (
      <Button variant={"ghost"} className="hover:bg-transparent">
        <div className="relative">
          <FaRegHeart className="h-8 w-8 text-slate-700" />
        </div>
      </Button>
    );
  }

  if (error) {
    return <div className="text-red-500">Error {parseError(error)}</div>;
  }

  if (data) {
    wishlistAtom.update(data);
    return <WishlistSidebar navbar={navbar} />;
  }
};

export default WishlistSidebarContainer;
