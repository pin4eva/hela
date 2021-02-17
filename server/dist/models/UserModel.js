"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
    name: { type: String, required: true },
    username: {
        type: String,
        required: true,
        min: [4, "Your username must be more than 4 characters"],
        max: [20, "Username must not exceed 12 characters"],
    },
    phone: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, min: 4 },
    token: String,
    role: { type: String, default: "user" },
    isActive: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    accountType: { type: String, default: "Regular" },
    rank: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    contact: { type: String, default: "" },
    status: { type: String, default: "" },
    plan: { type: String, default: "" },
    bio: { type: String, default: "" },
    image: { type: String, default: "http://placehold.jp/150x150.png" },
}, { timestamps: true });
// export default mongoose.models?.User || mongoose.model("User", UserSchema);
var User = mongoose_1.model("User", UserSchema);
exports.default = User;
