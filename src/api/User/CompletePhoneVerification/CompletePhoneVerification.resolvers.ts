import { Resolvers } from "../../../types/resolvers";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const {
        phoneNumber
        //  key
      } = args;
      try {
        // key is removed just for prototype purposes
        const verification = await Verification.findOne({
          payload: phoneNumber
        });
        if (!verification) {
          return {
            ok: false,
            error: "Verification key not valid",
            token: null
          };
        } else {
          verification.verified = true;
          await verification.save();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      try {
        // const user = await User.findOne({ phoneNumber });
        const user = await User.create({
          firstName: "test",
          lastName: "test",
          email: "test@gmail.com",
          profilePhoto:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnsboJhah0UAGBp_rAvi7Yct-ts9qSHWiZNsLsYc220QxOHg6k7Q",
          phoneNumber
        }).save();
        // if (user) {
        user.verifiedPhoneNumber = true;
        await user.save();
        const token = createJWT(user.id);
        return {
          ok: true,
          error: null,
          token
        };
        // }
        // else {
        //   return {
        //     ok: true,
        //     error: null,
        //     token: null
        //   }
        // }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
