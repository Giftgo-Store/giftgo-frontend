"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import Modal from "@/app/components/LoginModal";
import Cookies from "js-cookie";
import BASE_URL from "@/app/config/baseurl";
import axios from "axios";
import { useRefetch } from "@/app/context/refetchContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { triggerRefetch } = useRefetch();
  const [image, setImage] = useState<string[]>([]);
  const [customizable, setCustomizable] = useState(true);
  const photoInput: React.MutableRefObject<HTMLInputElement | null> =
    useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleValidChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files.item(0);
      // if (file instanceof File) {
      //   try {
      //     const downloadURL = await upload(file);
      //     console.log("File uploaded successfully:", downloadURL);
      //     setImage([downloadURL]);
      //   } catch (error) {
      //     console.error("Error uploading file:", error);
      //   }
      //   if (!file) return;
      // }
    }
  };

  const [cartItems, setCartItems] = useState<any>([]);
  const [user, setUser] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [countCity, setCountCity] = useState<any>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/cart`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        // Handle successful response, e.g., save token, redirect, etc.
        setCartItems(response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource", error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `https://countriesnow.space/api/v0.1/countries/states`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Handle successful response, e.g., save token, redirect, etc.
        setCountries(response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource", error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCountries();
  }, []);

  const selectedState =
    countries && countries.filter((count: any) => count.name === country);

  useEffect(() => {
    const fetchCountCity = async () => {
      try {
        const response = await axios.get(
          `https://countriesnow.space/api/v0.1/countries`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Handle successful response, e.g., save token, redirect, etc.
        setCountCity(response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource", error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchCountCity();
  }, []);

  const selectedCity =
    countCity && countCity.filter((count: any) => count.country === country);

  console.log(selectedCity);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        // Handle successful response, e.g., save token, redirect, etc.
        setUser(response.data.data);
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource", error?.response?.data || error?.message
        );
      } finally {
        // Any cleanup or final actions
      }
    };
    fetchUser();
  }, []);

  const orderedItems =
    cartItems &&
    cartItems &&
    cartItems.map((item: any) => ({
      productId: item.product._id,
      quantity: item.quantity,
      price: item.product.salePrice,
      lifetime: false,
      validity: 30,
      productName: item.product.productName,
      licenses: [],
    }));

  const handlePlaceOrder = async () => {
    const token = Cookies.get("token");
    if (!token) {
      console.log("No token");
      openModal();
      setShowLogin(true);
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/orders/make-order`,
        {
          customerAddress: {
            address,
            city,
            state: region,
            country,
            postal_code: zipCode,
          },
          customerPhoneNumber: user.phone,
          orderedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log(response.data.data);
      alert("successfulll");
      router.push('/confirmation')
      // Handle successful response, e.g., save token, redirect, etc.
      try {
        const response = await axios.delete(
          `${BASE_URL}/api/v1/cart`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        triggerRefetch();
        alert("successfulll");
        // Handle successful response, e.g., save token, redirect, etc.
      } catch (error) {
        console.error(
          //@ts-ignore
          "Error fetching resource", error?.response?.data || error?.message);
        alert("error");
      } finally {
        // Any cleanup or final actions
      }

    } catch (error) {
      console.error(
        //@ts-ignore
        "Error fetching resource", error?.response?.data || error?.message);
      alert("error");
    } finally {
      // Any cleanup or final actions
    }
  };

  const total = cartItems.map(
    (item: any) => Number(item.quantity) * Number(item.product.salePrice)
  );

  function formatNumberWithCommas(amount: number): string {
    return new Intl.NumberFormat("en-US").format(amount);
  }

  return (
    <>
      {showLogin && <Modal showModal={showModal} closeModal={closeModal} />}
      <div className="py-[20px] px-[4%] lg:px-[8%] text-center bg-secondary mb-[56px]">
        <h2 className="font-[600] leading-[32px] text-[28px] text-[#191C1F] pb-1">
          Checkout
        </h2>
        <p className="text-[#475156] text-[18px] font-[500]">
          Home / <span className="cursor-pointer"> Shopping card</span> /
          Checkout
        </p>
      </div>

      <div className="px-[4%] lg:px-[8%] mb-[90px] flex-col lg:flex-row flex justify-between items-start gap-6">
        <div className="lg:w-[67%] rounded-[4px]">
          <div className="py-5">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Shipping Information
            </h2>
          </div>

          <div className="flex flex-col items-start w-full gap-4">
            <div className="flex justify-between flex-col lg:flex-row items-start lg:items-end w-full gap-4">
              <div className="flex flex-col gap-2 w-full lg:w-[30%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  User name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="First name"
                  value={user && user?.name && user?.name.split(" ")[0]}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[30%]">
                <input
                  type="text"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Last name"
                  value={user && user?.name && user?.name.split(" ")[1]}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[40%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Company Name{" "}
                  <span className="text-[#929FA5]">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="username" className="text-[#191C1F] text-[14px]">
                Address
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-start flex-wrap lg:items-end w-full gap-4">
              <div className="flex flex-col gap-2 w-[45%] lg:w-[23%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Country
                </label>
                <select
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none text-[#929FA5]"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.length > 0 &&
                    countries.map((count: any, i: any) => {
                      return (
                        <option key={i} value={count.name}>
                          {count.name}
                        </option>
                      );
                    })}
                  <option value="">select</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-[45%] lg:w-[23%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Region/State
                </label>
                <select
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none text-[#929FA5]"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {selectedState.length > 0 &&
                    selectedState[0] &&
                    selectedState[0].states &&
                    selectedState[0].states.map((state: any, i: any) => {
                      return (
                        <option key={i} value={state.name}>
                          {state.name}
                        </option>
                      );
                    })}
                  <option value="">select</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-[45%] lg:w-[23%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  City
                </label>
                <select
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none text-[#929FA5]"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {selectedCity.length > 0 &&
                    selectedCity[0] &&
                    selectedCity[0].cities &&
                    selectedCity[0].cities.map((city: any, i: any) => {
                      return (
                        <option key={i} value={city}>
                          {city}
                        </option>
                      );
                    })}
                  <option value="">select</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 w-[45%] lg:w-[23%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Zip Code
                </label>
                <input
                  type="number"
                  name="username"
                  id="username"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between items-end w-full gap-4 flex-wrap">
              <div className="flex flex-col gap-2 w-full lg:w-[48%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="username"
                  id="username"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Email Address"
                  value={user && user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[48%]">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[44px] px-5 outline-none"
                  placeholder="Phone number"
                  value={user && user.phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-10 pb-6">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Additional Information
            </h2>
          </div>
          {customizable ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full gap-4 lg:gap-2">
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="text-[#191C1F] text-[14px]"
                >
                  Order Notes <span className="text-[#929FA5]">(Optional)</span>
                </label>
                <textarea
                  className="border-[#E4E7E9] text-[14px] border-[1px] h-[150px] lg:h-full py-2 px-5 outline-none"
                  placeholder="Notes about your order, e.g. special notes for delivery. This notes may or may not be checked."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="text-[#191C1F]">
                  Upload Image you want printed
                </label>
                <input
                  type="file"
                  required
                  className="hidden"
                  ref={photoInput}
                  onChange={handleValidChange}
                />
                <div
                  className="border-[2px] border-dashed border-[##E4E7E9] rounded-[8px] px-8 w-full flex flex-col justify-center items-center cursor-pointer py-[26px]"
                  onClick={() => {
                    if (photoInput.current) {
                      // @ts-ignore
                      photoInput.current.click();
                    }
                  }}
                >
                  {image.length < 1 ? (
                    <>
                      <Image width={64} height={64} src="/image.png" alt="" />{" "}
                      <p className="text-[#929FA5] text-center">
                        Drop your image here, or{" "}
                        <span className="text-primary">Browse</span> <br />
                        Jpeg, png are allowed
                      </p>
                    </>
                  ) : (
                    <p className="text-green-400">
                      File uploaded successfully!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <label htmlFor="username" className="text-[#191C1F] text-[14px]">
                Order Notes <span className="text-[#929FA5]">(Optional)</span>
              </label>
              <textarea
                className="border-[#E4E7E9] text-[14px] border-[1px] h-[150px] py-2 px-5 outline-none"
                placeholder="Notes about your order, e.g. special notes for delivery. This notes may or may not be checked."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="border-[#E4E7E9] border-[1px] lg:w-[33%] rounded-[4px]">
          <div className="px-6 py-5">
            <h2 className="text-[18px] font-[500] text-[#191C1F]">
              Order Summary
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 px-5 w-full">
            {cartItems.length > 0 &&
              cartItems.map((item: any, i: any) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between w-full items-center gap-4"
                  >
                    <Image
                      src={item && item?.product?.images[0]}
                      alt=""
                      width={72}
                      height={72}
                      className="relative z-0 object-cover w-[72px] h-[72px]"
                    />
                    <div className="">
                      <p className="text-[14px] font-[400]">
                        {item && item?.product?.brandName}{" "}
                        {item && item?.product?.productName}{" "}
                        {item && item?.product?.description.split(0, 20)}...
                      </p>
                      <p className="text-[14px] font-[400]">
                        {item.quantity} x{" "}
                        <span className="font-[700] text-[14px]">
                          ₦
                          {formatNumberWithCommas(
                            item && item?.product.salePrice
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex flex-col items-start gap-3 px-5 pt-4">
            <div className="flex justify-between items-center w-full">
              <p className="text-[#5F6C72] text-[14px]">Sub-total</p>
              <p className="text-[#191C1F] text-[14px] font-[700]">
                ₦{" "}
                {formatNumberWithCommas(
                  total.reduce(
                    (accumulator: any, currentValue: any) =>
                      accumulator + currentValue,
                    0
                  )
                )}
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-[#5F6C72] text-[14px]">Shipping</p>
              <p className="text-[#191C1F] text-[14px] font-[700]">Free</p>
            </div>
          </div>

          <div className="bg-[#E4E7E9] h-[1px] w-full my-[16px]"></div>

          <div className="flex justify-between items-center w-full px-5">
            <p className="text-[#191C1F] text-[16px]">Sub-total</p>
            <p className="text-[#191C1F] text-[16px] font-[700]">
              ₦{" "}
              {formatNumberWithCommas(
                total.reduce(
                  (accumulator: any, currentValue: any) =>
                    accumulator + currentValue,
                  0
                )
              )}
            </p>
          </div>

          <div className="flex justify-center items-center my-6">
            <button
              onClick={handlePlaceOrder}
              className="flex justify-center items-center gap-2 text-white px-8 py-4 bg-primary rounded-[3px] font-[700]"
            >
              <p>PLACE ORDER</p>
              <FiArrowRight className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
