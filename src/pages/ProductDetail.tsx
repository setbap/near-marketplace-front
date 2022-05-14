import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
    HStack,
    Tag,
    Select,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { donateProduct, getProduct } from '../config/marketplace';
import { login } from '../config/near';
import { Product } from '../model';


export default function DetailProduct() {
    const [value, setValue] = useState("")
    const toast = useToast()
    const handleChange = (event: any) => {
        setValue(event.target.value)
    }
    const account = window.walletConnection.account();
    const [products, setProducts] = useState<Product>(null);
    let params = useParams();

    const fetchProduct = useCallback(async () => {
        if (account.accountId) {
            const products = await getProduct({ id: params.pid });
            setProducts(products);
        }
    }, []);
    useEffect(() => {
        fetchProduct();
    }, []);

    if (!account.id) {
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

    return !products ? (
        <Container minH={'calc(100vh - 125px)'} maxW={'7xl'}>
            <Stack direction='row' justify={'center'} alignItems='center' h='full' pt={'8'} spacing={4}>
                <Spinner size='xl' />
                <Text>Loading</Text>
            </Stack>
        </Container>
    ) : (
        <Container minH={'calc(100vh - 125px)'} maxW={'7xl'}>
            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                pt='4'
            >
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'product image'}
                        src={products && products?.image}
                        fit={'cover'}
                        align={'center'}
                        w={'100%'}
                        h={{ base: '100%', sm: '400px', lg: '500px' }}
                    />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                    <Box as={'header'}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                            {products?.name}
                        </Heading>

                    </Box>

                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={'column'}
                        divider={
                            <StackDivider
                                borderColor={'gray.200'}
                            />
                        }>
                        <VStack textAlign={'start'} spacing={{ base: 4, sm: 6 }}>
                            <Text
                                textAlign={'start'}
                                color={'gray.500'}
                                fontSize={'2xl'}
                                fontWeight={'300'}>
                                {products.description}
                            </Text>

                        </VStack>
                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color={'yellow.500'}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Donated People
                            </Text>

                            <Flex wrap={'wrap'} gap='2'>
                                {products.supporters!.map((item, index) => (

                                    <Tag size={'md'} variant="solid" colorScheme="orange" key={item + index}>
                                        {item}
                                    </Tag>

                                ))}
                            </Flex>


                        </Box>
                        <Box>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color={'yellow.500'}
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                Donation
                            </Text>
                            <Select
                                value={value}
                                onChange={handleChange}
                                placeholder='Amount of NEAR you want donate'>
                                <option value='1000000000000000000000000'>1 Near</option>
                                <option value='2000000000000000000000000'>2 Near</option>
                                <option value='3000000000000000000000000'>3 Near</option>
                                <option value='4000000000000000000000000'>4 Near</option>
                                <option value='5000000000000000000000000'>5 Near</option>
                            </Select>

                        </Box>
                    </Stack>

                    <Button
                        rounded={'none'}
                        w={'full'}
                        mt={8}
                        size={'lg'}
                        py={'7'}
                        bg={'gray.900'}
                        color={'white'}
                        textTransform={'uppercase'}
                        onClick={async () => {
                            await donateProduct({ price: value, productId: params.pid })
                            toast({
                                title: 'Successful',
                                description: "Donated Successfully",
                                status: 'success',
                                duration: 2000,
                                isClosable: true,
                            })
                            await fetchProduct()
                        }}
                        isDisabled={value === ''}
                        _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                        }}>
                        Donate
                    </Button>
                </Stack>
            </SimpleGrid>
        </Container>
    );
}

