import { cartAtom } from "apps/front-office/design-system/atoms/cart-atom";
import { useState } from "react";

export const useDeleteCartItem = (
  cartItemId: number,
  onItemDeleted: () => void,
) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteItem = async () => {
    setIsDeleting(true);
    await cartAtom.deleteItem(cartItemId);
    onItemDeleted();
    setIsDeleting(false);
  };

  return {
    isDeleting,
    deleteItem,
  };
};
