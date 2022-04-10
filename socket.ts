import {Socket} from 'socket.io';
import {
    AuctionMetaData,
    Bid,
    ClientToServerEvents,
    InterServerEvents,
    Item,
    ServerToClientEvents,
    SocketData
} from "./interfaces";

const clients: SocketApp[] = [];
const biddingItems: Item[] = [];
const acceptedBids: Bid[] = [];
let auctionMetaData: AuctionMetaData = {
    totalBids: 0,
    totalConnections: 0,
};

biddingItems.push({
    baseAmount: 400,
    currentAmount: 400,
    name: "Telesmati",
    image: "https://fdn2.gsmarena.com/vv/pics/realme/realme-gt-master-2.jpg",
    expireTime: 1649168876606,
    acceptedName: ""
});


export const socketHandler = (socket: SocketApp) => {
    auctionMetaData.totalConnections++;

    console.log("New connection established");

    clients.push(socket);

    socket.on("disconnect", () => {
        console.log("user disconnected");
        const i = clients.indexOf(socket);
        clients.splice(i, 1);
        auctionMetaData.totalConnections--;
        socket.broadcast.emit("metaData", auctionMetaData);
    });

    socket.on("joinBidding", () => {
       socket.emit("updatedItem", biddingItems[0]);
    });

    socket.on("bid", (bid) => {
        auctionMetaData.totalBids++;
        if (bid.bidAmount > biddingItems[0].currentAmount) {
            biddingItems[0].currentAmount = 10;//bid.bidAmount;
            biddingItems[0].acceptedName = bid.name;
            bid.isApproved = true;
            acceptedBids.push(bid);
        }
        socket.broadcast.emit("acceptedBid", acceptedBids[acceptedBids.length - 1]);
        socket.broadcast.emit("updatedItem", biddingItems[0]);
        socket.broadcast.emit("metaData", auctionMetaData);
        socket.emit("bidResult", bid);
        socket.emit("updatedItem", biddingItems[0]);
        socket.emit("acceptedBid", acceptedBids[acceptedBids.length - 1]);
        socket.emit("metaData", auctionMetaData);
        console.log(bid);
    });

    socket.emit("metaData", auctionMetaData);
    socket.broadcast.emit("metaData", auctionMetaData);
    console.log("Total connections: " + clients.length.toString());
};

export declare type SocketApp = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
