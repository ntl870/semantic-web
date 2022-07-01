import styles from "../styles/Home.module.css";
import {
  Grid,
  GridItem,
  Image,
  Text,
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState, useLayoutEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home({ data }) {
  const router = useRouter();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
      router.push("/login");
    }
  }, []);

  return (
    <Wrapper create>
      <div className={styles.container}>
        <Select
          placeholder="Select type"
          marginBottom="5"
          onChange={(e) => setFilter(e.target.value)}
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
        <Grid templateColumns="repeat(4, 1fr)" gap={6} marginTop="1rem">
          {data
            ?.filter((item) => {
              return item.category === filter || !filter;
            })
            ?.map((item) => (
              <GridItem
                w="100%"
                h="230"
                bg="teal.300"
                borderRadius={10}
                display="flex"
                flexDirection="column"
                padding="0.5rem"
              >
                <Flex justifyContent="space-between">
                  <Flex direction="column">
                    <Text fontSize="lg" fontWeight="bold">
                      Email: {item.email}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Name: {item.name}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Description: {item.description}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                      Specialty: {item.category}
                    </Text>
                  </Flex>
                  <Image
                    src={`https://${item.avatar_hash}.ipfs.dweb.link/${item.avatar_name}`}
                    width={40}
                    height={40}
                    marginBottom="1rem"
                    cursor="pointer"
                    onClick={() => router.push(`/user/${item.user_id}`)}
                    borderRadius="full"
                  />
                </Flex>
                <Link
                  href={`https://${item.certificate_hash}.ipfs.dweb.link/${item.file_name}`}
                  passHref
                >
                  <Button>CV</Button>
                </Link>
              </GridItem>
            ))}
        </Grid>
      </div>
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  const { data } = await axios.get("http://localhost:8000/certificate");
  return {
    props: {
      data,
    },
  };
}
