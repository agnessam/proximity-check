import { Search2Icon } from "@chakra-ui/icons";
import { FaRegHospital } from "react-icons/fa6";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { LuFuel } from "react-icons/lu";

import {
  Button,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useRef } from "react";
import { FaFilter } from "react-icons/fa";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
        />
      )}
    </div>
  );
};

const HeaderSection = () => (
  <Stack bg="red" h="66px" maxW="100%" pointerEvents="auto" />
);

const QuerySection = () => (
  <VStack h="11vh" gap="16px">
    <InputGroup w="30%" pointerEvents="auto">
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.300" />
      </InputLeftElement>
      <Input placeholder="Enter an apartment address" variant="filled" />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={() => {
            console.log("hihi");
          }}
        >
          <FaFilter />

          {/* {show ? "Hide" : "Show"} */}
        </Button>
      </InputRightElement>
    </InputGroup>
    <HStack>
      <Button
        leftIcon={<FaRegHospital />}
        pointerEvents="auto"
        colorScheme="teal"
        variant="solid"
        borderRadius="20px"
      >
        Hospital
      </Button>
      <Button
        leftIcon={<MdOutlineLocalGroceryStore />}
        colorScheme="teal"
        variant="solid"
        borderRadius="20px"
      >
        Grocery
      </Button>
      <Button
        leftIcon={<LuFuel />}
        colorScheme="teal"
        variant="solid"
        borderRadius="20px"
      >
        Gas station
      </Button>
      <Button
        leftIcon={<FaRegHospital />}
        pointerEvents="auto"
        colorScheme="teal"
        variant="solid"
        borderRadius="20px"
      >
        Hospital
      </Button>
      <Button
        leftIcon={<FaRegHospital />}
        pointerEvents="auto"
        colorScheme="teal"
        variant="solid"
        borderRadius="20px"
      >
        Hospital
      </Button>
    </HStack>
  </VStack>
);

const ContentSection = () => (
  <HStack
    bg="pink"
    h="calc(100vh - 67px - 11vh - 32px)"
    maxW="100%"
    justifyContent="space-between"
  >
    <Flex />
    <Flex w="30%" height="100%" bg="grey" />
  </HStack>
);

const IndexPage = () => {
  return (
    <>
      <Container maxW="100vw" bg="blue" centerContent>
        <Map />
        <Stack
          pointerEvents="none"
          //   bg="white"
          flex="1"
          w="100%"
          pos="absolute"
          top="0"
          left="0"
          gap="16px"
        >
          <HeaderSection />
          <QuerySection />
          <ContentSection />
        </Stack>
      </Container>
    </>
  );
};

export default IndexPage;
