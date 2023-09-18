import Pusher from "pusher-js";
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    wsHost: process.env.NEXT_PUBLIC_PUSHER_BASE_URL,
    httpHost: process.env.NEXT_PUBLIC_PUSHER_BASE_URL,
    httpPORT: 443,
    wsPort: 443,
    wssPort: 443,
    forceTLS: true,
    enabledTransports: ['wss'],
    
});

export default pusher