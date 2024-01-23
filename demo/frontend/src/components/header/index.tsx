import Image from "next/image";

const Header = () => {
  return (
    <div className="headerContainer">
      <Image src={"/metaLogo.svg"} width={100} height={50} alt="logo" />
    </div>
  );
};

export default Header;
