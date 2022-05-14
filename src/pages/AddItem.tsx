import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Textarea,
    useToast,
    Container,
    Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProduct } from '../config/marketplace';
import { login } from '../config/near';
import { Product } from '../model';

export default function AddPage() {
    const imageUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Pick<Product, 'description' | 'image' | 'location' | 'name'>>();
    const onSubmit = async data => {
        try {
            await createProduct(data)
            toast({
                title: 'Successful',
                description: "Your product has been added",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: "Something went wrong",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    };
    const toast = useToast()



    // <form onSubmit={handleSubmit(onSubmit)}>
    //     <input type="text" placeholder="name"  />
    //     <input  />
    //     <input  />
    //     <textarea {...register("description", { required: true, maxLength: 1024 })} />
    //     <input type="submit" />
    // </form>
    const [accId, setAccId] = useState("")
    const account = window.walletConnection.account();
    const getAcc = useCallback(async () => {
        if (account.accountId) {
            setAccId(window.walletConnection.account().accountId);
        }
    }, []);
    useEffect(() => {
        getAcc();
    }, [getAcc]);
    if (!accId) {
        return <Container minH={'calc(100vh - 125px)'} maxW={'7xl'}>
            <Stack direction='column' justify={'center'} alignItems='center' h='full' pt={'8'} spacing={4}>
                <Text>To Use Dapp</Text>
                <Text>You Should Connect your Wallet</Text>
                <Button variant="solid" onClick={() => {
                    login()
                }}> CONNECT WALLET</Button>
            </Stack>
        </Container>
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack bgImage={{ md: '', base: imageUrl }} minH={'calc(100vh - 125px)'} direction={{ base: 'column', md: 'row' }}>
                <Flex align={{ base: 'flex-start', md: 'center' }} p={8} flex={1} justify={'center'}>
                    <Stack bgColor={{ md: 'white', base: 'white' }} padding='8' rounded={'md'} spacing={4} w={'full'} maxW={'md'}>
                        <span>
                            <Heading fontSize={'2xl'}>Add Your Project</Heading>
                            <Heading fontSize={'smaller'}>We Build It Together</Heading>
                        </span>
                        <FormControl isRequired isInvalid={!!errors.name} id="name">
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='BorrowGame' {...register("name", { required: true, max: 32, min: 3, maxLength: 16 })} type="text" />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.image} id="image">
                            <FormLabel>Image URL</FormLabel>
                            <Input type="url" placeholder="https://www.example.com/cover.png" {...register("image", { required: true })} />
                        </FormControl>

                        <FormControl isRequired isInvalid={!!errors.location} id="url">
                            <FormLabel>Url of Your Site</FormLabel>
                            <Input type="url" placeholder="https://www.example.com" {...register("location", {})} />
                        </FormControl>

                        <FormControl isInvalid={!!errors.description} isRequired id="description">
                            <FormLabel>Describe Your Project</FormLabel>


                            <Textarea
                                placeholder='Here is a sample placeholder'
                                size='sm'
                                {...register("description", { required: true })}
                                resize={'vertical'}
                            />
                        </FormControl>
                        <Stack spacing={6}>
                            <Button type='submit' isLoading={isSubmitting} colorScheme={'blue'} variant={'solid'}>
                                Add Project
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
                <Flex display={{ base: 'none', md: 'flex' }} flex={1}>
                    <Image
                        alt={'Login Image'}
                        objectFit={'cover'}
                        src={imageUrl}
                    />
                </Flex>
            </Stack>
        </form>
    );
}