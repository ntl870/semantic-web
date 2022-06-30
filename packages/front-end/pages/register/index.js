import { Input, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { Web3Storage } from "web3.storage";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRlM2M2YWRGNjU5ZUQ1ZDkyNWFjYzJjZWVmNTM1QmQ1Nzk5NDBEZmEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTY0OTEwMDI0NTksIm5hbWUiOiJzZW1hbnRpYy13ZWIifQ.cF4rPGbf3xGWaEOthkPcSa1-ICj1lsc2X_jN0x0bn6w";

const storage = new Web3Storage({ token: accessToken });

const RegisterPage = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    try {
      setLoading(true);
      const hash = await storage.put([inputs.avatar]);
      await axios.post("http://localhost:8000/register", {
        email: inputs.email,
        password: inputs.password,
        name: inputs.username,
        avatar_hash: hash,
        avatar_name: inputs.avatar.name,
      });
      router.push("/login");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    // simple login form with chakra
    <>
      <Wrapper headerBtnText="Login">
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
            placeholder="Username"
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                username: e.target.value,
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
          <Input
            marginBottom="5"
            type="file"
            placeholder="Avatar"
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                avatar: e.target.files[0],
              }))
            }
          />
          <Button
            onClick={registerUser}
            variant="solid"
            colorScheme="teal"
            isLoading={loading}
          >
            Register
          </Button>
        </div>
      </Wrapper>
    </>
  );
};

export default RegisterPage;
