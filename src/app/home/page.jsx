"use client";
import Navbar from "@/components/global/Navbar";
import {
  Stack,
  Box,
  Text,
  Button,
  Image,
  HStack,
  Hide,
  VStack,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsArrowRight, BsStarFill, BsYoutube } from "react-icons/bs";
import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import SwiperSlide from "../../components/home/SwiperSlide";
import Footer from "../../components/global/Footer";

register({
  effect: "coverflow",
});

export default function HomePage() {
  const swiperElRef = useRef(null);

  useEffect(() => {
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {
      console.log("slide changed");
    });
  }, []);

  return (
    <>
      <Navbar theme={"gradient"} />
      <Stack
        w={"full"}
        h={"100vh"}
        bgImage={"/hero.png"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPos={"center"}
      >
        <Box
          pos={"absolute"}
          top={0}
          left={0}
          width={"full"}
          h={"100vh"}
          bgImage={"linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))"}
        >
          <Box
            w={["90%", "82.5%"]}
            p={[4, 8, 16]}
            pos={"absolute"}
            top={0}
            left={0}
            right={0}
            mx={"auto"}
          >
            <Box w={["full", "max-content"]}>
              <Text
                mt={[24, 24, 48]}
                marginBottom={"-4"}
                fontSize={["lg", "2xl"]}
                color={"#FFF"}
              >
                Your Quest For
              </Text>
              <Text
                fontSize={["6xl", "8xl", "9xl"]}
                className="messiri"
                pb={0}
                color={"#FFF"}
                mt={[4, 0]}
              >
                Answers
              </Text>
              <HStack
                w={"full"}
                justifyContent={"flex-end"}
                marginTop={["-4", "-12"]}
              >
                <Box h={"0.25"} bgColor={"#FFF"} w={["35%", "70%"]}></Box>
                <Text flex={1} fontSize={["lg", "2xl"]} color={"#FFF"}>
                  Ends Here
                </Text>
              </HStack>
              <HStack gap={6}>
                <Link href={"/auth/login?intent=register"}>
                  <Button
                    className="messiri"
                    color={"#FFF"}
                    rounded={"full"}
                    variant={"outline"}
                    colorScheme="whiteAlpha"
                    mt={8}
                    rightIcon={<BsArrowRight />}
                  >
                    Register Now
                  </Button>
                </Link>
                <Link href={"/auth/login?intent=login"}>
                  <Button
                    className="messiri"
                    rounded={"full"}
                    colorScheme="yellow"
                    mt={8}
                  >
                    Login Now
                  </Button>
                </Link>
              </HStack>
            </Box>
          </Box>

          {/* <Box
            pos={"absolute"}
            w={["full", "xs"]}
            bottom={0}
            right={0}
            p={[4, 8]}
          >
            <Text className="messiri" color={"#FFF"} fontSize={["xl", "2xl"]}>
              Sagar Patel
            </Text>
            <Text color={"#FFF"} marginTop={"-1"} fontSize={"sm"}>
              New Delhi
            </Text>
            <HStack color={"#FFF"} gap={1} py={2}>
              <BsStarFill size={10} />
              <BsStarFill size={10} />
              <BsStarFill size={10} />
              <BsStarFill size={10} />
              <BsStarFill size={10} />
            </HStack>
            <Text fontSize={"xs"} color={"#FAFAFACF"}>
              Attending the Bhagavad Gita sessions opened my mind and heart to a
              new perspective. Its profound philosophy provided me with a
              framework to understand the nature of suffering and the means to
              transcend it... &nbsp;&nbsp;
              <span style={{ color: "#FFD93D" }}>Read More</span>
            </Text>
          </Box> */}
        </Box>
      </Stack>

      <Box p={[4, 8, 16]}>
        <Stack
          pos={"relative"}
          direction={["column", "row"]}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Hide above="md">
            <Text>ABOUT US</Text>
            <Text
              fontSize={"4xl"}
              fontWeight={"semibold"}
              color={"#FFF"}
              className="messiri"
            >
              Krishna Consciousness Society
            </Text>
          </Hide>

          <Box w={["full", "50%"]} h={"inherit"}>
            <Image src="/group.jpg" />
          </Box>

          <Box w={["full", "45%"]} h={"inherit"}>
            <Hide below="md">
              <Text>ABOUT US</Text>
              <Text
                fontSize={"4xl"}
                fontWeight={"semibold"}
                className="messiri"
              >
                Krishna Consciousness Society
              </Text>
            </Hide>
            <br />
            <br />
            <Text>
              We are a team of 150 devoted individuals, passionately committed
              to advance Srila Prabhupada's timeless mission of disseminating
              Krishna consciousness throughout the world. Our team upholds an
              unwavering commitment to preserving the purity of this profound
              spiritual practice, embracing the values of dedication, surrender,
              and humility. <br /><br />
              With a steadfast focus on following Srila Prabhupada's teachings,
              our team stands united in the shared goal of spreading the essence
              of Krishna consciousness globally. Join us on this transformative
              journey as we ardently carry forward the legacy of Srila
              Prabhupada with a heart full of devotion and a spirit of selfless
              service.
            </Text>
            <br />
            <br />
            <Button
              rounded={"full"}
              colorScheme={"yellow"}
              as={"a"}
              href={"/team"}
              target="_blank"
              fontWeight={"medium"}
            >
              Meet Our Team
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box
        p={[4, 8, 16]}
        bgImage={"/gsdprabhuji.jpg"}
        bgAttachment={"fixed"}
        bgPos={"top"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        pos={"relative"}
        _after={{
          content: '""',
          pos: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgColor: "blackAlpha.800",
        }}
      >
        <Stack
          pos={"relative"}
          direction={["column", "row"]}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          zIndex={90}
        >
          <Hide above="md">
            <Text
              fontSize={"4xl"}
              fontWeight={"semibold"}
              color={"#FFF"}
              className="messiri"
            >
              H.G. Gauranga Sundar Prabhu Ji's Sessions
            </Text>
          </Hide>

          {/* YouTube videos swiper slider */}
          <Box w={["full", "50%"]} h={"inherit"}>
            <swiper-container
              ref={swiperElRef}
              slides-per-view="1"
              navigation="true"
              pagination="true"
            >
              <swiper-slide>
                <SwiperSlide
                  img={"https://i.ytimg.com/vi/CrRFoCCAvCk/hqdefault.jpg"}
                  title={"why krishna is complete god?"}
                  link={"https://www.youtube.com/watch?v=CrRFoCCAvCk&t"}
                />
              </swiper-slide>
              <swiper-slide>
                <SwiperSlide
                  img={"https://i.ytimg.com/vi/dER14M0gBus/hqdefault.jpg"}
                  title={"how to get close to god?"}
                  link={"https://www.youtube.com/watch?v=dER14M0gBus"}
                />
              </swiper-slide>
              <swiper-slide>
                <SwiperSlide
                  img={"https://i.ytimg.com/vi/QtjAlA6fek4/hqdefault.jpg"}
                  title={"the real suicide?"}
                  link={"https://www.youtube.com/watch?v=QtjAlA6fek4"}
                />
              </swiper-slide>
            </swiper-container>
          </Box>

          {/* HG Gauranga Sundar Das Prabhuji */}
          <Box w={["full", "45%"]}>
            <Hide below="md">
              <Text
                fontSize={"4xl"}
                fontWeight={"semibold"}
                color={"#FFF"}
                className="messiri"
              >
                H.G. Gauranga Sundar Prabhu Ji's Sessions
              </Text>
            </Hide>
            <br />
            <br />
            <Text color={"#FFF"}>
              Taste the nector of Krishna's pastimes from a bonafide Shiksha
              Guru - His Grace Gauranga Sundar Prabhu Ji. <br />
              Watch the sessions on YouTube and relish the pure nectar of the
              most confidential or real knowledge based on authentic scriptures
              like Bhagavad Gita, Śrīmad-Bhāgavatam, Caitanya-caritāmṛta and
              many more!
            </Text>
            <br />
            <br />
            <Button
              rounded={"full"}
              colorScheme={"red"}
              leftIcon={<BsYoutube />}
              as={"a"}
              href={"https://www.youtube.com/@IskconInc"}
              target="_blank"
            >
              YouTube Channel
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box p={[4, 8, 16]}>
        <Stack
          pos={"relative"}
          direction={["column", "row"]}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box w={["full", "50%"]}>
            <Text>LET US RESHAPE</Text>
            <Text fontSize={"4xl"} fontWeight={"semibold"} className="messiri">
              Agriculture, Dairy, Education & Spirituality
            </Text>
            <br />
            <br />
            <Text>
              Have you ever felt yourself stuck in your hectic lifestyle? <br />
              Waking up in the morning then rushing to office, getting paid
              peanuts even after working relentlessly, then coming back to home
              and consume highly adulterated food items in dinner. Does this
              endless loop of daily routine not seem to end? <br />
              <br />
              <strong>
                Why not revive our Vedic ways of life? <br />
                How about a place where:{" "}
              </strong>
              <br />
              <br />
              • Agriculture will be done completely organically <br />
              • You will learn and become what inspires you the most <br />
              • You will drink milk of cows who eat healthy fodder, not
              polyethenes! <br />
              • You will have time to rejuvenate yourself spiritually <br />
            </Text>
            <br />
            <HStack spacing={6} py={6}>
              <Text>
                <i>Join us in this mission</i>
              </Text>
              <Button
                rounded={"full"}
                colorScheme={"yellow"}
                as={"a"}
                href={"#"}
                target="_blank"
                fontWeight={"medium"}
              >
                Learn More
              </Button>
            </HStack>
          </Box>
          <Box w={["full", "45%"]}>
            <HStack flexWrap={"wrap"}>
              <VStack>
                <Image
                  w={["40vw", "64"]}
                  src="/farmer.png"
                  rounded={12}
                  boxShadow={"lg"}
                  transition={"all .3s ease"}
                  cursor={"pointer"}
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                />
                <Image
                  w={["40vw", "64"]}
                  src="/teacher.png"
                  rounded={12}
                  boxShadow={"lg"}
                  transition={"all .3s ease"}
                  cursor={"pointer"}
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                />
              </VStack>
              <VStack>
                <Image
                  w={["40vw", "64"]}
                  src="/cow-kid.png"
                  rounded={12}
                  boxShadow={"lg"}
                  transition={"all .3s ease"}
                  cursor={"pointer"}
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                />
                <Image
                  w={["40vw", "64"]}
                  src="/monks.png"
                  rounded={12}
                  boxShadow={"lg"}
                  transition={"all .3s ease"}
                  cursor={"pointer"}
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                />
              </VStack>
            </HStack>
          </Box>
        </Stack>
      </Box>

      <Box
        p={[4, 8, 16]}
        bgImage={"/newsletterbg.avif"}
        bgAttachment={"fixed"}
        pos={"relative"}
        _after={{
          content: '""',
          pos: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgColor: "whiteAlpha.800",
        }}
      >
        <VStack
          w={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          pos={"relative"}
          zIndex={90}
        >
          <Text
            fontSize={"4xl"}
            fontWeight={"semibold"}
            className="messiri"
            textAlign={"center"}
          >
            Subscribe To Our Newsletter
          </Text>
          <Stack
            direction={["column", "row"]}
            w={["full", "xl"]}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Input
              bgColor={"#fff"}
              rounded={"full"}
              placeholder="Enter your email ID"
            />
            <Button colorScheme="orange" fontWeight={"medium"} rounded={"full"}>
              Subscribe
            </Button>
          </Stack>
        </VStack>
      </Box>
      <Footer />
    </>
  );
}
