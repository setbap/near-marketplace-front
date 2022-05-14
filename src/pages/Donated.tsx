import { Container, SimpleGrid, Spinner, Stack, Text, Button } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";
import { getDonatedProduct, getProducts } from "../config/marketplace";
import { accountBalance, login } from "../config/near";
import { Product } from "../model";

function DonatedProducts() {
    const account = window.walletConnection.account();
    const [products, setProducts] = useState([]);
    const [balance, setBalance] = useState("0");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const getBalance = useCallback(async () => {
        if (account.accountId) {
            setBalance(await accountBalance());
        }
    }, []);

    useEffect(() => {
        getBalance()

    }, [getBalance]);
    const fetchProducts = useCallback(async () => {
        if (account.accountId) {
            const products = await getDonatedProduct(account.accountId);
            setProducts(products);
        }
    }, []);
    useEffect(() => {
        fetchProducts().finally(() => setLoading(false));
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

    if (loading) {
        return (
            <Container minH={'calc(100vh - 125px)'} maxW={'7xl'}>
                <Stack direction='row' justify={'center'} alignItems='center' h='full' pt={'8'} spacing={4}>
                    <Spinner size='xl' />
                    <Text>Loading</Text>
                </Stack>
            </Container>
        )
    }

    if (products.length === 0) {
        return (
            <Container minH={'calc(100vh - 125px)'} maxW={'7xl'}>
                <Stack direction='column' justify={'center'} alignItems='center' h='full' pt={'8'} spacing={4}>
                    <Text>You don't have Donated To any Project</Text>
                    <Button variant="solid" onClick={() => {
                        navigate('/')
                    }}> Go Home</Button>
                </Stack>
            </Container>
        )
    }
    return <>
        <Container minH={'calc(100vh - 125px)'} maxW='container.xl'>
            <SimpleGrid minChildWidth='400px' spacing='1'>
                {products.map((product: Product) => (
                    <CardItem key={product.id} product={product} />
                ))}
            </SimpleGrid>
        </Container>
    </>

}

export default DonatedProducts