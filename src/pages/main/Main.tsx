import { ChangeEvent, useEffect, useMemo, useState } from "react";
import css from "./Main.module.css";
import { ProductCard } from "../../components/product-card/productCard";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { actionGetAllProducts } from "../../redux/product/product.action";
import { Button, Input } from "antd";
import PriceRangeSlider from "../../components/dual-range-slider/price-range-slider";
import { useSearchParams } from "react-router-dom";

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
}

export default function Main() {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialMin = Number(searchParams.get("minPrice") || 0);
  const initialMax = Number(searchParams.get("maxPrice") || 100);

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    minPrice: initialMin,
    maxPrice: initialMax,
  });

  const [tempFilters, setTempFilters] = useState<FilterState>({
    category: initialCategory,
    minPrice: initialMin,
    maxPrice: initialMax,
  });

  useEffect(() => {
    dispatch(actionGetAllProducts());
  }, []);

  useEffect(() => {
    const params: any = {};
    if (searchTerm) params.search = searchTerm;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice !== 0) params.minPrice = filters.minPrice.toString();
    if (filters.maxPrice !== 100) params.maxPrice = filters.maxPrice.toString();
    setSearchParams(params);
  }, [searchTerm, filters, setSearchParams]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyFilters = () => {
    setFilters({ ...tempFilters });
  };

  const handleTemporaryFiltersCost = (min: number, max: number) => {
    setTempFilters({ ...tempFilters, minPrice: min, maxPrice: max });
  };

  const handleTemporaryFilterCategory = (category: string) => {
    setTempFilters({ ...tempFilters, category });
  };

  const handleClearFilters = () => {
    const defaultFilters = { category: "", minPrice: 0, maxPrice: 100 };
    setSearchTerm("");
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchTitle = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchPrice =
        product.price >= filters.minPrice &&
        (filters.maxPrice === 100 ? true : product.price <= filters.maxPrice);

      const matchCategory =
        filters.category === "" || product.category === filters.category;

      return matchTitle && matchPrice && matchCategory;
    });
  }, [products, searchTerm, filters]);

  return (
    <div className={css.mainContainer}>
      <h1 className={css.productTitle}>Product List</h1>
      <div className={css.searchAndFilterContainer}>
        <Input
          className={css.searchInput}
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className={css.filterContainer}>
          <div className={css.filterOptions}>
            <select
              className={css.categorySelect}
              name="category"
              value={tempFilters.category}
              onChange={(e) => handleTemporaryFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>

            <PriceRangeSlider
              min={0}
              max={100}
              onChange={(min, max) => handleTemporaryFiltersCost(min, max)}
            />
          </div>
          <div className={css.filterButtons}>
            <Button type="primary" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button type="default" onClick={handleClearFilters}>
              Clear
            </Button>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className={css.noProducts}>No products found</div>
      ) : (
        <div className={css.productList}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}