import { FC, useState } from "react";

import styles from "./styles.module.scss";
import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";

interface Props {
  l2ResultValue: string;
  loading?: boolean;
}

const Result: FC<Props> = ({ l2ResultValue, loading }: Props) => {
  const [open, setOpen] = useState(true);

  const featUnderDev = () => {
    toast.loading("Feature under development",{
      duration: 2000,
      position: "top-center",
      style: {
        background: "#1890FF",
        color: "#fff",
      }
    });
  }

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(!open)}>
        <Image
          src="/icons/arrow.svg"
          alt="arrow"
          width={50}
          height={50}
          className={open ? styles.iconOpen : ""}
        />
      </button>
      <div
        className={`${styles.classificationContainer} ${
          open ? styles.open : {}
        }`}
      >
        {/* <div className={styles.classificationBx}>
          <div className={styles.title}>
            <h2>Level 1</h2>
          </div>
          <div className={styles.actions}>
            <button>Incorrect</button>
            <button>
              <Image
                src={"/icons/right_btn.svg"}
                alt="rightBtn"
                width={50}
                height={50}
              />
            </button>
          </div>
        </div> */}
        <div className={styles.classificationBx}>
          <div className={styles.title}>
            {loading ? (
              <div className="loadingContainer">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#1890FF"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              </div>
            ) : (
              <h2>{l2ResultValue ? l2ResultValue : "Level 2"}</h2>
            )}
          </div>
          <div className={styles.actions}>
            <button onClick={featUnderDev}>
              <Image src={"/icons/x.svg"} alt="xBtn" width={50} height={50} />
            </button>
            <button onClick={featUnderDev}>
              <Image
                src={"/icons/check.svg"}
                alt="checkBtn"
                width={50}
                height={50}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
