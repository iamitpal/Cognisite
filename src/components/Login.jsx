import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import construct from "../construction.jpeg"

export default function Login() {
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const toast = useToast()
  const [user, setUser] = useState([])

  const getdata = async () => {
    return await axios
      .get(`https://mock-7q3a.onrender.com/user`)
      .then((res) => {
        // console.log(res)
        setUser(res.data)
      })
  }

  // console.log(user)

  useEffect(() => {
    getdata()
  }, [])

  const handleLogin = () => {
    const isAuth = user.find(
      (el) => el.mobile === mobile && el.password === password
    )
    if (isAuth) {
      const auth = "success"
      localStorage.setItem("auth", JSON.stringify(auth))
      toast({
        position: "top-center",
        title: "Login Success.",
        status: "success",
        duration: 1000,
        isClosable: true,
      })
      navigate("/home")
    } else {
      toast({
        position: "top-center",
        title: "Login Failed.",
        description: "Invalid Mobile & Password",
        status: "error",
        duration: 1000,
        isClosable: true,
      })
    }
  }

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Login into your account</Heading>
          <FormControl id="email">
            <FormLabel>Registered Mobile Number</FormLabel>
            <Input
              onChange={(e) => setMobile(e.target.value)}
              type="number"
              placeholder="Mobile"
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Link
                style={{ textDecoration: "underline" }}
                to={"/signup"}
                color={"blue.500"}
              >
                Create New Account
              </Link>
            </Stack>
            <Button
              onClick={handleLogin}
              colorScheme={"blue"}
              variant={"solid"}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={construct} />
      </Flex>
    </Stack>
  )
}
