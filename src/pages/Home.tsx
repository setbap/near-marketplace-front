import { Button, Container, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import CardItem from "../components/CardItem";
import { getProducts } from "../config/marketplace";
import { accountBalance, login } from "../config/near";
import { Product } from "../model";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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

    const fetchProducts = useCallback(async () => {
        if (account.accountId) {
            await getProducts().then(products => {
                setProducts(products);
            }).finally(() => setLoading(false));
        }
    }, []);
    useEffect(() => {
        fetchProducts();
    }, []);
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
    if (loading) {
        return (
            <Container minH={'calc(100vh - 125px)'} pb='4' maxW={'8xl'}>
                <Stack direction='row' justify={'center'} alignItems='center' h='full' pt={'8'} spacing={7}>
                    <Spinner size='xl' />
                    <Text>Loading</Text>
                </Stack>
            </Container>
        )
    }
    return (
        <>
            <Container minH={'calc(100vh - 125px)'} maxW={'8xl'}>
                <SimpleGrid minChildWidth='400px' pt={'4'} spacing='4'>
                    {products.map((product: Product) => (
                        <CardItem key={product.id} product={product} />
                    ))}
                </SimpleGrid>
            </Container>
        </>
    )
}

export default Home