"use client";
import { useState } from "react";
import { Input, Button, Image } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setPending(false);

      if (!response || !response.ok) {
        setErrorMessage(response?.error || "Invalid login credentials");
      } else {
        setErrorMessage("");
        router.push("/admin/dashboard"); // Redirect after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      setPending(false);
      setErrorMessage("An error occurred during login");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form
        className="flex flex-col gap-4 bg-white max-w-[400px] p-5 w-full rounded-xl"
        onSubmit={handleSubmit}
      >
        <Image src={"/icon.svg"} alt="icon" width={100} height={100} />
        <p className="text-black font-semibold text-lg">
          Please login to continue
        </p>

        <Input
          radius="sm"
          aria-label="Email"
          className="rounded-lg w-full border-1"
          id="email"
          isRequired
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          type="email"
          name="email"
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
        />
        <div className="flex gap-2 justify-end">
          <Button
            type="submit"
            fullWidth
            color="primary"
            isLoading={pending}
            isDisabled={pending}
          >
            Login
          </Button>
        </div>
        {errorMessage && (
          <p className="text-danger font-medium">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
