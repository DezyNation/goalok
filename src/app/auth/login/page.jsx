"use client"
import React, { useState, useEffect } from 'react'
import {
    Box,
    VStack,
    HStack,
    Text,
    Image,
    Stack,
    Input,
    Button,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightElement,
    useToast,
    Checkbox
} from '@chakra-ui/react'
import { BsEye, BsEyeSlash, BsGoogle } from 'react-icons/bs'
import { useFormik } from 'formik'
import Link from 'next/link'

const Login = () => {
    const Toast = useToast({ position: 'top-right' })
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const Formik = useFormik({
        initialValues: {
            identifier: "",
            password: ""
        },
        onSubmit: values => {
            if (!values.identifier || !values.password) {
                Toast({
                    status: "warning",
                    description: "All fields are mandatory"
                })
                return
            }
            setIsLoading(true)
            setTimeout(() => {
                Toast({ description: "Welcome" })
                setIsLoading(false)
                return
                window.location.assign("/dashboard")
            }, 1000);
        }
    })

    return (
        <>
            <HStack w={'full'} h={'100vh'}>
                <Box
                    flex={1}
                    h={'full'}
                    bgImage={'https://i.pinimg.com/736x/6d/a5/19/6da51985c25891ba968a0a3b6f663ab7.jpg'}
                    bgSize={'cover'}
                    bgRepeat={'no-repeat'}
                >
                    <VStack
                        w={'full'}
                        h={'full'}
                        // bg={'rgba(6,15,190,0.5)'}
                        bg={'rgba(0,0,0,0.55)'}
                        p={16} justifyContent={'center'}
                    >
                        <Text className='messiri' fontSize={'2xl'} color={'#FFF'}>
                            "Books are the basis;
                            purity is the force;
                            preaching is the essence;
                            utility is the principle."
                        </Text>
                        <HStack w={'full'} justifyContent={'flex-end'} py={12}>
                            <Box>
                                <Text
                                    color={'#FFF'}
                                    fontWeight={'semibold'}
                                    fontSize={'xl'}
                                >
                                    A.C. Bhaktivedanta Swami
                                </Text>
                                <Text
                                    color={'#FFF'}
                                    fontSize={'md'}
                                >
                                    Founder Acharya, <br />
                                    International Society for Krishna Consciousness
                                </Text>
                            </Box>
                        </HStack>
                    </VStack>
                </Box>
                <VStack
                    flex={1}
                    h={'full'}
                    p={16}
                    justifyContent={'center'}>
                    <Text>
                        Welcome Back
                    </Text>
                    <Text className='messiri' fontSize={'4xl'}>
                        Continue Your Journey
                    </Text>

                    <VStack pt={16} pb={8} gap={12}>
                        <FormControl w={'sm'}>
                            <FormLabel>
                                Username
                            </FormLabel>
                            <Input
                                focusBorderColor='black'
                                placeholder='Your Username'
                                variant={'flushed'}
                                name={'identifier'}
                                onChange={Formik.handleChange}
                            />
                        </FormControl>
                        <FormControl w={'sm'}>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    focusBorderColor='black'
                                    placeholder='Your Password'
                                    variant={'flushed'}
                                    name={'password'}
                                    onChange={Formik.handleChange}
                                    type={passwordVisible ? "text" : 'password'}
                                />
                                <InputRightElement
                                    children={passwordVisible ? <BsEyeSlash /> : <BsEye />}
                                    cursor={'pointer'}
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                />
                            </InputGroup>
                            <HStack py={4} justifyContent={'space-between'}>
                                <HStack>
                                    <Checkbox color={'teal.700'} >Remember Me</Checkbox>
                                </HStack>
                                <Link href={'#'}>
                                    <Text
                                        fontSize={'xs'} fontWeight={'semibold'}
                                        color={'#AA77FF'}>Forgot Password</Text>
                                </Link>
                            </HStack>
                        </FormControl>
                        <VStack gap={4}>
                            <Button
                                w={'sm'}
                                isLoading={isLoading}
                                colorScheme='blackAlpha'
                                bg={'black'}
                                onClick={Formik.handleSubmit}
                            >
                                Login
                            </Button>
                            <Button
                                w={'sm'}
                                isLoading={isLoading}
                                border={'1px'}
                                bg={'azure'} borderColor={'aqua'}
                                onClick={Formik.handleSubmit}
                                leftIcon={<BsGoogle />}
                                iconSpacing={6}
                            >
                                Continue with Google
                            </Button>
                        </VStack>
                    </VStack>

                    <Box w={'sm'} padding={'.5px'} bg={'teal.100'}></Box>

                    <Box pt={8}>
                        <Link href={'#'}>
                            <Text
                                color={'teal.500'}
                                fontSize={'12'}
                                textAlign={'center'}
                                pb={2}
                            >
                                Or
                            </Text>
                            <Text fontWeight={'semibold'} color={'black'}>
                                Register a New Account
                            </Text>
                        </Link>
                    </Box>
                </VStack>
            </HStack>
        </>
    )
}

export default Login