import { Flex, Button, HStack, chakra, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function Header({ buttonText = "" }) {
  const router = useRouter();
  return (
    <chakra.header id="header" backgroundColor="teal">
      <Flex w="100%" px="6" py="5" align="center" justify="space-between">
        <Text
          fontSize="lg"
          cursor="pointer"
          color="#fff"
          onClick={() => router.push("/")}
        >
          Home
        </Text>
        <HStack as="nav" spacing="5"></HStack>
        <HStack>
          {!buttonText ? (
            <>
              <Link href="/create">
                <Button>
                  <a>Create</a>
                </Button>
              </Link>
              <Button
                onClick={() => {
                  localStorage.clear();
                  router.push("/login");
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <Link href={buttonText.toLowerCase()}>
              <Button>{buttonText}</Button>
            </Link>
          )}
        </HStack>
      </Flex>
    </chakra.header>
  );
}
