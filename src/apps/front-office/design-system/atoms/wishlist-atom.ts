import cache from "@mongez/cache";
import { atom } from "@mongez/react-atom";
import { deleteItem } from "../services/wishlist-services";
import { Wishlist } from "../utils/types";

export const wishlistAtom = atom<Wishlist>({
  key: "wishlist",
  default: cache.get("wishlist", {}),
  beforeUpdate(wishlist) {
    cache.set("wishlist", wishlist);
    return wishlist;
  },
  actions: {
    refresh() {
      wishlistAtom.update(wishlistAtom.value);
    },

    deleteItem(itemId: number) {
      const wishlist = wishlistAtom.value;
      wishlist.totalWishlist -= 1;
      wishlist.products = wishlist.products.filter(item => item.id !== itemId);
      cache.set("wishlist", wishlist);
      deleteItem(itemId);
      return wishlistAtom.update(wishlist);
    },
  },
});
