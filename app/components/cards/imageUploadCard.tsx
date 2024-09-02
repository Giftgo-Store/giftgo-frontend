import { Progress, Skeleton, Image, Button } from "@nextui-org/react";
import { MouseEventHandler } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
interface imageUploadCard {
  name: string;
  avatar: string;
  removeCard: MouseEventHandler<HTMLButtonElement>;
  isEditable:boolean
}
export function ImageUploadCard({
  name,
  avatar,
  removeCard,
  isEditable,
}: imageUploadCard) {
  return (
    <div className="py-3 px-5 flex justify-between items-center bg-[#FAFAFA] rounded-lg gap-3">
      {avatar ? (
        <Image
          removeWrapper
          src={avatar}
          alt="Preview"
          className="object-cover rounded-lg w-[100px] h-[60px]"
          width={100}
          height={100}
        />
      ) : (
        <Skeleton className="w-[60px] h-[60px]"></Skeleton>
      )}
      <div className="flex flex-col gap-3 w-full max-w-[250px]">
        <p>{name}</p>
        <Progress
          aria-label="sales"
          value={100}
          className="max-w-sm bg-none"
          classNames={{
            indicator: "!bg-[#1EB564]",
          }}
          size="sm"
        />
      </div>
      <Button
        onClick={removeCard}
        isIconOnly
        className="bg-transparent"
        isDisabled={isEditable}
      >
        <AiFillCloseCircle size={20} color="red" />
      </Button>
    </div>
  );
}