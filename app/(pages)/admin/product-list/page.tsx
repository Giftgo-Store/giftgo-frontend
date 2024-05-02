"use client";
import ProductListCard from "@/app/components/ProductListCard";
import { OrderList } from "@/app/assets/data";
import { useMemo, useState } from "react";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spacer,
  Link,
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
export default function ProductList() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<any | string[]>("10");
  const [filterValue, setFilterValue] = useState("");
  const [Items, setItems] = useState(OrderList);
  const [pinnedList, setPinnedList] = useState<any>([]);
  console.log(Items);
  const rowsPerPageOptions = ["10", "20", "30", "40", "50"];

  const filteredItems = useMemo(() => {
    return Items.filter((item) => {
      if (filterValue.length > 0) {
        return item.products[0].productName
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase());
      }
      return true; // Return true if no filter value is provided
    });
  }, [Items, filterValue]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * Number(rowsPerPage);
    const end = start + Number(rowsPerPage);

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage, Items]);

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / Number(rowsPerPage));
  }, [filteredItems, rowsPerPage]);

  const DeleteProduct = (index: number) => {
    // Create a copy of the current Items array and remove the item at the specified index
    const updatedItems = [...Items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  const PinProduct = (index: number) => {
    setPinnedList((pinnedlist: any) => [...pinnedlist, Items[index]]);
  };
  return (
    <div className="pb-12">
      <div className="flex justify-between gap-3 pt-4 py-3">
        <Input
          placeholder="Search by order id"
          endContent={<CiSearch size={28} color="#8B909A" />}
          size="md"
          radius="sm"
          aria-label="search"
          className="max-w-[300px] w-full"
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
          as={Link}
          href="/admin/add-product"
          className="text-white bg-[#1EB564]"
        >
          Add new product
        </Button>
      </div>
      <Spacer y={10}></Spacer>
      {pinnedList.length > 0 && (
        <div className="pb-5">
          <p className="text-2xl font-bold">Pinned List</p>
        </div>
      )}
         <div
        className={`flex gap-3 ${
          pinnedList.length > 3 ? "justify-between" : "justify-stretch"
        } flex-wrap`}
      >
      {pinnedList &&
        pinnedList.map((item: any, index: number) => (
          <ProductListCard
            key={index}
            avatar="/teddy.png"
            productCategory="shoes"
            productName={item.products[0].productName}
            productPrice={item.products[0].price}
            productSold={item.products[0].sellingPrice}
            productStock={item.products[0].originalPrice}
            productSummary="loremLorem ipsum is placeholder text commonly used in the graphic."
            DeleteProduct={() => {
              DeleteProduct(index);
            }}
            EditProduct={() => {
              alert("Edit product");
            }}
            PinProduct={() => alert("pin product")}
          />
        ))}
      </div>
      <Spacer y={10}></Spacer>
      <div className="pb-5">
        <p className="text-2xl font-bold">All Products</p>
      </div>

      <div
        className={`flex gap-3 ${
          paginatedItems.length > 3 ? "justify-between" : "justify-stretch"
        } flex-wrap`}
      >
        {paginatedItems.length ? (
          paginatedItems.map((item, index) => (
            <ProductListCard
              key={index}
              avatar="/teddy.png"
              productCategory="shoes"
              productName={item.products[0].productName}
              productPrice={item.products[0].price}
              productSold={item.products[0].sellingPrice}
              productStock={item.products[0].originalPrice}
              productSummary="loremLorem ipsum is placeholder text commonly used in the graphic."
              DeleteProduct={() => {
                DeleteProduct(index);
              }}
              EditProduct={() => {
                alert("Edit product");
              }}
              PinProduct={() => PinProduct(index)}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      <div className="flex justify-between items-center py-2 px-3">
        <div className="flex justify-normal gap-2 items-center text-[#8B909A] text-sm font-medium">
          <p>Showing</p>
          <Select
            size="sm"
            className=" w-[100px] border-1 rounded-lg"
            selectedKeys={[rowsPerPage]}
            onChange={(e) => {
              setRowsPerPage(e.target.value);
            }}
            aria-label="rows"
          >
            {rowsPerPageOptions.map((option) => (
              <SelectItem
                isDisabled={filteredItems.length < Number(option)}
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </Select>
          <p>of {filteredItems.length}</p>
        </div>
        <Pagination
          showControls
          color="success"
          total={pages}
          initialPage={1}
          page={page}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
}
