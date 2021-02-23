import { Document, ObjectId } from "mongoose";

export interface IReport extends Document {
  court: string;
  suit_no: string;
  title: string;
  summary: string;
  body: string;
  date: Date;
  vol: string;
  year: string;
  likes?: number;
  caseRef?: string;
  slug?: string;
  comments?: Array<ObjectId> | Array<IReportComment>;
  judgesList?: Array<ObjectId>;
  added_by: ObjectId;
  updated_by?: ObjectId;
}

// export interface IReport extends Model<ReportCommentInterface> { };

export interface IReportComment extends Document {
  content: string;
  author: ObjectId;
  likes?: number;
  approved?: boolean;
  createdAt: Date;
  report: ObjectId;
}
