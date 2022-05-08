import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Stack,
  Heading,
  Container,
  Box,
  Text,
  SimpleGrid,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Link,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { MdMail } from "react-icons/md";
import { TickerTape } from "react-ts-tradingview-widgets";
import FloatingButton from "../components/FloatingButton";

function Contact() {
  return (
    <div>
      <Head>
        <title>Contact Us - Expert Hub Trade</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <TickerTape colorTheme="dark"></TickerTape>

      {/* <Box
        w="full"
        h={"sm"}
        bg="blue.400"
        bgImage={"url(../assets/images/wavyLines.png)"}
      >
        <Center w="inherit" h="inherit">
          <Box maxW="3xl" textAlign="left" px={{ base: 12, md: 0 }}>
            <Heading
              // fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
              mb={5}
            >
              <Text>Contact Us</Text>
            </Heading>
            <Text fontSize="sm">
              Want to consult about our services or having any troubles? just
              chat us on live or leave an email about your queries to get
              instant solution. Our support team is always glad to resolve your
              queries as soon as they can.
            </Text>
          </Box>
        </Center>
      </Box> */}
      <Container maxW={"6xl"} mb={20}>
        <SimpleGrid
          columns={{ base: 1, xl: 1 }}
          spacing={"20"}
          mt={16}
          w="inherit"
          mx={"auto"}
        >
          <Stack
            spacing={4}
            mx={"auto"}
            w={{ base: "full", md: "80%" }}
            py={12}
          >
            <Box
              rounded={"md"}
              bg={useColorModeValue("white", "gray.700")}
              // boxShadow={"lg"}
              w={{ base: "100%", md: "100%" }}
              p={8}
            >
              <form>
                <Stack spacing={4}>
                  <Box textAlign="center">
                    <Heading
                      // fontWeight={600}
                      fontSize={{ base: "3xl" }}
                      lineHeight={"110%"}
                    >
                      <Text>Leave a message</Text>
                    </Heading>
                    <Flex
                      gap={2}
                      mt={6}
                      bg="gray.200"
                      w="fit-content"
                      mx="auto"
                      mb={10}
                      p={3}
                      rounded="full"
                      justifyContent="center"
                    >
                      <MdMail size={25} />
                      <Link>support@experthubtrades.com</Link>
                    </Flex>
                  </Box>
                  <FormControl id="email">
                    <FormLabel fontWeight="normal">Full Name</FormLabel>
                    <Input type="text" p={"6"} id="name" name="name" />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel fontWeight="normal">Email address</FormLabel>
                    <Input type="email" p={"6"} id="email" name="email" />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel fontWeight="normal">Message</FormLabel>
                    <Textarea type="text" p={6} id="message" name="message" />
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      fontWeight="normal"
                      type="submit"
                      mt={6}
                      p={6}
                      // h={10}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>

      <FloatingButton />
      <Footer />
    </div>
  );
}

export default Contact;
