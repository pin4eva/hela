"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepComment = exports.Report = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
var Schema = mongoose_1.default.Schema;
var ReportSchema = new Schema({
    court: String,
    suit_no: String,
    title: { type: String, text: true },
    summary: String,
    body: { type: String, text: true },
    date: Date,
    vol: String,
    year: String,
    likes: { type: Number, default: 0 },
    caseRef: { type: String, text: true },
    slug: { type: String, slug: "title" },
    comments: [{ type: Schema.Types.ObjectId, ref: "RepComment" }],
    judgesList: [{ type: Schema.Types.ObjectId, ref: "Judge" }],
    added_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
    autoIndex: false,
});
ReportSchema.index({ "$**": "text" });
ReportSchema.plugin(mongoose_slug_generator_1.default);
var RepCommentSchema = new Schema({
    content: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    likes: { type: Number, default: 0 },
    approved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    report: { type: Schema.Types.ObjectId, ref: "Report" },
});
exports.Report = mongoose_1.default.model("Report", ReportSchema);
exports.RepComment = mongoose_1.default.model("RepComment", RepCommentSchema);
