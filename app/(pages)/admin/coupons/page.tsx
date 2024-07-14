"use client";
import React, { useState } from "react";
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

export default function Coupons() {
  const [couponValue, setCouponValue] = useState("");
  const [createNewCoupon, setCreateNewCoupon] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

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
        <CouponCard coupon="PHSY54" />
      </div>
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
                      height={100}
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
                  <div>
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
                      value={couponValue}
                      onChange={(e) => {
                        setCouponValue(e.target.value);
                      }}
                    ></Input>
                    <div className="flex gap-1 items-center">
                      <PiWarningCircleThin color="#70706E" />
                      <p className="text-[#70706E]">
                        {couponValue.length > 0 ? couponValue : "--"}% off for
                        31 products
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
