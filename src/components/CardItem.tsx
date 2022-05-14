import {
    Badge,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { donateProduct } from '../config/marketplace';
import { Product } from '../model';

export default function CardItem({ product }: { product: Product }) {
    const navigation = useNavigate();

    return (
        <Center pt={0}>
            <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '540px' }}
                height={{ sm: '476px', md: '20rem' }}
                direction={{ base: 'column', md: 'row' }}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                padding={4}>
                <Flex overflow={'hidden'} shadow='2xl' rounded={'md'} flex={1} bg="blue.200">
                    <Image
                        objectFit="cover"
                        boxSize="100%"
                        src={product.image}
                    />
                </Flex>
                <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="center"
                    p={1}
                    pt={2}>
                    <Box w={'full'} textAlign={'start'}>
                        <Heading fontSize={'2xl'} fontFamily={'body'}>
                            {product.name}
                        </Heading>
                        <Text noOfLines={1} textOverflow='ellipsis' fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                            @{product.owner}
                        </Text>
                    </Box>

                    <Text
                        textAlign={'start'}
                        color={useColorModeValue('gray.700', 'gray.400')}
                        noOfLines={3}

                        textOverflow='ellipsis'
                    >
                        {product.description}
                    </Text>
                    <Stack
                        width={'100%'}
                        mt={'2rem'}
                        direction={'row'}
                        padding={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}>
                        <Button
                            onClick={() => {
                                navigation(`/product/${product.id}`)
                            }}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            _focus={{
                                bg: 'gray.200',
                            }}>
                            View
                        </Button>
                        {/* <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'blue.400'}
                            color={'white'}
                            onClick={() => {
                                donateProduct({ productId: product.id, price: '1000000000000000000000000' })
                            }}
                            boxShadow={
                                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                            }
                            _hover={{
                                bg: 'blue.500',
                            }}
                            _focus={{
                                bg: 'blue.500',
                            }}>
                            Donate
                        </Button> */}
                    </Stack>
                </Stack>
            </Stack>
        </Center>
    );
}