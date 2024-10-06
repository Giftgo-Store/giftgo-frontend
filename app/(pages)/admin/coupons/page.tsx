"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  Input,
} from "@nextui-org/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import CouponCard from "@/app/components/coupon/couponCard";
import { PiWarningCircleThin } from "react-icons/pi";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import BASE_URL from "@/app/config/baseurl";
import CouponLoader from "@/app/components/loaders/couponLoader";
import { toast } from "react-toastify";

export default function Coupons() {
  const [coupons, setCoupons] = useState<any>([]);
  const [couponValue, setCouponValue] = useState("");
  const [couponPercentage, setCouponPercentage] = useState("");
  const [createNewCoupon, setCreateNewCoupon] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const session: any = useSession();
  const token = session?.data?.token;
  const API = BASE_URL + "/api/v1";

  //secure page
  const sesssion = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin/auth/login");
    },
  });

  const getAllCoupons = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/coupons`, {
        headers: {
          AUTHORIZATION: "Bearer " + token,
        },
      });

      const resData = await res.json();
      setLoading(false);
      if (resData.length < 1) {
        setCoupons([]);
        setCreateNewCoupon(true);
      }
      setCoupons(resData);

      // console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const addCoupon = async () => {
    setLoading(true);
    const data = {
      code: couponValue,
      discountPercentage: Number(couponPercentage),
    };
    try {
      const res = await fetch(`${API}/coupons/add`, {
        headers: {
          "Content-Type": "application/json",
          AUTHORIZATION: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      // console.log(resData.data);
      setCouponPercentage("");
      setCouponValue("");
      setCreateNewCoupon(false);
      if (resData) {
        setCoupons([]);
        setCoupons((prevCoupons: any) => [...prevCoupons, resData]);
      }
      onClose();
    } catch (error) {
      // console.log(error);
    }
  };
  // Update the coupon's active state in the local state
  const updateCouponState = (id: string, isActive: boolean) => {
    setCoupons((prevCoupons: any) =>
      prevCoupons.map((coupon: any) =>
        coupon._id === id ? { ...coupon, isActive } : coupon
      )
    );
  };

  const activateCoupon = async (id: string) => {
    setLoading(true);
    const data = {
      isActive: true,
    };
    try {
      const res = await fetch(`${API}/coupons/${id}/activate`, {
        headers: {
          "Content-Type": "application/json",
          AUTHORIZATION: "Bearer " + token,
        },
        method: "PATCH",
        body: JSON.stringify(data),
      });
      updateCouponState(id, true);
    } catch (error) {
      // console.log(error);
    }
  };
  const deactivateCoupon = async (id: string) => {
    setLoading(true);
    const data = {
      isActive: false,
    };
    try {
      const res = await fetch(`${API}/coupons/${id}/deactivate`, {
        headers: {
          "Content-Type": "application/json",
          AUTHORIZATION: "Bearer " + token,
        },
        method: "PATCH",
        body: JSON.stringify(data),
      });
      updateCouponState(id, false);
    } catch (error) {
      // console.log(error);
    }
  };
  function handleActivateCoupon(id: string) {
    toast.promise(activateCoupon(id), {
      pending: "Activating coupon ",
      success: "Coupon activated",
      error: "An error occured , please try again",
    });
  }
  function handleDeactivateCoupon(id: string) {
    toast.promise(deactivateCoupon(id), {
      pending: "Deactivating coupon ",
      success: "Coupon deactivated",
      error: "An error occured , please try again",
    });
  }

  useEffect(() => {
    getAllCoupons();
  }, []);
  return (
    <>
      <div className="flex w-full justify-end items-center gap-4">
        <Button
          startContent={<IoMdAddCircleOutline size={20} color="white" />}
          radius="sm"
          onPress={() => {
            onOpen();
          }}
          className="text-white bg-[#1EB564]"
        >
          Add new coupon
        </Button>
      </div>
      <div className="flex flex-col gap-3 py-4">
        {coupons &&
          coupons.map(
            (coupon: {
              code: string;
              discountPercentage: number;
              isActive: boolean;
              _id: string;
            }) => (
              <CouponCard
                key={coupon.code}
                isActive={coupon.isActive}
                coupon={coupon.code}
                percentageOff={coupon.discountPercentage}
                activateCoupon={() => {
                  handleActivateCoupon(coupon._id);
                }}
                deactivateCoupon={() => {
                  handleDeactivateCoupon(coupon._id);
                }}
              />
            )
          )}
      </div>
      {coupons.length === 0 && !loading && (
        <div className="min-h-[40vh] flex justify-center items-center">
          <p className="text-lg font-semibold">No coupons found !</p>
        </div>
      )}
      {coupons.length < 1 && loading && (
        <div className="w-full flex flex-col gap-3 py-4">
          <CouponLoader></CouponLoader>
          <CouponLoader></CouponLoader>
          <CouponLoader></CouponLoader>
        </div>
      )}
      <Modal size="md" isOpen={isOpen} onClose={onClose} className="py-5">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {!createNewCoupon && (
                  <div className="flex justify-center w-full">
                    <Image
                      src={"/warning.png"}
                      alt="icon"
                      width={100}
                      className="w-[50px] h-[50px] mx-auto"
                    />
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2 text-center">
                <p className="font-bold text-2xl text-[#23272E] py-2">
                  {createNewCoupon
                    ? "Specify coupon parameters"
                    : "Previous coupon will be deleted"}
                </p>
                {createNewCoupon ? (
                  <div className="flex flex-col gap-3">
                    <Input
                      isRequired
                      placeholder="PHSY544510"
                      type="text"
                      size="md"
                      radius="sm"
                      label="Coupon code"
                      labelPlacement="outside"
                      className=" rounded-lg w-full"
                      classNames={{
                        label: "text-base font-semibold",
                        input: "py-2 text-base",
                        inputWrapper: [
                          "bg-white  border-1",
                          "data-focus-[within=true]:bg-white",
                          "data-[hover=true]:bg-white",
                          "group-data-[focus=true]:bg-white",
                        ],
                      }}
                      description={"coupon must be 10 characters long"}
                      value={couponValue}
                      onChange={(e) => {
                        setCouponValue(e.target.value);
                      }}
                      isInvalid={couponValue.length > 10}
                      errorMessage={
                        "COUPON CODE MUST BE EQUAL TO OR LESS THAN 10 CHARACTERS"
                      }
                    ></Input>
                    <Input
                      isRequired
                      placeholder="01-99"
                      type="number"
                      size="md"
                      radius="sm"
                      label="Percentage off %"
                      labelPlacement="outside"
                      className=" rounded-lg w-full border-1"
                      classNames={{
                        label: "text-base font-semibold",
                        input: "py-2 text-base",
                        inputWrapper: [
                          "bg-white",
                          "data-focus-[within=true]:bg-white",
                          "data-[hover=true]:bg-white",
                          "group-data-[focus=true]:bg-white",
                        ],
                      }}
                      value={couponPercentage}
                      onChange={(e) => {
                        setCouponPercentage(e.target.value);
                      }}
                    ></Input>
                    <div className="flex gap-1 items-center">
                      <PiWarningCircleThin color="#70706E" />
                      <p className="text-[#70706E]">
                        {couponPercentage.length > 0 ? couponPercentage : "--"}%
                        off for customer products
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#70706E]">
                    To create a new coupon, your previous coupon will be deleted
                    proceed?
                  </p>
                )}
              </ModalBody>
              <ModalFooter className="flex gap-2 justify-center">
                <Button
                  variant="bordered"
                  color="default"
                  onPress={onClose}
                  className="w-[200px] text-default-600"
                  radius="sm"
                >
                  CANCEL
                </Button>
                <Button
                  onPress={() => {
                    if (!createNewCoupon) {
                      setCreateNewCoupon(true);
                    } else {
                      if (couponValue.length <= 10) {
                        toast.promise(addCoupon(), {
                          pending: "Creating coupon ",
                          success: "Coupon created",
                          error: "An error occured , please try again",
                        });
                      } else {
                        toast.error(
                          "coupon code must be less than 10 characters"
                        );
                      }
                    }
                  }}
                  className="text-white bg-[#1EB564] w-[200px]"
                  radius="sm"
                >
                  CREATE COUPON
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
Coupons.requireAuth = true;
