"use client";

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  HStack,
  Image,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const Logo = (props) => {
  return (
    <HStack>
      <Image src="/logo.png" boxSize={"12"} />
      <Text fontWeight={"bold"} color={'#FFF'}>Krishna Consciousness Society</Text>
    </HStack>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={"#333"}
      color={"FFF"}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} color={'#FFF'}>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Box as="a" href={"#"}>
              Overview
            </Box>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Box as="a" href={"#"}>
                Features
              </Box>
              <Tag
                size={"sm"}
                bg={useColorModeValue("green.300", "green.800")}
                ml={2}
                color={"white"}
              >
                New
              </Tag>
            </Stack>
            <Box as="a" href={"#"}>
              Tutorials
            </Box>
            <Box as="a" href={"/misc/delete-account"}>
              Delete Account
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Organisation</ListHeader>
            <Box as="a" href={"#"}>
              About Us
            </Box>
            <Box as="a" href={"#"}>
              Press
            </Box>
            <Box as="a" href={"#"}>
              Careers
            </Box>
            <Box as="a" href={"#"}>
              Contact Us
            </Box>
            <Box as="a" href={"#"}>
              Partners
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Important</ListHeader>
            <Box as="a" href={"#"}>
              Cookies Policy
            </Box>
            <Box as="a" href={"/policies/privacy-policy"}>
              Privacy Policy
            </Box>
            <Box as="a" href={"#"}>
              Terms of Service
            </Box>
            <Box as="a" href={"#"}>
              Server Status
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Box as="a" href={"#"}>
              Facebook
            </Box>
            <Box as="a" href={"#"}>
              X (formerly Twitter)
            </Box>
            <Box as="a" href={"#"}>
              Discord
            </Box>
            <Box as="a" href={"#"}>
              Instagram
            </Box>
            <Box as="a" href={"#"}>
              LinkedIn
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"} color={'#FFF'}>
          © {new Date().getFullYear()} Krishna Consciousness Society - All
          rights reserved
        </Text>
      </Box>
    </Box>
  );
}
