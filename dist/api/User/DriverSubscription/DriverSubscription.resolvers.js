"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var resolvers = {
    Subscription: {
        DriverSubscription: {
            subscribe: graphql_yoga_1.withFilter(function (_, __, _a) {
                var pubSub = _a.pubSub;
                return pubSub.asyncIterator("driverUpdate");
            }, function (payload, _, _a) {
                var context = _a.context;
                var user = context.currentUser;
                var _b = payload.DriverSubscription, driverLastLat = _b.lastLat, driverLastLng = _b.lastLat, isTaken = _b.isTaken;
                var userLastLat = user.lastLat, userLastLng = user.lastLng;
                return (!isTaken &&
                    driverLastLat >= userLastLat - 0.05 &&
                    driverLastLng <= userLastLng + 0.05 &&
                    driverLastLat >= userLastLat - 0.05 &&
                    driverLastLng <= userLastLng + 0.05);
            })
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=DriverSubscription.resolvers.js.map