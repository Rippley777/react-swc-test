import { createSlice } from '@reduxjs/toolkit';

export type Message = {
  type: string;
  content?: string;
  id?: string;
  message?: string;
  messageId?: string;
  serverTimestamp?: string;
  userChatId?: string;
  username?: string;
  users?: any[];
};
type ConnectedUser = [string, string];

type DisconnectedUser = {
  id: string;
  username: string;
  serverTimestamp: string;
};

type ChatState = {
  chatId: string | null;
  messages: Message[];
  connectedUsers: { id: string; username: string }[];
  disconnectedUsers: DisconnectedUser[];
};

const initialState: ChatState = {
  chatId: null,
  messages: [],
  connectedUsers: [],
  disconnectedUsers: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUserChatData: (state, action) => {
      // const chatData = {
      //   chatId: action.payload.userId,
      // };
      state.chatId = action.payload.userId;
    },
    updateChat: (state, action) => {
      if (action.payload.type === 'chat-message') {
        const {
          type,
          message,
          messageId,
          // userChatId,
          username,
          serverTimestamp,
        } = action.payload;
        state.messages = [
          ...state.messages,
          {
            message,
            type,
            username,
            messageId,
            serverTimestamp,
          },
        ];
      }

      if (action.payload.type === 'user-list') {
        state.connectedUsers = action.payload.users.map(
          (user: ConnectedUser) => ({ id: user[0], username: user[1] }),
        );
      }

      if (action.payload.type === 'user-disconnected') {
        const { userId, username, serverTimestamp } = action.payload;
        state.disconnectedUsers = [
          ...state.disconnectedUsers
            .filter(
              // handle removing expired users
              (dcUser) => {
                const now = new Date().getTime();
                const dcTime = new Date(dcUser.serverTimestamp).getTime();
                return now - dcTime < 1000 * 60 * 5;
              },
            )
            .concat({
              id: userId,
              username,
              serverTimestamp,
            }),
        ];
        // state.connectedUsers = state.connectedUsers.filter(
        //   (user) => user.id !== action.payload.userId,
        // );
      }
    },
  },
});

export const { setUserChatData, updateChat } = chatSlice.actions;
export default chatSlice.reducer;
