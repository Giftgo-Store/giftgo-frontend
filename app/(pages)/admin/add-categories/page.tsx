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
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SlPicture } from "react-icons/sl";
import Image from "next/image";
export default function AddCategories() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState("");
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      setSelectedImage(imageFile);
      // Create a preview URL for the selected image
      const imageURL = URL.createObjectURL(imageFile);
      setImagePreview(imageURL);
    }
  };
  return (
    <div>
      <div className="flex w-full justify-between items-center gap-4">
        <Input
          placeholder="Search category"
          endContent={<CiSearch size={28} color="#8B909A" />}
          size="md"
          radius="sm"
          aria-label="search"
          className="max-w-[300px] w-full shadow-sm"
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
          Add new product
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
                    value={
                      selectedValue.length < 0 ? categoryName : selectedValue
                    }
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                  ></Input>
                  <p className="text-lg py-2">Upload a picture</p>
                  <div className="flex justify-center items-center flex-col gap-4  p-4 py-5 bordered-input">
                    {selectedImage ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        className="object-contain max-w-[300px] w-full h-full rounded-md"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="w-full h-full">
                        <form
                          onSubmit={(event) => {
                            alert("ok");
                          }}
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
                    )}
                  </div>
                </ModalBody>
                <ModalFooter className="flex justify-center">
                  <Button className="bg-[#1EB564] text-white text-sm w-[150px]">
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
      <div>
        <Listbox
          aria-label="Actions"
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          className="max-w-[300px] flex flex-col gap-4"
          classNames={{
            list: "gap-3 flex",
          }}
        >
          <ListboxItem
            className="border-1"
            startContent={
              <Image
                src={"/category-img.png"}
                alt="category image"
                width={1000}
                height={1000}
                className="w-[35px] h-[35px]"
              />
            }
            key="shoes"
          >
            Shoes
          </ListboxItem>
          <ListboxItem
            className="border-1"
            startContent={
              <Image
                src={"/category-img.png"}
                alt="category image"
                width={1000}
                height={1000}
                className="w-[35px] h-[35px]"
              />
            }
            key="dresses"
          >
            Dresses
          </ListboxItem>
          <ListboxItem
            className="border-1"
            startContent={
              <Image
                src={"/category-img.png"}
                alt="category image"
                width={1000}
                height={1000}
                className="w-[35px] h-[35px]"
              />
            }
            key="bags"
          >
            Bags
          </ListboxItem>
          <ListboxItem
            className="border-1"
            startContent={
              <Image
                src={"/category-img.png"}
                alt="category image"
                width={1000}
                height={1000}
                className="w-[35px] h-[35px]"
              />
            }
            key="toys"
          >
            Toys
          </ListboxItem>
        </Listbox>
      </div>
    </div>
  );
}
