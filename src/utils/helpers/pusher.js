import Pusher from "pusher-js";
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    wsHost: process.env.NEXT_PUBLIC_PUSHER_BASE_URL,
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: true,
    enabledTransports: ['wss', 'ws'],
    
});

export default pusher