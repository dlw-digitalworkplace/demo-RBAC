import { Spinner, SpinnerSize } from "@fluentui/react/lib/components/Spinner";
import * as React from "react";
import { ISale } from "../../core/models/ISale";
import { SaleService } from "../../services/SaleService";
import styles from "./Sales.module.scss";

import stonks from "../../images/stonks.jpg";

import { WithRoleValidation } from "../../hocs/withRoleValidation";

const Sales: React.FC = () => {
  const [sales, setSales] = React.useState<ISale[]>();

  const [errorMessage, setErrorMessage] = React.useState<string>();

  React.useEffect(() => {
    async function getSales() {
      try {
        const sales = await new SaleService().getSales();
        setSales(sales);
      }
      catch (error) {
        console.log(error);
        setErrorMessage("Error occurred while loading sales!");
      }
    }
    getSales();
  }, []);

  function onRenderSaleRow(sale: ISale): JSX.Element {
    return (
      <tr key={sale.id}>
        <td>{sale.id}</td>
        <td>{sale.productName}</td>
        <td>{sale.amountSold}</td>
        <td>€ {sale.totalProfit}</td>
      </tr>
    );
  }

  if (errorMessage) {
    return (
      <p>{errorMessage}</p>);
  }

  if (!sales) {
    return (
      <div className={styles.spinner}>
        <Spinner size={SpinnerSize.large} label="Sales are beign loaded" />
      </div>
    );
  }

  return (
    <div className={styles.salesContainer}>
      <table>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Amount Sold</th>
          <th>Total Profit</th>
        </tr>
        {sales.map(onRenderSaleRow)}
      </table>
      <img src={stonks} />
    </div>
  );
};

export default WithRoleValidation(Sales);
//export default Sales;