import styles from "../styles/Home.module.css";
import { Grid, GridItem, Image, Text, Button, Flex } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Web3Storage } from "web3.storage";
import Link from "next/link";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRlM2M2YWRGNjU5ZUQ1ZDkyNWFjYzJjZWVmNTM1QmQ1Nzk5NDBEZmEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTY0OTEwMDI0NTksIm5hbWUiOiJzZW1hbnRpYy13ZWIifQ.cF4rPGbf3xGWaEOthkPcSa1-ICj1lsc2X_jN0x0bn6w";

const storage = new Web3Storage({ token: accessToken });

export default function Home({ data }) {
  const getImageFromWeb3 = async (item) => {
    return `https://${item.certificate_hash}.ipfs.dweb.link/${item.file_name}`;
  };
  const router = useRouter();
  const [certificate, setCertificate] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("isAuth")) {
      router.push("/login");
    }
  }, []);

  return (
    <Wrapper create>
      <div className={styles.container}>
        <Grid templateColumns="repeat(4, 1fr)" gap={6} marginTop="1rem">
          {data?.map((item) => (
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
                  <Text fontSize="lg" fontWeight="bold">Name: {item.name}</Text>
                  <Text fontSize="lg" fontWeight="bold">Description: {item.description}</Text>
                  <Text fontSize="lg" fontWeight="bold">Specialty: {item.category}</Text>
                </Flex>
                <Image
                  src={`https://${item.avatar_hash}.ipfs.dweb.link/${item.avatar_name}`}
                  // layout="fill"
                  // unoptimized={true}
                  width={40}
                  height={40}
                  marginBottom="1rem"
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
