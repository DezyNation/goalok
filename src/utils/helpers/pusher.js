import Pusher from "pusher-js";
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    wsHost: process.env.NEXT_PUBLIC_PUSHER_BASE_URL,
    wssHost: process.env.NEXT_PUBLIC_PUSHER_BASE_URL,
    wssPort: 6001,
    forceTLS: true,
    enabledTransports: ['wss']
});

export default pusher