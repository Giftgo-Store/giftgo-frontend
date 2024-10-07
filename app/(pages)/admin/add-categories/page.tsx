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
  CheckboxGroup,
  Checkbox,
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
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { json } from "stream/consumers";
interface Category {
  _id: string;
  name: string;
  image: string;
  locations: string[];
}
interface location {
  _id: string;
  location: string;
  image: string;
}
export default function AddCategories() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState("");
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>([]);
  const [locations, setLocations] = useState([]);
  const [locationsToEdit, setLocationsToEdit] = useState<any>([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState("");
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
  console.log(selectedLocation);
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
    data.append("locations", JSON.stringify(selectedLocation));
    // selectedLocation.forEach((location: any) => {
    //   data.append(`locations`, JSON.stringify(location));
    // });
    try {
      const res = await fetch(`${API}/category/add-category`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      if (resData.message) {
        toast(resData.message);
      }
      // setItems(productData)
      if (res.ok) {
        onClose();
        setSelectedImage("");
        setCategoryName("");
        getAllCategory();
        setSelectedLocation([]);
      } else {
        toast.error("An error has occured, please try again");
      }
    } catch (error) {
      //console.log(error);
      toast.error("An error has occured, please try again");
    }
  };

  const deleteCategory = async (_id: string) => {
    try {
      const res = await fetch(`${API}/category/${_id}`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "DELETE",
      });
      if (res.ok) {
        setAllCategories((prevCategories) =>
          prevCategories.filter((Category) => Category._id !== _id)
        );
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const EditCategory = async (_id: string) => {
    const data = new FormData();
    data.append("image", selectedImage as unknown as Blob);
    data.append("name", categoryName);
    data.append("locations", JSON.stringify(selectedLocation));
    try {
      const res = await fetch(`${API}/category/update-category/${_id}`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "PUT",
        body: data,
      });
      const resData = await res.json();
      if (res.ok) {
        getAllCategory();
        toast.success("category successfully edited");
        setSelectedImage("");
        setImagePreview("");
        setSelectedLocation([]);
        setCategoryName("");
        setEdit(false);
        onClose();
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getAllLocations = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/location/`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });

      const resData = await res.json();
      setLoading(false);
      setLocations(resData.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getAllCategory();
      getAllLocations();
    }
  }, [token]);

  // Filter categories based on filterValue
  const filteredCategories = allCategories?.filter((category) =>
    category.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  //set values for location
  function handleSelectionChange(selectedlocations?: string[]) {
    setSelectedLocation(selectedlocations);
  }

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
            setSelectedLocation([]);
            setCategoryName("");
            setEdit(false);
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
                  <p className="text-lg py-2">Select locations</p>
                  <div className="flex flex-col gap-3 relative z-20">
                    <CheckboxGroup
                      orientation="horizontal"
                      aria-label="Select locations"
                      color="success"
                      value={selectedLocation}
                      onValueChange={handleSelectionChange}
                    >
                      {locations.map((location: location) => (
                        <Checkbox value={location.location} key={location._id}>
                          {location.location}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </div>

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
                        <form>
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
                  {edit && (
                    <Button
                      className="max-w-[200px] w-full mx-auto relative text-white"
                      color="success"
                    >
                      <input
                        type="file"
                        name="file input"
                        className="opacity-0 absolute w-full cursor-pointer"
                        accept="image/*"
                        onChange={handleImageChange}
                      ></input>
                      Change Image
                    </Button>
                  )}
                </ModalBody>
                <ModalFooter className="flex justify-center">
                  <Button
                    className="bg-[#1EB564] text-white text-sm w-[150px]"
                    onClick={() => {
                      if (edit) {
                        toast.promise(EditCategory(categoryIdToEdit), {
                          pending: "Editing category information ",
                          error: "An error has occured, please try again",
                        });
                      } else {
                        toast.promise(addCategory(), {
                          pending: "Adding category information ",
                        });
                      }
                    }}
                  >
                    {edit ? "Edit" : "CONFIRM"}
                  </Button>
                  <Button
                    className="bg-transparent text-[#8B909A] text-sm w-[150px] border-1"
                    onPress={() => {
                      setSelectedImage("");
                      setImagePreview("");
                      setCategoryName("");
                      onClose();
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
                  endContent={
                    <div>
                      <Button
                        isIconOnly
                        className="bg-transparent z-50"
                        onClick={() => {
                          onOpen();
                          setEdit(true);
                          setCategoryName(category.name);
                          setSelectedImage(category.image);
                          setImagePreview(category.image);
                          setCategoryIdToEdit(category._id);
                          if (category.locations) {
                            // Set selectedLocation to the IDs from the category being edited
                            const selectedLocationIds = category.locations; // Assuming `category.locations` contains an array of location IDs

                            // convert those selected IDs to location names for the checkboxes
                            const locationNamesToEdit = locations
                              .filter((location: location) =>
                                selectedLocationIds.includes(location._id)
                              ) // Match IDs
                              .map((location: location) => location.location); // Get names

                            setSelectedLocation(locationNamesToEdit); // Set the names for display
                          }
                        }}
                      >
                        <FiEdit size={20} />
                      </Button>
                      <Button
                        isIconOnly
                        className="bg-transparent z-50"
                        onClick={() => {
                          toast.promise(deleteCategory(category._id), {
                            pending: "deleting category",
                            success: "category deleted",
                            error: "An error occured , please try again",
                          });
                        }}
                      >
                        <HiOutlineTrash size={20} />
                      </Button>
                    </div>
                  }
                  key={category._id}
                >
                 <p className="max-w-[180px] truncate">{category.name}</p> 
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
