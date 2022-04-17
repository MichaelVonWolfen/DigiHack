import { GO_BACKEND } from "../common/urls";
import axios from 'axios';
import React, { useContext } from "react";
import { showNotification } from "@mantine/notifications";


export interface Hashes {
    lastWallet: string;
    lastBlock: string;
    lastFinded: string;
}


export const initPolling = () => {

    setInterval(async () => {
        try {
            const hashes = await axios.get(`${GO_BACKEND}/getLastHashAnimal`);
            localStorage.setItem('hashes', JSON.stringify(hashes));
        } catch (err) {
            showNotification({
                title: 'Hashes could not be retrieved',
                message: JSON.stringify(err).substring(0, 160),
              })
        }
    }, 500);
}