"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var resolvers_1 = __importDefault(require("../resolvers"));
var reportTypes_1 = require("./reportTypes");
var userTypes_1 = require("./userTypes");
var typeDefs = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  scalar Date\n\n  type Query {\n    _empty: String\n  }\n\n  type Mutation {\n    _empty: String\n  }\n  type Subscription {\n    _empty: String\n  }\n"], ["\n  scalar Date\n\n  type Query {\n    _empty: String\n  }\n\n  type Mutation {\n    _empty: String\n  }\n  type Subscription {\n    _empty: String\n  }\n"])));
exports.schema = apollo_server_express_1.makeExecutableSchema({
    typeDefs: [typeDefs, userTypes_1.UserType, reportTypes_1.ReportTypes],
    resolvers: resolvers_1.default,
});
var templateObject_1;
