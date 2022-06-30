import Header from "./Header";

const Wrapper = ({ children, headerBtnText, create }) => {
  return (
    <div style={{ height: "100%" }}>
      <Header buttonText={headerBtnText} create={create} />
      {children}
    </div>
  );
};

export default Wrapper;
