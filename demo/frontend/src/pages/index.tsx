import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

import Button from "@/components/UI/button";
import TextInput from "@/components/UI/input";

import styles from "./styles.module.scss";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleEmailChange = (e: FormEvent) => {
    e.preventDefault();

    if (email === "admin" && password === "admin") {
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials", {
        duration: 4000,
        position: "top-right",
        style: {
          fontSize: "1.5rem",
        }
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Image src="/metaLogo.svg" alt="icon" width={140} height={60} />
      <p>Log in or create a Meta account</p>
      <form onSubmit={handleEmailChange} id="login">
        <TextInput placeholder="Email" value={email} setValue={setEmail} />
        <TextInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <Button form="login">Log in</Button>
      </form>
    </div>
  );
}
