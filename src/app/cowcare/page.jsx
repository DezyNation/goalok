"use client";
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const Toast = useToast({ position: "top-right" });

  const [data, setData] = useState(null);
  const [pin, setPin] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  function fetchData() {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/content-control`)
      .then((res) => {
        setData(res.data?.data?.attributes);
      })
      .catch((err) => {
        Toast({
          status: "error",
          description: "Error while fetching details",
        });
      });
  }

  function updateData(data) {
    if(!pin){
        Toast({
            description: "Please enter PIN"
        })
        return
    }
    axios
      .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cowcare-data`, {
        ...data,
        pin: pin,
      })
      .then((res) => {
        Toast({
          status: "success",
          description: "Data updated",
        });
        fetchData();
      })
      .catch((err) => {
        Toast({
          status: "error",
          description: "Error while fetching details",
        });
      });
  }

  return (
    <>
      <Box p={[8, 16]}>
        <HStack w={"full"}>
          <VStack w={"full"}>
            <Text textAlign={"center"}>Cows Fed</Text>
            <Editable
              defaultValue={data?.cowsFed}
              value={data?.cowsFed}
              onChange={(value) => setData({ ...data, cowsFed: value })}
              w={"full"}
              textAlign={"center"}
              fontSize={["4xl"]}
              fontWeight={"semibold"}
              onSubmit={(value) => updateData({ cowsFed: value })}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </VStack>

          <VStack w={"full"}>
            <Text textAlign={"center"}>Target</Text>
            <Editable
              defaultValue={data?.cowCareTarget}
              value={data?.cowCareTarget}
              onChange={(value) => setData({ ...data, cowCareTarget: value })}
              w={"full"}
              textAlign={"center"}
              fontSize={["4xl"]}
              fontWeight={"semibold"}
              onSubmit={(value) => updateData({ cowCareTarget: value })}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </VStack>
        </HStack>
        <br />
        <br />
        <br />
        <Box mt={[64, 0]}>
          <HStack justifyContent={"center"}>
            <Image
              src={"/cowcare/plus.png"}
              boxSize={20}
              cursor={"pointer"}
              onClick={() =>
                updateData({ cowCareTarget: Number(data?.cowCareTarget) + 100 })
              }
            />
          </HStack>
          <Box maxW={"xs"} mx={"auto"}>
            <HStack justifyContent={"space-between"} py={8}>
              <Image
                src={"/cowcare/up.png"}
                boxSize={20}
                cursor={"pointer"}
                onClick={() =>
                  updateData({ cowsFed: Number(data?.cowsFed) + 1 })
                }
              />
              <Image
                src={"/cowcare/down.png"}
                boxSize={20}
                cursor={"pointer"}
                onClick={() =>
                  updateData({ cowsFed: Number(data?.cowsFed) - 1 })
                }
              />
            </HStack>
          </Box>
          <HStack justifyContent={"center"}>
            <Image
              src={"/cowcare/minus.png"}
              boxSize={20}
              cursor={"pointer"}
              onClick={() =>
                updateData({ cowCareTarget: Number(data?.cowCareTarget) - 100 })
              }
            />
          </HStack>
        </Box>
        <br />
        <br />
        <br />
        <HStack justifyContent={"center"}>
          <Input
            maxW={"xs"}
            placeholder="Your Secret PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            textAlign={"center"}
          />
        </HStack>
      </Box>
    </>
  );
};

export default page;
