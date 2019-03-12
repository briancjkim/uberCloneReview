import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolver: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(async (_, args: UpdateMyProfileMutationArgs, { req }): Promise<UpdateMyProfileResponse> => {
      const user: User = req.user;
      const notNull: any = cleanNullArgs(args);
      if (notNull.password !== null) {
        // becuase beforeupdate works on instances only so password doesn't get hashed. so we have to refer instance to activate beforeUdpate
        user.password = notNull.password;
        await user.save();
        delete notNull.password;
      }
      try {
        await User.update({ id: user.id }, { ...notNull });
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }

    }
    )
  }
};

export default resolver;