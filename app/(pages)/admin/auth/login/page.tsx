"use client";
import { useEffect, useMemo, useState } from "react";
import { Input, Button, Image } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

const AdminLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const session = useSession();
  // console.log(session);
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  useEffect(() => {
    if (error) {
      setLoading(false);
      setErrorMessage(error);
    }
  }, [error]);
 

  return (
    <div className="flex justify-center items-center w-full min-h-[80vh] h-full">
      <form
        className="flex flex-col gap-4 bg-white max-w-[400px] p-5 w-full rounded-xl"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/admin",
          });
        }}
      >
        <Image src={"/icon.svg"} alt="icon" width={100} height={100} />
        <p className="text-black font-semibold text-lg">
          Please login to continue
        </p>

        <Input
          radius="sm"
          aria-label="Email"
          className="rounded-lg w-full "
          id="email"
          isRequired
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          type="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          isInvalid={isInvalid}
          color={isInvalid ? "danger" : "default"}
          errorMessage={isInvalid && "Please enter a valid email"}
        />
        <Input
          radius="sm"
          aria-label="Password"
          className="rounded-lg w-full border-1"
          id="password"
          isRequired
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        {errorMessage && (
          <p className="text-danger font-medium">{errorMessage}</p>
        )}
        <div className="flex gap-2 justify-end">
          <Button
            type="submit"
            fullWidth
            color="primary"
            isLoading={loading}
            isDisabled={loading}
          >
            Login
          </Button>
          {/* <Button
            onClick={() => {
              signOut();
            }}
            fullWidth
            color="primary"
          >
            Logout
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
