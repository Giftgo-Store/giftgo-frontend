"use client";
import ProductListCard from "@/app/components/cards/ProductListCard";
import { useEffect, useMemo, useState } from "react";
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
import { ProductListSkeletonCard } from "@/app/components/loaders/productlistskeletonLoad";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import BASE_URL from "@/app/config/baseurl";
interface item {
  _id: string;
  productName: string;
  description: string;
  category: {
    name: string;
  };
  regularPrice: number;
  brandName: string;
  salePrice: string;
  sku: string;
  images: string[];
  stockQuantity: number;
}

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<any | string[]>("10");
  const [filterValue, setFilterValue] = useState("");
  const [Items, setItems] = useState<item[]>([]);
  const [loading, setLoading] = useState(true);
  const [pinnedList, setPinnedList] = useState<item[]>([]);
  const rowsPerPageOptions = ["10", "20", "30", "40", "50"];
  const sesssion = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin/auth/login");
    },
  });
  const session: any = useSession();
  const token = session?.data?.token;
  const API = BASE_URL + "/api/v1";

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const data = await fetch(`${API}/products/`, {
        headers: {
          "Content-Type": "application/json",
          AUTHORIZATION: "Bearer " + token,
        },
        method: "GET",
      });
      const productData = await data.json();
      setLoading(false);
      if (productData.data) {
        setItems(productData.data);
      } else if (productData.data === null) {
        setItems([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to load pinned items from local storage
  const loadPinnedItems = () => {
    const pinnedItems =
      typeof window !== "undefined"
        ? window.localStorage.getItem("pinnedList")
        : false;
    return pinnedItems ? JSON.parse(pinnedItems) : [];
  };

  // Function to save pinned items to local storage
  const savePinnedList = (pinnedItems: item[]) => {
    localStorage.setItem("pinnedList", JSON.stringify(pinnedItems));
  };

  useEffect(() => {
    if (pinnedList.length > 0) {
      savePinnedList(pinnedList);
    }
  }, [pinnedList]);

  useEffect(() => {
    const loadedPinnedItems = loadPinnedItems();
    setPinnedList(loadedPinnedItems);
  }, []);
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const filteredItems = useMemo(() => {
    return Items.filter((item: item) => {
      if (filterValue.length > 0) {
        return item.productName
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
  }, [page, filteredItems, rowsPerPage]);

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / Number(rowsPerPage));
  }, [filteredItems, rowsPerPage]);

  const DeleteProduct = async (
    index: number,
    id: string,
    isPinned: boolean
  ) => {
    if (isPinned) {
      // Remove from pinned list without sending a delete request to the server
      const updatedPinnedList = [...pinnedList];
      updatedPinnedList.splice(index, 1);
      setPinnedList(updatedPinnedList);
      savePinnedList(updatedPinnedList);
    } else {
      // Remove from main product list and send a delete request to the server
      try {
        const data = await fetch(`${API}/products/${id}`, {
          headers: {
            AUTHORIZATION: "Bearer " + token,
          },
          method: "DELETE",
        });
        await data.json();

        const updatedItems = [...Items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
      } catch (error) {
        //console.error(error);
      }
    }
  };

  const PinProduct = (index: number) => {
    const product: item = Items[index];
    if (!pinnedList.some((item: item) => item._id === product._id)) {
      setPinnedList((pinnedlist) => [...pinnedlist, product]);
    }
  };

  return (
    <div className="pb-12">
      <div className="flex justify-between gap-3 pt-4 py-3">
        <Input
          placeholder="Search by product name"
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
          href="/admin/add-products"
          className="text-white bg-[#1EB564]"
        >
          Add new product
        </Button>
      </div>
      <Spacer y={6}></Spacer>
      {pinnedList.length > 0 && filterValue.length < 1 && (
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
          filterValue.length < 1 &&
          pinnedList.map((item: item, index: number) => (
            <ProductListCard
            
              key={item._id}
              avatar={item.images[0]}
              productCategory={item.category.name}
              productName={item.productName}
              productPrice={Number(item.salePrice).toLocaleString()}
              productSold={""}
              productStock={item.stockQuantity}
              productSummary={item.description}
              isPinned={true}
              DeleteProduct={() => {
                DeleteProduct(index, item._id, true);
              }}
              EditProduct={() => {
                alert("Pinned product cannot be edited");
              }}
              PinProduct={() => PinProduct(index)}
            />
          ))}
      </div>
      <Spacer y={10}></Spacer>
      <div className="pb-5">
        <p className="text-2xl font-bold">All Products</p>
      </div>

      <div>
        {!loading ? (
          <div
            className={`flex gap-5  ${
              paginatedItems.length > 3 ? "justify-start" : "justify-stretch"
            } flex-wrap`}
          >
            {paginatedItems.length ? (
              paginatedItems.map((item: item, index) => (
                <ProductListCard
                  key={item._id}
                  avatar={item.images[0]}
                  productCategory={item.category.name}
                  productName={item.productName}
                  productPrice={Number(item.salePrice).toLocaleString()}
                  productSold={""}
                  productStock={item.stockQuantity.toLocaleString()}
                  productSummary={item.description}
                  isPinned={false}
                  DeleteProduct={() => {
                    DeleteProduct(index, item._id, false);
                  }}
                  EditProduct={() => {
                    router.push(`/admin/add-products?edit=${item._id}`);
                  }}
                  PinProduct={() => PinProduct(index)}
                />
              ))
            ) : (
              <div className="h-[40vh] flex justify-center items-center w-full">
                <p className="text-center">No products found !</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 justify-between w-full">
            <ProductListSkeletonCard />
            <ProductListSkeletonCard />
            <ProductListSkeletonCard />
            <ProductListSkeletonCard />
            <ProductListSkeletonCard />
            <ProductListSkeletonCard />
          </div>
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
          initialPage={1}
          total={pages || 1}
          page={page}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
}
ProductList.requireAuth = true;
