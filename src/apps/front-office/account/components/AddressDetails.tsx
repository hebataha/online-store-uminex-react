import { zodResolver } from "@hookform/resolvers/zod";
import { trans } from "@mongez/localization";
import { Button } from "apps/front-office/design-system/components/ui/button";
import { Form } from "apps/front-office/design-system/components/ui/form";
import {
  deleteAddress,
  setPrimaryAddress,
  updateAddress,
} from "apps/front-office/design-system/services/address.services";
import { Address } from "apps/front-office/design-system/utils/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { AddressFormSchema } from "shared/schemas/AddressFormSchema";
import { z } from "zod";
import AddressFormInputs from "./AddressFormInputs";

interface AddressDetailsProps {
  address: Address;
}
const AddressDetails = ({ address }: AddressDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      name: address.name,
      email: address.email,
      phoneNumber: address.phoneNumber,
      address: address.address,
      default: address.isPrimary,
    },
  });

  const onSubmit = async (data: z.infer<typeof AddressFormSchema>) => {
    try {
      const { default: isPrimary, ...addressData } = data;
      await updateAddress(address.id, addressData);
      if (isPrimary) {
        await setPrimaryAddress(address.id);
      }
    } catch (error) {
      console.error(error);
    }
    form.reset();
    setIsEditing(false);
    window.location.reload();
  };

  const onDelete = async () => {
    try {
      await deleteAddress(address.id);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <div className="flex flex-col w-full gap-3">
      {!isEditing && (
        <>
          {address.isPrimary && (
            <h1 className="text-3xl font-semibold text-center">
              {trans("Default")}
            </h1>
          )}
          <h1 className="text-slate-700 text-md">{address.name}</h1>
          <h1 className="text-slate-700 text-md">{address.email}</h1>
          <h1 className="text-slate-700 text-md">{address.phoneNumber}</h1>
          <h1 className="text-slate-700 text-md">{address.address}</h1>
          <div className="flex items-center gap-5">
            <Button
              onClick={() => setIsEditing(true)}
              variant={"primary"}
              className="h-12 flex items-center gap-2">
              <FaRegEdit className="h-5 w-5" />
              {trans("Edit")}
            </Button>
            <Button
              onClick={onDelete}
              variant={"primary"}
              className="h-12 flex items-center gap-2">
              <FaRegTrashAlt className="h-5 w-5" />
              {trans("Delete")}
            </Button>
          </div>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AddressFormInputs form={form} isLoading={isLoading} />
            <Button
              disabled={isLoading}
              variant={"primary"}
              className="w-full rounded-full h-14 text-md">
              {trans("Edit")}
            </Button>
            <Button
              disabled={isLoading}
              type="button"
              variant={"secondary"}
              className="w-full rounded-full h-14 text-md"
              onClick={() => setIsEditing(false)}>
              {trans("Cancel")}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AddressDetails;
