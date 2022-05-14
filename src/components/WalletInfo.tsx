import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Button, Link } from "@chakra-ui/react"
import { useState, useCallback, useEffect } from "react";

import { accountBalance, login, logout } from "../config/near";

function WalletInfo() {
    const account = window.walletConnection.account();
    const [balance, setBalance] = useState("0");
    const [accId, setAccId] = useState("")
    const getBalance = useCallback(async () => {
        if (account.accountId) {
            setBalance(await accountBalance());
            setAccId(window.walletConnection.account().accountId);
        }
    }, []);

    useEffect(() => {
        getBalance();
    }, [getBalance]);
    return !!accId ? (
        <Menu>
            <MenuButton

                cursor={'pointer'}
                minW={0}>
                <Button
                    size={'sm'}
                    variant={'outline'}
                    outline="none"
                    rightIcon={<ChevronDownIcon />}
                    w="fit-content">
                    {accId}
                </Button>

            </MenuButton>
            <MenuList>
                <MenuItem
                    as={Link}
                    href={`https://explorer.testnet.near.org/accounts/${accId}`}
                    target='_blank'
                    justifyContent={'space-between'}><strong>{balance}{" "}Near</strong></MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>LogOut</MenuItem>
            </MenuList>
        </Menu>
    ) : (<Button
        size={'sm'}
        onClick={login}
        fontSize={'sm'}
        fontWeight={400}
        variant={'outline'}>
        CONNECT WALLET
    </Button>)
}

export default WalletInfo