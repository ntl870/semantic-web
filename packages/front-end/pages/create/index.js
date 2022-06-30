import Wrapper from "../../components/Wrapper";
import { Input, Select, Flex, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Web3Storage } from "web3.storage";
import axios from "axios";
import { useRouter } from "next/router";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRlM2M2YWRGNjU5ZUQ1ZDkyNWFjYzJjZWVmNTM1QmQ1Nzk5NDBEZmEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTY0OTEwMDI0NTksIm5hbWUiOiJzZW1hbnRpYy13ZWIifQ.cF4rPGbf3xGWaEOthkPcSa1-ICj1lsc2X_jN0x0bn6w";

const storage = new Web3Storage({ token: accessToken });

const CreatePage = () => {
  const [selectedFiled, setSelectedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    description: "",
  });

  const router = useRouter();

  const createCertificate = async () => {
    try {
      setLoading(true);
      const certificate_hash = await storage.put([selectedFiled]);
      await axios.post("http://localhost:8000/create", {
        name: inputs.name,
        category: inputs.category,
        description: inputs.description,
        certificate_hash,
        file_name: selectedFiled.name,
        user_id: Number(localStorage.getItem("user_id")),
      });
      router.push("/");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Flex
        direction="column"
        border="1px solid #E2E8F0"
        borderRadius={10}
        style={{
          marginTop: "3rem",
          marginLeft: "30rem",
          marginRight: "30rem",
          padding: "1rem",
        }}
      >
        <Input
          colorScheme="teal"
          marginBottom="5"
          placeholder="CV name"
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <Select
          placeholder="Select type"
          marginBottom="5"
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
        >
          <option value="Project Manager">Project Manager</option>
          <option value="Scrum Master">Scrum Master</option>
          <option value="Front-End">Front-End</option>
          <option value="Back-End">Back-End</option>
          <option value="Mobile">Mobile</option>
          <option value="Game Development">Game Development</option>
          <option value="Devops">Devops</option>
          <option value="Networking">Networking</option>
          <option value="Hardware">Hardware</option>
        </Select>
        <Textarea
          placeholder="Descriptions"
          marginBottom="5"
          onChange={(e) =>
            setInputs((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <input
          type="file"
          onChange={(e) => setSelectedField(e.target.files[0])}
        />
        <Button marginTop="5" onClick={createCertificate} isLoading={loading}>
          Create
        </Button>
      </Flex>
    </Wrapper>
  );
};

export default CreatePage;
