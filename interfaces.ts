export interface AuctionMetaData {
    totalConnections: number;
    totalBids: number;
}

export interface ServerToClientEvents {
    updatedItem: (data: Item) => void;
    clock: (interval: number) => void;
    bidResult: (bid: Bid) => void;
    acceptedBid: (bid: Bid) => void;
    metaData: (data: AuctionMetaData) => void;
}

interface Msg {
    by: string;
    msg: string;
}

export interface ClientToServerEvents {
    joinBidding: () => void;
    joinGroup: (groupCode: string) => void;
    bid: (data: Bid) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}

export interface Bid {
    connectionId: string;
    currentAmount: number;
    bidAmount: number;
    isApproved: boolean;
    timestamp: number;
    name: string;
}

export interface Item {
    name: string;
    image: string;
    baseAmount: number;
    currentAmount: number;
    expireTime: number;
    acceptedName: string;
}
