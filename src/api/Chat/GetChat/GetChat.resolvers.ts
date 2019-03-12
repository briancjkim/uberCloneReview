import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(async (_, args, { req }) => {
      const user: User = req.user;
      try {
        const chat = await Chat.findOne(
          {
            id: args.chatId
          },
          { relations: ["messages"] }
        );
        if (chat) {
          if (chat.passengerId === user.id || chat.driverId === user.id) {
            return {
              ok: true,
              error: null,
              chat
            };
          } else {
            return {
              ok: false,
              error: "Not Authorised to see this chat",
              chat: null
            };
          }
        } else {
          return {
            ok: false,
            error: "Not Found",
            chat: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          chat: null
        };
      }
    })
  }
};
export default resolvers;
