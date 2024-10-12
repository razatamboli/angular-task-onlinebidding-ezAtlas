
export interface Bid {
  id: number;
  bidderId: number;
  amount: number;
  timestamp: string;
}

export interface Auction {
  id: number;
  sellerId: number;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  status: 'active' | 'finalized' | 'canceled';
  bidHistory: Bid[];
}