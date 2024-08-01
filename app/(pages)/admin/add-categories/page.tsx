"use client";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Listbox,
  ListboxItem,
  Selection,
  Skeleton,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SlPicture } from "react-icons/sl";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import BASE_URL from "@/app/config/baseurl";
import { toast } from "react-toastify";
interface Category {
  name: string;
  image: string;
}

export default function AddCategories() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState("");
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //secure page
  const sesssion = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin/auth/login");
    },
  });
  const session: any = useSession();
  const token = session?.data?.token;
  const API = BASE_URL + "/api/v1";

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      setSelectedImage(imageFile);
      // Create a preview URL for the selected image
      const imageURL = URL.createObjectURL(imageFile);
      setImagePreview(imageURL);
    }
  };

  const getAllCategory = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/category/all-categories`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });

      const resData = await res.json();
      setLoading(false);
      setAllCategories(resData.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const addCategory = async () => {
    const data = new FormData();
    data.append("image", selectedImage as unknown as Blob);
    data.append("name", categoryName);

    try {
      const res = await fetch(`${API}/category/add-category`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      // setItems(productData)
      onClose();
      setSelectedImage("");
      setCategoryName("");
      getAllCategory();
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getAllCategory();
    }
  }, [token]);

  // Filter categories based on filterValue
  const filteredCategories = allCategories?.filter((category) =>
    category.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <div className="flex w-full justify-between items-center gap-4">
        <Input
          placeholder="Search category"
          endContent={<CiSearch size={28} color="#8B909A" />}
          size="md"
          radius="sm"
          aria-label="search"
          className="max-w-[300px] w-full shadow-none"
          classNames={{
            label: "text-lg",
            input: "py-2 text-base",
            inputWrapper: [
              "bg-white",
              "data-focus-[within=true]:bg-white",
              "data-[hover=true]:bg-white",
              "group-data-[focus=true]:bg-white",
            ],
          }}
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
          }}
        ></Input>
        <Button
          startContent={<IoMdAddCircleOutline size={20} color="white" />}
          radius="sm"
          onPress={() => {
            onOpen();
          }}
          className="text-white bg-[#1EB564]"
        >
          Add new category
        </Button>
      </div>
      <div className="py-8">
        <Modal
          size={"lg"}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSelectedImage("");
            setImagePreview("");
          }}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg">
                  Category name
                </ModalHeader>
                <ModalBody>
                  <Input
                    placeholder="Category name"
                    endContent={<CiSearch size={28} color="#8B909A" />}
                    size="md"
                    radius="md"
                    aria-label="search"
                    className=" w-full border-1 rounded-md"
                    classNames={{
                      label: "text-lg",
                      input: "py-2 text-base",
                      inputWrapper: [
                        "bg-white",
                        "data-focus-[within=true]:bg-white",
                        "data-[hover=true]:bg-white",
                        "group-data-[focus=true]:bg-white",
                      ],
                    }}
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                  ></Input>
                  <p className="text-lg py-2">Upload a picture</p>
                  {selectedImage ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="object-contain max-w-[300px] max-h-[300px] w-full h-full rounded-md mx-auto"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="flex justify-center items-center flex-col gap-4  p-4 py-5 bordered-input">
                      <div className="w-full h-full">
                        <form
                        >
                          <input
                            type="file"
                            name="file input drag"
                            className="opacity-0  absolute w-full h-[50%] top-[35%] left-0 "
                            accept="image/*"
                            onChange={handleImageChange}
                          ></input>
                          <label
                            className="cursor-pointer flex justify-center items-center flex-col"
                            htmlFor="file input drag"
                          >
                            <SlPicture size={48} color="#1EB564" />
                            <div className="w-full h-full">
                              <div className="flex justify-center gap-1">
                                <p>Drop your Images here or </p>
                                <p>
                                  <input
                                    type="file"
                                    name="file input"
                                    className="opacity-0 absolute w-[50px]"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                  ></input>
                                  <label
                                    className="cursor-pointer text-[#1EB564]"
                                    htmlFor="file input"
                                  >
                                    Browse
                                  </label>
                                </p>
                              </div>
                              <p className="text-center">
                                Jpeg,png,jpj are allowed
                              </p>
                            </div>
                          </label>
                        </form>
                      </div>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter className="flex justify-center">
                  <Button
                    className="bg-[#1EB564] text-white text-sm w-[150px]"
                    onClick={() => {
                      toast.promise(addCategory(), {
                        pending: "Adding product information ",
                        success: "Product information editted",
                        error: "An error occured , please try again",
                      });
                    }}
                  >
                    CONFIRM
                  </Button>
                  <Button
                    className="bg-transparent text-[#8B909A] text-sm w-[150px] border-1"
                    onPress={() => {
                      setSelectedImage("");
                      setImagePreview("");
                    }}
                  >
                    CANCEL
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="w-full">
        {!loading ? (
          <Listbox
            aria-label="Actions"
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={(value: any) => {
              setSelectedKeys(value);
              setCategoryName(selectedValue);
            }}
            className=" flex gap-3 flex-wrap w-full"
            classNames={{
              list: "gap-3 flex flex-wrap flex-row w-full",
              base: "gap-3 flex-wrap w-full",
            }}
          >
            {filteredCategories &&
              filteredCategories.map((category: Category) => (
                <ListboxItem
                  className="border-1 max-w-[300px] w-full"
                  startContent={
                    <Image
                      src={category.image}
                      alt="category image"
                      width={1000}
                      height={1000}
                      className="w-[35px] h-[35px]"
                    />
                  }
                  key={category.name}
                >
                  {category.name}
                </ListboxItem>
              ))}
          </Listbox>
        ) : (
          <div className="flex flex-wrap gap-3 w-full">
            <Skeleton className="max-w-[300px] flex flex-col h-[55px] w-full"></Skeleton>
            <Skeleton className="max-w-[300px] flex flex-col h-[55px] w-full"></Skeleton>
            <Skeleton className="max-w-[300px] flex flex-col h-[55px] w-full"></Skeleton>
            <Skeleton className="max-w-[300px] flex flex-col h-[55px] w-full"></Skeleton>
          </div>
        )}
      </div>
    </div>
  );
}
AddCategories.requireAuth = true;
