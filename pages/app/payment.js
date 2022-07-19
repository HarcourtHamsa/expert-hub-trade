import React, { useRef, useState } from "react";
import Head from "next/head";
import { createClient } from "next-sanity";
import DashboardWrapper from "../../components/app/DashboardWrapper";
import FloatingButton from "../../components/FloatingButton";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Stack,
  Flex,
  Select,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Image from "next/image";
import { FaEthereum, FaBitcoin } from "react-icons/fa";
import { TickerTape, CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
import WithAuth from "../../HOCs/WithAuth";
import { usdt, shiba } from "../../assets/list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import * as emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import helpers from "../../helpers";
import axios from "axios";

const client = createClient({
  projectId: "jxu2d129",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-07-17",
  token: process.env.SANITY_ACCESS_TOKEN,
});

const bitcoinIcon = <Icon as={FaBitcoin} w={16} h={16} color="goldenrod" />;
const ethereumIcon = <Icon as={FaEthereum} w={16} h={16} color="black" />;
const usdtIcon = <Image src={usdt} w={10} h={10} color="white" alt="" />;
const shibaIcon = <Image src={shiba} w={10} h={10} color="white" alt="" />;

// const CRYPRO_PAYMENT_DETAILS = [
//   {
//     id: 1,
//     name: "Bitcoin",
//     address: "1PRRXSt1N63CMh3qWoqKcbf9JAHucmTG2J",
//     icon: <Icon as={FaBitcoin} w={16} h={16} color="goldenrod" />,
//   },

//   {
//     id: 2,
//     name: "Ethereum (ERC20)",
//     address: "0x2a6F9751ed8d478277F569b8d6bc591F9E88Ae6e",
//     icon: <Icon as={FaEthereum} w={16} h={16} color="black" />,
//   },

//   {
//     id: 3,
//     name: " USDT (TRC20)",
//     address: "0x2a6F9751ed8d478277F569b8d6bc591F9E88Ae6e",
//     icon: <Image src={usdt} w={10} h={10} color="white" alt="" />,
//   },

//   {
//     id: 4,
//     name: "Shiba inu",
//     address: "0x2a6F9751ed8d478277F569b8d6bc591F9E88Ae6e",
//     icon: <Image src={shiba} w={10} h={10} color="white" alt="" />,
//   },
// ];

const Card = ({ title, text, icon, notify }) => {
  return (
    <Stack
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      fontWeight="bold"
      // borderWidth="thin"
      //   border={"1px solid"}
      borderColor={useColorModeValue("gray.500", "gray.500")}
      rounded={"lg"}
      bg="-webkit-gradient(linear,left top,left bottom,from(#2b525a),to(#072427))"
    >
      <Flex w={16} h={16} align={"center"} justify={"center"} mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={"bold"} fontSize="sm" color="white">
        {title}
      </Text>
      <Button
        variant="solid"
        colorScheme="blue"
        px={6}
        size="sm"
        w="fit-content"
        fontWeight="medium"
        fontSize="sm"
        color="white"
        onClick={() => {
          navigator.clipboard.writeText(text);
          notify(`${title} address copied`);
        }}
      >
        Copy address
      </Button>
    </Stack>
  );
};

function Payment({ wallet }) {
  const { query } = useRouter();
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  const user = helpers.getUserDetailsFromLocalStorage();
  const amount = query.amount;

  const handleImageUpload = async (values) => {
    const data = new FormData();
    const firstName = user.firstName;
    const file = values.file;

    data.append("file", values.file);
    data.append("upload_preset", "default");
    data.append("cloud_name", "dgn6edv1k");

    console.log("file.....", file);

    await axios
      .post("https://api.cloudinary.com/v1_1/dgn6edv1k/image/upload", data)
      .then(async (data) => {
        console.log(data.data.url);
        setCloudinaryUrl(data.data.url);
      })
      .catch((error) => console.log("error uploading file...", error))
      .finally(async () => {
        const transactionDetails = {
          url: cloudinaryUrl,
          amount: amount,
          method: values.method,
          from: firstName,
        };

        console.log(transactionDetails);
        await helpers.addTransaction(transactionDetails);
        notify("Your payment is being reviewed.");
      });
  };

  const formik = useFormik({
    initialValues: {
      method: "Bitcoin",
    },

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await handleImageUpload(values);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const notify = (msg) =>
    toast(msg, {
      type: "success",
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
    });

  return (
    <div>
      <DashboardWrapper>
        <Head>
          <title>Dashboard - Expert Hub Trade</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer />
        <Heading
          lineHeight={"110%"}
          fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}
          mb={5}
          color="white"
          fontWeight="Bold"
          mt={5}
        >
          <Text>Make Payment</Text>
        </Heading>
        <Text color="white" maxW="3xl" fontWeight="bold">
          Please make your payment of ${query.amount} to any of the crypto
          wallet addresses below. Always verify and confirm you copied the
          wallet address correctly.
        </Text>
        <Box w={"xs"}>
          {/* <p>currency converter</p> */}
          <crypto-converter-widget
            symbol=""
            live=""
            background-color="#2C3034"
            border-radius="0.15rem"
            fiat="bitcoin"
            crypto="tether"
            amount="300"
            decimal-places="2"
            vce-ready=""
          ></crypto-converter-widget>
        </Box>
        {/* <Heading
          lineHeight={"110%"}
          fontSize={{ base: "2xl", sm: "4xl", md: "4xl" }}
          mt={20}
        >
          <Text>Make Payment</Text>
        </Heading>
        <p>
          Please make your payment to any of the crypto wallet addresses below.
          Always verify and confirm you copied the wallet address correctly.
        </p> */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mt={6}>
          {wallet.map((v) => {
            return (
              <Card
                key={v._id}
                icon={
                  v.cryptocurrency === "Bitcoin"
                    ? bitcoinIcon
                    : v.cryptocurrency === "Ethereum"
                    ? ethereumIcon
                    : v.cryptocurrency === "Shiba Inu"
                    ? shibaIcon
                    : v.cryptocurrency === "USDT (TRC20)"
                    ? usdtIcon
                    : null
                }
                title={v.cryptocurrency}
                text={v.address}
                notify={notify}
              />
            );
          })}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
          <Box
            // boxShadow={"lg"}
            w={{ base: "100%" }}
            p={8}
            // borderWidth="thin"
            borderColor={useColorModeValue("gray.500", "gray.500")}
            rounded={"md"}
            bg="-webkit-gradient(linear,left top,left bottom,from(#2b525a),to(#072427))"
            // color="white"
            fontSize="sm"
            h="fit-content"
            // mt={16}
          >
            <form ref={form} onSubmit={formik.handleSubmit}>
              <Stack spacing={6}>
                <FormControl id="email">
                  <FormLabel fontWeight="bold" isRequired color="white">
                    Upload proof of payment
                  </FormLabel>
                  <Input
                    type="file"
                    p={"6"}
                    name="image"
                    // value={formik.values.image}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                </FormControl>
                <FormControl mb={6} isRequired>
                  <FormLabel color="white">Payment Mode Used:</FormLabel>
                  <Select
                    placeholder=""
                    color="black"
                    name="method"
                    value={formik.values.method}
                    onChange={formik.handleChange}
                  >
                    <option value={"Bitcoin"} key={"Bitcoin"}>
                      Bitcoin
                    </option>

                    <option value={"Ethereum"} key={"Ethereum"}>
                      Ethereum
                    </option>

                    <option value={"USDT"} key={"USDT"}>
                      USDT
                    </option>

                    <option value={"Shiba Inu"} key={"Shiba Inu"}>
                      Shiba Inu
                    </option>
                  </Select>
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    fontWeight="bold"
                    isLoading={isLoading}
                    type="submit"
                    mt={6}
                    p={6}
                    // h={10}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Submit Receipt
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </SimpleGrid>
      </DashboardWrapper>

      <FloatingButton />
    </div>
  );
}

export default WithAuth(Payment);

export async function getStaticProps() {
  const wallet = await client.fetch(`*[_type == "wallet"]`);

  return {
    props: {
      wallet,
    },
  };
}
