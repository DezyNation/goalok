import Pusher from "pusher-js";
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    wsHost: process.env.NEXT_PUBLIC_PUSHER_BASE_URL,
    forceTLS: true,
    enabledTransports: ['wss', 'ws'],
    
});

export default pusher