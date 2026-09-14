export type ConversationType = {
  id: number;
  type: string;
  created_at: string;
  updated_at: string;
};

export type MessageType = {
  id: number;
  conversation_id: number;
  user_id: number;
  body: string;
  created_at: string;
  updated_at: string;
};
