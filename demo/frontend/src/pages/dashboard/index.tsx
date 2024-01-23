import { FC, useState } from "react";

import Sidebar from "@/components/sidebar";

import styles from "./styles.module.scss";
import Form from "@/components/form";
import Result from "@/components/result";
import Header from "@/components/header";

const Dashboard = () => {
  const [l2ResultValue, setL2ResultValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.main}>
          <Form
            setL2ResultValue={setL2ResultValue}
            setLoading={setLoading}
            loading={loading}
          />
          <Result l2ResultValue={l2ResultValue} loading={loading} />
        </div>
      </div>
      <Sidebar l2Value={l2ResultValue} />
    </div>
  );
};

export default Dashboard;
