
export interface User {
    id: number;
    username: string;
    password: string;
    role: 'seller' | 'bidder';
    profile: {
      name: string;
      email: string;
    };
  }