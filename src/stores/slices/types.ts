export type Sender = "user" | "ai";
export type Review = "liked" | "disliked";

export interface Message {
  id: string;
  createdAt?: number | string;
  sender: Sender;
  content: string;
  review?: Review;
}

export interface Conversation {
  id: string;
  createdAt: number;
  updatedAt?: string;
  userId?: string;
  messages: Message[];
  rating: number | null;
  feedback: string;
  isConversationEnded: boolean;
}

export interface ChatState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
}
