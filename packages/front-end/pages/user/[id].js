import { Flex, Input, Text, Textarea, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Wrapper from "../../components/Wrapper";
import axios from "axios";

const UserPage = ({ data }) => {
  console.log(data);
  return (
    <Wrapper>
      <Flex
        border="1px solid #E2E8F0"
        borderRadius={10}
        direction="row"
        padding="15rem"
        justifyContent="space-between"
      >
        <Flex direction="column" padding="1rem" flexGrow={1}>
          <Flex direction="row" alignItems="center" marginBottom="1rem">
            <Text fontSize="lg">Name: &nbsp;</Text>
            <Text fontWeight={800}>{data[0].name}</Text>
          </Flex>
          <Flex direction="row" alignItems="center" marginBottom="1rem">
            <Text fontSize="lg">Email: &nbsp;</Text>
            <Text fontWeight={800}>{data[0].email}</Text>
          </Flex>
          <Flex direction="column" marginBottom="1rem">
            <Text fontSize="lg">About</Text>
            <Textarea isReadOnly>{data[0].about}</Textarea>
          </Flex>
          <Button onClick={() => (window.location = `mailto:${data[0].email}`)}>
            Contact
          </Button>
        </Flex>

        <Flex>
          <Image
            src={`https://${data[0].avatar_hash}.ipfs.dweb.link/${data[0].avatar_name}`}
            width={300}
            height={300}
            marginBottom="1rem"
            style={{ borderRadius: "50%" }}
            loader={() =>
              `https://${data[0].avatar_hash}.ipfs.dweb.link/${data[0].avatar_name}`
            }
          />
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default UserPage;

export async function getServerSideProps(context) {
  // get current query
  const { query } = context;
  const { data } = await axios.get(`http://localhost:8000/user?id=${query.id}`);
  //   console.log(data);
  return {
    props: {
      data,
    },
  };
}
