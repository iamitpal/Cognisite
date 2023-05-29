import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Spinner,
  ListItem,
  OrderedList,
  Text,
  useToast,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addData, getData } from "../Redux/action"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"

export const Home = () => {
  const [text, setText] = useState("")
  const [load, setLoad] = useState(false)
  const toast = useToast()
  const { task, isLoading } = useSelector((store) => store)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // console.log(task)

  useEffect(() => {
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
    }, 1000)
    dispatch(getData())
  }, [dispatch])

  const handleSubmit = (e) => {
    // console.log("Hello")
    e.preventDefault()
    if (text) {
      dispatch(addData({ title: text }))
      setText("")
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("auth")
    toast({
      position: "top-center",
      title: "Logout Success.",
      status: "success",
      duration: 1000,
      isClosable: true,
    })
    navigate("/")
  }

  return (
    <Box>
      {load ? (
        <Loading />
      ) : (
        <Box>
          <Button
            color="white"
            fontWeight="bold"
            borderRadius="md"
            bgGradient="linear(to-r, #7928CA, #FF0480)"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
            }}
            onClick={handleLogout}
            margin={4}
            ml={1200}
          >
            Logout
          </Button>
          <Box
            // border="1px solid gray"
            width="40%"
            p="2rem"
            margin="auto"
            boxShadow="royalblue 0px 3px 8px"
            borderRadius="5px"
            as="form"
            onSubmit={(e) => handleSubmit(e)}
            mt={2}
          >
            <Heading
              fontWeight="extrabold"
              bgGradient="linear(to-l, #7928CA, #FF0480)"
              bgClip="text"
            >
              Taskify
            </Heading>
            <Input
              onChange={(e) => setText(e.target.value)}
              placeholder="Add Task"
              size="md"
              width={80}
              mt={10}
            />

            <Button
              bgGradient="linear(to-r, #7928CA, #FF0480)"
              _hover={{
                bgGradient: "linear(to-r, red.500, yellow.500)",
              }}
              type="submit"
              color="white"
              size="md"
              ml={4}
            >
              {isLoading ? <Spinner /> : "Add TAsk"}
            </Button>

            <OrderedList mt="1em">
              {task.length > 0 &&
                task.map((el) => (
                  <ListItem
                    fontWeight={"600"}
                    textAlign="left"
                    fontSize={"20px"}
                    key={el.id}
                  >
                    {el.title}
                  </ListItem>
                ))}
            </OrderedList>
          </Box>
        </Box>
      )}
    </Box>
  )
}
