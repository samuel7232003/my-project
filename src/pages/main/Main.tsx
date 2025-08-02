import { ChangeEvent, useEffect, useMemo, useState } from "react";
import css from "./Main.module.css";
import { ProductCard } from "../../components/product-card/productCard";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { actionGetAllProducts } from "../../redux/product/product.action";
import { Button, Input } from "antd";
import PriceRangeSlider from "../../components/dual-range-slider/price-range-slider";

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
};

export default function Main() {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    minPrice: 0,
    maxPrice: 100,
  });

  const [tempFilters, setTempFilters] = useState<FilterState>({
    category: "",
    minPrice: 0,
    maxPrice: 100,
  });

  useEffect(() => {
    dispatch(actionGetAllProducts());
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyFilters = () => {
    setFilters({ ...tempFilters });
  };

  const handleClearFilters = () => {
    const defaultFilters = { category: "", minPrice: 0, maxPrice: 100 };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
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
          onChange={handleSearchChange}
        />
        <div className={css.filterContainer}>
          <div className={css.filterOptions}>
            <select
              className={css.categorySelect}
              name="category"
              value={tempFilters.category}
              onChange={(e) => setTempFilters((prev) => ({...prev, category: e.target.value,}))}
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
              onChange={(min, max) => setTempFilters((prev) => ({...prev, minPrice: min, maxPrice: max}))}
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
