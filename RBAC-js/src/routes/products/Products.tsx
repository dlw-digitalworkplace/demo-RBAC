
import { Spinner, SpinnerSize } from "@fluentui/react/lib/components/Spinner";
import * as React from "react";
import { IProduct } from "../../core/models/IProduct";
import { ProductService } from "../../services/ProductsService";
import styles from "./Products.scss";

const Products: React.FC = () => {
  const [products, setProducts] = React.useState<IProduct[]>();

  React.useEffect(() => {
    async function getProducts() {
      const products = await new ProductService().getProducts();
      setProducts(products);
    }
    getProducts();
  }, []);

  function onRenderProduct(product: IProduct) {
    return (
      <div className={styles.product} key={product.id}>
        <img src={"https://picsum.photos/seed/picsum/200/300"} />
        <h3>{product.name}</h3>
        <div className={styles.productPrice}>€ {product.price}</div>
        <button className={styles.addToCart}>Add to cart</button>
      </div>
    );
  }

  if (!products) {
    return (
      <div className={styles.spinner}>
        <Spinner size={SpinnerSize.large} label="Products are beign loaded" />
      </div>);
  }

  return (
    <div className={styles.products}>
      <span className={styles.productsTitle}>Our products </span>
      <div className={styles.productsList}>
        {products.map(onRenderProduct)}
      </div>
    </div>
  );
};

export default Products;