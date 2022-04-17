import { GO_BACKEND } from "../common/urls";
import axios from 'axios';
import { showNotification } from "@mantine/notifications";


export interface Hashes {
    lastWallet: string;
    lastBlock: string;
    lastFinded: string;
}

export const initHashesPolling = () => {

    setInterval(async () => {
        try {
            const response = await axios.get(`${GO_BACKEND}/getLastHashAnimal`);
            localStorage.setItem('hashes', JSON.stringify(response.data));
        } catch (err) {
            showNotification({
                title: 'Hashes could not be retrieved',
                message: JSON.stringify(err).substring(0, 160),
              })
        }
    }, 3000);
}