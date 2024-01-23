import { FC, FormEvent, useState } from "react";

import styles from "./styles.module.scss";
import Button from "../UI/button";
import TextInput from "../UI/input";
import CustomSelect from "../UI/select";

import {
  level1Data,
  businessUnitData,
  supplierNameData,
  invoiceSourceData,
  legalEntityData,
  productsData,
  projectData,
} from "../../data/data";
import { TailSpin } from "react-loader-spinner";

interface Props {
  setL2ResultValue: (value: string) => void;
  setLoading: (value: boolean) => void;
  loading: boolean;
}

const Form: FC<Props> = ({ setL2ResultValue, setLoading, loading }: Props) => {
  const [supplierName, setSupplierName] = useState<string>("");
  const [legalEntity, setLegalEntity] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [project, setProject] = useState<string>("");
  const [businessUnit, setBusinessUnit] = useState<string>("");
  const [invoiceSource, setInvoiceSource] = useState<string>("");
  const [level1, setLevel1] = useState<string>("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const bodyData = {
      NormalizedSupplierName: supplierName,
      Level1: level1,
      BusinessUnit: businessUnit,
      LegalEntity: legalEntity,
      InvoiceSource: invoiceSource,
      Product: product,
      Project: project,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }).then((json) => json.json());

    const result = response.classe[0];

    setL2ResultValue(result);
    setLoading(false);
    setSupplierName("");
    setLegalEntity("");
    setProduct("");
    setProject("");
    setBusinessUnit("");
    setInvoiceSource("");
    setLevel1("");
  };

  return (
    <>
      {loading ? (
        <div className="loadingContainer">
          <TailSpin
            height="80"
            width="80"
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <form
          className={styles.formContainer}
          onSubmit={submitHandler}
          id="accuracy"
        >
          <h1>Purchase Order Info</h1>
          <div className={styles.formContent}>
            <div className={styles.column}>
              <CustomSelect
                placeholder="Supplier Name"
                value={supplierName}
                setValue={setSupplierName}
                options={supplierNameData}
              />
              <CustomSelect
                placeholder="Legal Entity"
                setValue={setLegalEntity}
                value={legalEntity}
                options={legalEntityData}
              />
              <CustomSelect
                placeholder="Business Unit"
                options={businessUnitData}
                value={businessUnit}
                setValue={setBusinessUnit}
              />
            </div>
            <div className={styles.column}>
              <CustomSelect
                placeholder="Product"
                setValue={setProduct}
                value={product}
                options={productsData}
              />
              <CustomSelect
                placeholder="Project"
                options={projectData}
                setValue={setProject}
                value={project}
              />
              <CustomSelect
                placeholder="Invoice Source"
                options={invoiceSourceData}
                value={invoiceSource}
                setValue={setInvoiceSource}
              />
            </div>
            <div className={styles.column}>
              <CustomSelect
                placeholder="Level 1"
                options={level1Data}
                value={level1}
                setValue={setLevel1}
              />
            </div>
          </div>
          <Button form="accuracy">Classify</Button>
        </form>
      )}
    </>
  );
};

export default Form;
