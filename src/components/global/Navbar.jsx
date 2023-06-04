'use client'
import React from 'react'
import {
    Box,
    Text,
    Stack,
    HStack,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    DrawerCloseButton,
    Container,
    Spacer
} from '@chakra-ui/react'

const Navbar = () => {
    return (
        <>
            <Box
                pos={'fixed'}
                top={0} left={0}
                right={0} zIndex={9999}
                p={[4, 6]}
            >
                    <HStack w={['full', 'full', '80%']} mx={'auto'} color={'#FFF'} gap={[4, 8, 16]}>
                        <Text cursor={'pointer'} className='raleway nav-link'>Counselling</Text>
                        <Text cursor={'pointer'} className='raleway nav-link'>Books</Text>
                        <Text cursor={'pointer'} className='raleway nav-link'>Sessions</Text>
                        <Spacer />
                        <Text cursor={'pointer'} className='messiri nav-link' fontSize={['md', 'lg']}>ISKCON Inc.</Text>
                        <Spacer />
                        <Text cursor={'pointer'} className='raleway nav-link'>Shop</Text>
                        <Text cursor={'pointer'} className='raleway nav-link'>Projects</Text>
                        <Text cursor={'pointer'} className='raleway nav-link'>Donations</Text>
                    </HStack>
            </Box>
        </>
    )
}

export default Navbar