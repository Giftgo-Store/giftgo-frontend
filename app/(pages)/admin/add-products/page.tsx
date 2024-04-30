"use client";
import { ImageUploadCard } from "@/app/components/imageUploadCard";
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
} from "@nextui-org/react";
import { ChangeEvent, MouseEvent, useEffect, useReducer, useState } from "react";
import { SlPicture } from "react-icons/sl";

interface Form {
  USD: string;
  GBP: string;
  EUR: string;
  CAD: string;
  AUD: string;
  JPY: string;
  NGN?: string;
}
type Currency = keyof Form;
interface Flag {
  currency: Currency;
  placeholder: string;
  flag: string;
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
  }, [value, time]);

  return debouncevalue;
}
function reducer(state: Form, action: ActionType) {
  switch (action.type) {
    case "USD":
      return { ...state, USD: action.payload };
    case "GBP":
      return { ...state, GBP: action.payload };
    case "EUR":
      return { ...state, EUR: action.payload };
    case "CAD":
      return { ...state, CAD: action.payload };
    case "AUD":
      return { ...state, AUD: action.payload };
    case "JPY":
      return { ...state, JPY: action.payload };
    case "NGN":
      return { ...state, NGN: action.payload };
    case "SET_ALL":
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}

export default function AddProducts() {
  const [loadingCurrency, setLoadingCurrency] = useState(false);
  const [conversionRates, setConversionRates] = useState<ConversionRates>({});
   const [selectedImages, setSelectedImages] = useState<any[]>([]);
   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
 const [imageNames, setImageNames] = useState<string[]>([]);

  const [form, setForm] = useState<Form>({
    USD: "",
    GBP: "",
    EUR: "",
    CAD: "",
    AUD: "",
    JPY: "",
    NGN: "",
  });
  //const nairaQuery = useDebounceValue(form.NGN);

  const categories = ["shoes", "clothes", "suits", "jewelry", "furniture"];

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
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   getConversionRates();
  // }, []);

  const setAllParameters = (values: Partial<Form>) => {
    setForm((prevForm) => ({ ...prevForm, ...values }));
  };

  const calculateConvertedValues = () => {
    setLoadingCurrency(true);
    const convertedValues: Partial<Form> = {};

    if (form.NGN) {
      for (const currency in conversionRates) {
        if (currency !== "NGN") {
          convertedValues[currency as Currency] = (
            conversionRates[currency] * Number(form.NGN)
          ).toFixed(4);
        }
      }
    }

    setAllParameters(convertedValues);
    setLoadingCurrency(false);
  };

  console.log(form);
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
      calculateConvertedValues();
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
        setImageNames((prevImageNames) => [
          ...prevImageNames,
          ...newImageNames,
        ]);
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

  return (
    <div className="pb-8">
      <form className="p-5 bg-white rounded-lg flex flex-col lg:flex-row gap-5">
        <div className=" w-full flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p>Product Name</p>
            <Input
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
            ></Input>
          </div>
          <div className="flex flex-col gap-3">
            <p>Description</p>
            <Textarea
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
            />
          </div>
          <div className="flex gap-2">
            <p>Express Shipping</p>
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
            ></Switch>
          </div>
          <div className="flex flex-col gap-3">
            <p>Category</p>
            <Select
              size="md"
              radius="sm"
              className="w-full bg-white shadow-none border-1 rounded-lg"
              placeholder="Select category"
              variant="flat"
              aria-label="filter select"
              classNames={{
                trigger: [
                  "bg-white",
                  "data-focus-[within=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                ],
              }}
            >
              {categories.map((category) => (
                <SelectItem key={category}>{category}</SelectItem>
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
            ></Input>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full justify-between gap-2">
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
                ></Input>
              </div>
              <div className="flex w-full flex-col gap-3">
                <p>Stock Quantity</p>
                <Input
                  placeholder="1258"
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
                ></Input>
              </div>
            </div>
            <div className="flex w-full justify-between gap-2">
              <div className="flex w-full flex-col gap-3">
                <p>Regular Price</p>
                <Input
                  placeholder="Type name here"
                  size="md"
                  radius="sm"
                  aria-label="₦1000"
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
                ></Input>
              </div>
              <div className="flex w-full flex-col gap-3">
                <p>Sale Price</p>
                {flags.map((flag) => (
                  <Input
                    key={flag.currency}
                    placeholder={flag.placeholder}
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
                height={100}
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
          <div className=" flex flex-col gap-3">
            {imagePreviews.map((imagepreview, index) => (
              <ImageUploadCard
                name={imageNames[index]}
                avatar={imagepreview}
                removeCard={() => {
                  removeImage(index);
                }}
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
