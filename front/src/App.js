import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import "animate.css";
import {
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Heading,
  TableContainer,
  Image,
} from "@chakra-ui/react";
import "./assets/style.css";

const App = () => {
  const [sensorValue, setSensorValue] = useState([]);
  const socket = io("http://localhost:5000");
  const handleClick = () => {
    const mes = "reset";
    socket.emit("reset", mes);
  };

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("WebSocket connection established");
    });

    socket.on("updateSensorData", (event) => {
      // console.log(event)
      console.log(Object.values(event));
      setSensorValue(Object.values(event));

    });
    
    // console.log(sensorValue)

    socket.on("disconnect", () => {
      console.log("WebSocket connection closed");
    });
    

    return () => {
      socket.disconnect();
    };
  }, []);

  // const data = [
  //   { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  //   { name: "Page B", uv: 500, pv: 2500, amt: 2500 },
  //   { name: "Page C", uv: 600, pv: 2600, amt: 2600 },
  // ];

  const data = sensorValue.map((element, index) => ({
    name: index.toString(),
    
    uv: element[3],
    uv1: element[4],
    uv2: element[5],
  }));
  
  return (
    <div className="main_container">
      <Flex flexDir={"column"} alignItems={"center"}>
        <Flex
          w={"90%"}
          justifyContent={"space-between"}
          gap={"1em"}
          mt="2em"
          className="main_body"
        >
          <Flex
            flexDirection={"column"}
            w="60%"
            className="graph animate__animated animate__fadeInLeft"
            border="2px solid #D02323"
            borderRadius={"10px"}
            p={"1em"}
          >
            <Flex>
              <Heading fontFamily={"inherit"}>Telemetry</Heading>
            </Flex>
            <Flex gap={10} flexWrap={"wrap"}>
              <Box>
                <LineChart width={300} height={200} data={data}>
                  <Line type="monotone" dataKey="uv1" stroke="#d02323" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Altitude",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                </LineChart>
              </Box>
              <Box>
                <LineChart width={300} height={200} data={data}>
                  <Line type="monotone" dataKey="uv" stroke="#d02323" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Voltage",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                </LineChart>
              </Box>
              <Box>
                <LineChart width={300} height={200} data={data}>
                  <Line type="monotone" dataKey="uv2" stroke="#d02323" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "SPEED",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                </LineChart>
              </Box>
              
              
            </Flex>
          </Flex>
          <Flex
            // flexDirection={"column"}
            // w={"40%"}
            // className="pictures animate__animated animate__fadeInRight"
            // border="2px solid #D02323"
            // borderRadius={"10px"}
            // p="1em"
          >
            
          </Flex>
        </Flex>
        <Flex gap={3} m={"1em auto 0 auto"}>
              <Box>
                <Button _hover={{ backgroundColor: "#d02323", color: "white" }}>
                  Initialize
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    const mes = "reset";
                    socket.emit("reset", mes);
                    console.log("ok")
                  }}
                  _hover={{ backgroundColor: "#d02323", color: "white" }}
                >
                  Reset
                </Button>
              </Box>
              <Box>
                <Button _hover={{ backgroundColor: "#d02323", color: "white" }}>
                  Add Plot
                </Button>
              </Box>
            </Flex>
        <Flex
          m={"1em auto 0 auto"}
          className="table animate__animated animate__fadeInDown"
        >
          <TableContainer
            border="2px solid #D02323"
            borderRadius={"10px"}
            className="table-container" 
            maxH="20em"
            overflowY="scroll"
            overflowX={"hidden"}
            
          >
            <Table variant="simple">
              <Thead backgroundColor={"#D02323"}>
                <Tr>
                  <Th color="white">Team ID</Th>
                  <Th color="white">Duration</Th>
                  <Th color="white">Packet</Th>
                  <Th color="white">Voltage</Th>
                  <Th color="white">Altitude</Th>
                  <Th color="white">Speed</Th>
                  <Th color="white">Longitude</Th>
                  <Th color="white">Latitude</Th>
                  <Th color="white">Video Duration</Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                {sensorValue.slice(-1).map((element, index) => (
                    <Tr key={index}>
                      <Td>{element[0]}</Td>
                      <Td>{element[1]}</Td>
                      <Td>{element[2]}</Td>
                      <Td>{element[3]}</Td>
                       <Td>{element[4]}</Td>
                      <Td>{element[5]}</Td>
                      <Td>{element[6]}</Td>
                      <Td>{element[7]}</Td>
                      <Td>{element[8]}</Td>
                      <Td>{element[9]}</Td>
                    </Tr>
                  ))}

                  
                
                
              </Tbody>
            </Table>
          </TableContainer>
          <Flex gap={3} m={"auto 0 auto 20px"}>
              <Box>
                <Button _hover={{ backgroundColor: "#d02323", color: "white" }}>
                  Initialize
                </Button>
              </Box>
              <Box>
                <Button

                  // onClick={handleClick}

                  _hover={{ backgroundColor: "#d02323", color: "white" }}
                >
                  Reset
                </Button>
              </Box>
              <Box>
                <Button _hover={{ backgroundColor: "#d02323", color: "white" }}>
                  Add Plot
                </Button>
              </Box>
            </Flex>
        </Flex>
      </Flex>
      
      {/* <div><button onClick={handleClick}>reset</button></div> */}
    </div>
  );
};

export default App;