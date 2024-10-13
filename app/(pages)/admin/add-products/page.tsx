"use client";
import { ImageUploadCard } from "@/app/components/cards/imageUploadCard";
import {
  Avatar,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
  cn,
  Image,
  Spinner,
  Skeleton,
  Spacer,
  Button,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useReducer,
  useState,
  useMemo,
} from "react";
import { SlPicture } from "react-icons/sl";
import BASE_URL from "@/app/config/baseurl";
import { toast } from "react-toastify";
interface Form {
  USD: string;
  GBP: string;
  EUR: string;
  CAD: string;
  AUD: string;
  JPY: string;
  NGN: string;
}
type Currency = keyof Form;
interface Flag {
  currency: Currency;
  placeholder: string;
  flag: string;
}

interface location {
  _id: string;
  location: string;
  image: string;
}

type ActionType = {
  type: string;
  payload: any;
};
type ConversionRates = {
  [key: string]: number;
};

function useDebounceValue(value: string, time = 250) {
  const [debouncevalue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
    // Check if value is empty and debounceValue is different
  }, [value, time]);
  useEffect(() => {
    if (value === "" && debouncevalue !== "") {
      setDebounceValue("");
    }
  }, [value, debouncevalue]);
  return debouncevalue;
}

export default function AddProducts() {
  const [loadingCurrency, setLoadingCurrency] = useState(false);
  const [conversionRates, setConversionRates] = useState<ConversionRates>({});
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productDescription, setProductDescription] = useState("");
  const [regularPrice, setRegularPrice] = useState<number | any>();
  const [brandName, setBrandName] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stockQuantity, setstockQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [sku, setSku] = useState("");
  const [expressShipping, setExpressShipping] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);
  const [allLocations, setAllLocations] = useState<location[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryloading, setCategoryLoading] = useState(true);
  const [isCouponActive, setIsCouponActive] = useState(false);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [form, setForm] = useState<Form>({
    USD: "",
    GBP: "",
    EUR: "",
    CAD: "",
    AUD: "",
    JPY: "",
    NGN: "",
  });
  const searchParams = useSearchParams();
  const edit = searchParams?.get("edit");

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
  const flags: Flag[] = [
    {
      currency: "NGN",
      placeholder: "₦0.00",
      flag: "https://flagcdn.com/w40/ng.png",
    },
    {
      currency: "USD",
      placeholder: "$0.00",
      flag: "https://flagcdn.com/w40/us.png",
    },
    {
      currency: "GBP",
      placeholder: "£0.00",
      flag: "https://flagcdn.com/w40/gb.png",
    },
    {
      currency: "EUR",
      placeholder: "€0.00",
      flag: "https://preview.free3d.com/img/2019/10/2269298774754985482/m9xpbzm5-900.jpg",
    },
    {
      currency: "CAD",
      placeholder: "$0.00",
      flag: "https://flagcdn.com/w40/ca.png",
    },
    {
      currency: "AUD",
      placeholder: "$0.00",
      flag: "https://flagcdn.com/w40/au.png",
    },
    {
      currency: "JPY",
      placeholder: "¥0.00",
      flag: "https://flagcdn.com/w40/jp.png",
    },
  ];

  const getConversionRates = async () => {
    try {
      const res = await fetch(
        "https://v6.exchangerate-api.com/v6/e336218813dfda054382e646/latest/NGN"
      );
      const resData = await res.json();
      setConversionRates(resData.conversion_rates);
    } catch (error) {}
  };
  useEffect(() => {
    getConversionRates();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    currency: Currency
  ) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [currency]: value,
    }));
    if (currency === "NGN") {
      setForm((prevForm) => ({
        ...prevForm,
        [currency]: value,
      }));
      setForm((prevForm) => ({
        ...prevForm,
        USD: (Number(value) * Number(conversionRates.USD))
          .toFixed(4)
          .toString(),
      }));
      setForm((prevForm) => ({
        ...prevForm,
        GBP: (Number(value) * Number(conversionRates.GBP))
          .toFixed(4)
          .toString(),
      }));
      setForm((prevForm) => ({
        ...prevForm,
        AUD: (Number(value) * Number(conversionRates.AUD))
          .toFixed(4)
          .toString(),
      }));
      setForm((prevForm) => ({
        ...prevForm,
        JPY: (Number(value) * Number(conversionRates.JPY))
          .toFixed(4)
          .toString(),
      }));
      setForm((prevForm) => ({
        ...prevForm,
        CAD: (Number(value) * Number(conversionRates.CAD))
          .toFixed(4)
          .toString(),
      }));
      setForm((prevForm) => ({
        ...prevForm,
        EUR: (Number(value) * Number(conversionRates.EUR))
          .toFixed(4)
          .toString(),
      }));
    }
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFiles = event.target.files;
    if (imageFiles) {
      const newSelectedImages: any[] = [];
      const newImagePreviews: string[] = [];
      const newImageNames: string[] = [];

      // Iterate through the selected image files
      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];
        newSelectedImages.push(imageFile);
        // Create a preview URL for the selected image
        const imageURL = URL.createObjectURL(imageFile);
        newImagePreviews.push(imageURL);
        newImageNames.push(imageFile.name);
      }

      // Update state with new selected images and image previews
      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        ...newSelectedImages,
      ]);
      setImagePreviews((prevImagePreviews) => [
        ...prevImagePreviews,
        ...newImagePreviews,
      ]);
      setImageNames((prevImageNames) => [...prevImageNames, ...newImageNames]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((_, i) => i !== index)
    );
    setImagePreviews((prevImagePreviews) =>
      prevImagePreviews.filter((_, i) => i !== index)
    );
  };
  const ImageUploadCards = useMemo(() => {
    return imagePreviews.map((imagePreview, index) => (
      <ImageUploadCard
        key={index}
        name={imageNames[index]}
        avatar={imagePreview}
        removeCard={() => {
          removeImage(index);
          setImagesToRemove((prev) => [...prev, imagePreview]);
        }}
      />
    ));
  }, [imagePreviews, imageNames]);

  const resetForm = () => {
    setLoading(false);
    setProductName("");
    setProductCategory("");
    setProductDescription("");
    setRegularPrice("");
    setBrandName("");
    setSalePrice("");
    setstockQuantity("");
    setSku("");
    setExpressShipping(false);
    setIsCouponActive(false);
    setSelectedImages([]);
    setImagePreviews([]);
    setImageNames([]);
    setLocation("");
    setForm({
      USD: "",
      GBP: "",
      EUR: "",
      CAD: "",
      AUD: "",
      JPY: "",
      NGN: "",
    });
  };

  const addProducts = async () => {
    const formdata = new FormData();
    selectedImages.forEach((image) => {
      formdata.append("images", image);
    });
    formdata.append("sku", sku);
    formdata.append("productName", productName);
    formdata.append("description", productDescription);
    formdata.append("category", productCategory);
    formdata.append("regularPrice", regularPrice);
    formdata.append("brandName", brandName);
    formdata.append("salePrice", form.NGN);
    formdata.append("stockQuantity", stockQuantity);
    formdata.append("expressShipping", expressShipping.toString());
    formdata.append("isCouponActive", isCouponActive.toString());
    // formdata.append("location", location.toUpperCase());
    setLoading(true);
    try {
      const res = await fetch(`${API}/products/add-product`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "POST",
        body: formdata,
      });

      const productData = await res.json();

      if (res.ok) {
        resetForm();
        toast.success("Product information added");
      } else {
        toast.error(productData.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error has occured ,please try again");
    }
  };

  const editProducts = async () => {
    const formdata = new FormData();

    selectedImages.forEach((image) => {
      if (typeof image !== "string") {
        formdata.append("images", image);
      }
    });

    imagesToRemove.forEach((image) => {
      formdata.append("imagesToRemove[]", image);
    });

    formdata.append("sku", sku);
    formdata.append("productName", productName);
    formdata.append("description", productDescription);
    formdata.append("regularPrice", regularPrice);
    formdata.append("brandName", brandName);
    formdata.append("salePrice", form.NGN);
    formdata.append("stockQuantity", stockQuantity);
    formdata.append("expressShipping", expressShipping.toString());
    formdata.append("isCouponActive", isCouponActive.toString());

    setLoading(true);
    try {
      const res = await fetch(`${API}/products/${edit}`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
        method: "PUT",
        body: formdata,
      });

      const productData = await res.json();
      if (res.ok) {
        resetForm();
        setLoading(false);
        toast.success("Product information edited");
      }
      setLoading(false);

      console.log(productData);
    } catch (error) {
      setLoading(false);
      toast.error("An error occured , please try again");
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await fetch(`${API}/category/all-categories`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });
      setCategoryLoading(false);
      const resData = await res.json();
      setCategories(resData.data);
    } catch (error) {}
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
      setAllLocations(resData.data);
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

  const fetchProduct = async (id: string) => {
    try {
      const res = await fetch(`${API}/products/${id}`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });
      const productData = await res.json();
      // console.log(productData.data);
      return productData.data;
    } catch (error) {
      toast.error("An error occured , please try again");
    }
  };

  useEffect(() => {
    if (edit && conversionRates && Object.keys(conversionRates).length > 0) {
      const getProduct = async () => {
        const productData = await fetchProduct(edit);
        if (productData) {
          setProductName(productData.productName);
          setProductCategory(productData.category.name);
          setProductDescription(productData.description);
          setRegularPrice(productData.regularPrice);
          setBrandName(productData.brandName);
          setSalePrice(productData.salePrice);
          setstockQuantity(productData.stockQuantity);
          setSku(productData.sku);
          setExpressShipping(productData.expressShipping === "true");
          setIsCouponActive(productData.isCouponActive === "true");
          // setLocation(productData.location.location.toUpperCase());
          // Handle image previews if necessary
          setSelectedImages(productData.images);
          setImagePreviews(productData.images);

          const salePrice = parseFloat(productData.salePrice);

          // Check if salePrice is a valid number
          if (!isNaN(salePrice)) {
            setForm((prevForm) => ({
              ...prevForm,
              NGN: salePrice.toString(),
            }));

            // Ensure conversionRates are valid numbers
            const usdRate = conversionRates.USD;
            const gbpRate = conversionRates.GBP;
            const audRate = conversionRates.AUD;
            const jpyRate = conversionRates.JPY;
            const cadRate = conversionRates.CAD;
            const eurRate = conversionRates.EUR;

            if (!isNaN(usdRate)) {
              setForm((prevForm) => ({
                ...prevForm,
                USD: (salePrice * usdRate).toFixed(2).toString(),
              }));
            }

            if (!isNaN(gbpRate)) {
              setForm((prevForm) => ({
                ...prevForm,
                GBP: (salePrice * gbpRate).toFixed(2).toString(),
              }));
            }

            if (!isNaN(audRate)) {
              setForm((prevForm) => ({
                ...prevForm,
                AUD: (salePrice * audRate).toFixed(2).toString(),
              }));
            }

            if (!isNaN(jpyRate)) {
              setForm((prevForm) => ({
                ...prevForm,
                JPY: (salePrice * jpyRate).toFixed(2).toString(),
              }));
            }

            if (!isNaN(cadRate)) {
              setForm((prevForm) => ({
                ...prevForm,
                CAD: (salePrice * cadRate).toFixed(2).toString(),
              }));
            }

            if (!isNaN(eurRate)) {
              setForm((prevForm) => ({
                ...prevForm,
                EUR: (salePrice * eurRate).toFixed(2).toString(),
              }));
            }
          } else {
            console.error("Invalid sale price:", salePrice);
          }
          const newImageNames: string[] = [];
          for (var i = 0; i < productData.images.length; i++) {
            newImageNames.push(`Photo ${i + 1}`);
          }
          setImageNames((prevImageNames) => [
            ...prevImageNames,
            ...newImageNames,
          ]);
        }
      };
      getProduct();
    }
  }, [edit, conversionRates, token]);

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setProductCategory(e.target.value);
  }
  return (
    <div className="pb-8">
      <form
        className="p-5 bg-white rounded-lg flex flex-col lg:flex-row gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (edit) {
            toast.promise(editProducts(), {
              pending: "Editing product information ",

              error: "An error occured , please try again",
            });
          } else {
            toast.promise(addProducts(), {
              pending: "Adding product information ",

              error: "An error occured , please try again",
            });
          }
        }}
      >
        <div className=" w-full flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p>Product Name</p>
            <Input
              isRequired
              placeholder="Type name here"
              size="md"
              radius="sm"
              aria-label="product name"
              className=" rounded-lg w-full border-1"
              classNames={{
                label: "text-base",
                input: "py-2 text-base",
                inputWrapper: [
                  "bg-white",
                  "data-focus-[within=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                ],
              }}
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <p>Description</p>
            <Textarea
              isRequired
              minRows={8}
              maxRows={12}
              aria-label="description"
              placeholder="Type Description here"
              className=" rounded-lg w-full border-1"
              classNames={{
                label: "text-base",
                input: "py-2 text-base",
                inputWrapper: [
                  "bg-white",
                  "data-focus-[within=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                ],
              }}
              value={productDescription}
              onChange={(e) => {
                setProductDescription(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-2 items-center justify-normal">
            <p className="w-[180px]">Express Shipping</p>
            <Switch
              classNames={{
                base: cn("data-[selected=true]:border-[#DDDDDD]"),
                wrapper: [
                  "p-0 h-4 overflow-visible bg-white",
                  " group-data-[selected=true]:bg-[#DDDDDD] border-1 border-[#DDDDDD]",
                  "bg-[#e6e6e6] mr-0 w-[45px]",
                ],
                thumb: cn(
                  "border-[#DDDDDD]",
                  "w-6 h-6 border-2 shadow-lg",
                  //selected
                  "group-data-[selected=true]:bg-[#1EB564] bg-white border-[#DDDDDD] border-[2px]"
                ),
              }}
              isSelected={expressShipping}
              onValueChange={setExpressShipping}
            ></Switch>
          </div>

          <div>
            <div className="flex gap-2 items-center justify-normal">
              <p className="w-[180px]">Coupon Access</p>
              <Switch
                classNames={{
                  base: cn("data-[selected=true]:border-[#DDDDDD]"),
                  wrapper: [
                    "p-0 h-4 overflow-visible bg-white",
                    " group-data-[selected=true]:bg-[#DDDDDD] border-1 border-[#DDDDDD]",
                    "bg-[#e6e6e6] mr-0 w-[45px]",
                  ],
                  thumb: cn(
                    "border-[#DDDDDD]",
                    "w-6 h-6 border-2 shadow-lg",
                    //selected
                    "group-data-[selected=true]:bg-[#1EB564] bg-white border-[#DDDDDD] border-[2px]"
                  ),
                }}
                isSelected={isCouponActive}
                onValueChange={setIsCouponActive}
              ></Switch>
            </div>
            <p className="text-[#8B909A]">
              A coupon must have been created to give this product access to a
              coupon
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p>Category</p>
            <Select
              size="md"
              radius="sm"
              className="w-full bg-white shadow-none border-1 rounded-lg"
              placeholder="Select category"
              variant="flat"
              aria-label="category"
              isLoading={categoryloading}
              isDisabled={edit ? true : false}
              classNames={{
                trigger: [
                  "bg-white text-black",
                  "data-focus-[within=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                ],
              }}
              onChange={handleCategoryChange}
              selectedKeys={[productCategory]}
            >
              {categories &&
                categories.map((category: { name: string }) => (
                  <SelectItem key={category.name}>{category.name}</SelectItem>
                ))}
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <p>Brand Name</p>
            <Input
              placeholder="Type brand name here"
              size="md"
              radius="sm"
              aria-label="product name"
              className=" rounded-lg w-full border-1"
              classNames={{
                label: "text-base",
                input: "py-2 text-base",
                inputWrapper: [
                  "bg-white",
                  "data-focus-[within=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                ],
              }}
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
            ></Input>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex md:flex-row flex-col w-full justify-between gap-2">
              <div className="flex w-full flex-col gap-3">
                <p>SKU</p>
                <Input
                  placeholder="fox-3983"
                  size="md"
                  radius="sm"
                  aria-label="product name"
                  className=" rounded-lg w-full border-1"
                  classNames={{
                    label: "text-base",
                    input: "py-2 text-base",
                    inputWrapper: [
                      "bg-white",
                      "data-focus-[within=true]:bg-white",
                      "data-[hover=true]:bg-white",
                      "group-data-[focus=true]:bg-white",
                    ],
                  }}
                  value={sku}
                  onChange={(e) => {
                    setSku(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="flex w-full flex-col gap-3">
                <p>Stock Quantity</p>
                <Input
                  isRequired
                  placeholder="1258"
                  size="md"
                  radius="sm"
                  aria-label="product name"
                  type="number"
                  className=" rounded-lg w-full border-1"
                  classNames={{
                    label: "text-base",
                    input: "py-2 text-base",
                    inputWrapper: [
                      "bg-white",
                      "data-focus-[within=true]:bg-white",
                      "data-[hover=true]:bg-white",
                      "group-data-[focus=true]:bg-white",
                    ],
                  }}
                  value={stockQuantity}
                  onChange={(e) => {
                    setstockQuantity(e.target.value);
                  }}
                ></Input>
              </div>
            </div>
            <div className="flex md:flex-row flex-col w-full justify-between gap-2">
              <div className="flex w-full flex-col gap-3">
                <p>Regular Price</p>
                <Input
                  isRequired
                  placeholder="Type regular price here"
                  size="md"
                  radius="sm"
                  aria-label="₦1000"
                  type="number"
                  className=" rounded-lg w-full border-1"
                  classNames={{
                    label: "text-base",
                    input: "py-2 text-base",
                    inputWrapper: [
                      "bg-white",
                      "data-focus-[within=true]:bg-white",
                      "data-[hover=true]:bg-white",
                      "group-data-[focus=true]:bg-white",
                    ],
                  }}
                  value={regularPrice}
                  onChange={(e) => {
                    setRegularPrice(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="flex w-full flex-col gap-3">
                <p>Sale Price</p>
                {flags.map((flag) => (
                  <Input
                    isRequired={flag.currency === "NGN"}
                    key={flag.currency}
                    placeholder={flag.placeholder}
                    type="number"
                    startContent={
                      <div className="flex gap-1">
                        <Image
                          alt={flag.placeholder}
                          className="w-10 h-4"
                          radius="none"
                          src={flag.flag}
                        />
                        <span className="text-xs font-semibold">
                          {flag.currency}
                        </span>
                      </div>
                    }
                    endContent={
                      flag.currency !== "NGN" && loadingCurrency ? (
                        <Spinner color="default"></Spinner>
                      ) : (
                        ""
                      )
                    }
                    size="md"
                    radius="sm"
                    aria-label={flag.currency}
                    className=" rounded-lg w-full border-1"
                    classNames={{
                      label: "text-base",
                      input: "py-2 text-base",
                      inputWrapper: [
                        "bg-white",
                        "data-focus-[within=true]:bg-white",
                        "data-[hover=true]:bg-white",
                        "group-data-[focus=true]:bg-white",
                      ],
                    }}
                    value={form[flag.currency]}
                    onChange={(e) => handleInputChange(e, flag.currency)}
                  ></Input>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[500px]">
          <div className="border-8 border-solid border-[#FAFAFA] w-full h-[400px] rounded-xl">
            {selectedImages.length > 0 ? (
              <Image
                removeWrapper
                src={imagePreviews[0]}
                alt="Preview"
                className="object-cover rounded-lg  w-full h-full"
                width={100}
              />
            ) : (
              <Skeleton className="h-full w-full rounded-lg"></Skeleton>
            )}
          </div>
          <Spacer y={12}></Spacer>
          <div className="w-full relative p-5 bordered-input">
            <input
              type="file"
              name="file input drag"
              multiple
              className="opacity-0 absolute w-full h-full"
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
                      className="opacity-0 z-50 absolute w-[50px]"
                      multiple
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
                <p className="text-center">Jpeg,png,jpj are allowed</p>
              </div>
            </label>
          </div>

          <Spacer y={12}></Spacer>
          <div className=" flex flex-col gap-3 h-fit">{ImageUploadCards}</div>
          <Spacer y={12}></Spacer>
          {selectedImages.length > 0 && (
            <div className=" flex justify-between gap-4">
              <Button
                type="submit"
                size="lg"
                className="bg-[#1EB564] text-white w-full"
                isLoading={loading}
              >
                {edit ? "Edit" : "Confirm"}
              </Button>
              <Button
                size="lg"
                className="bg-transparent border-1 w-full"
                onClick={() => {
                  if (!edit) {
                    setImageNames([]);
                    setSelectedImages([]);
                    setImagePreviews([]);
                  } else {
                    alert("Images of product cannot be edited");
                  }
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
AddProducts.auth = true;
