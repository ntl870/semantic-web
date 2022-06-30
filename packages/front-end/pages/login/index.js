import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.isAuth) {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("user_id", data.user_id);
      }
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // simple login form with chakra
    <>
      <Wrapper headerBtnText="Register">
        <div
          style={{
            paddingTop: "3rem",
            paddingLeft: "30rem",
            paddingRight: "30rem",
          }}
        >
          <Input
            marginBottom="5"
            placeholder="Email"
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
          <Input
            marginBottom="5"
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <Button variant="solid" colorScheme="teal" onClick={login}>
            Login
          </Button>
        </div>
      </Wrapper>
    </>
  );
};

export default LoginPage;
