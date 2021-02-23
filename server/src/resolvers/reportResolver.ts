import { Report, RepComment } from "../models/ReportModel";
// import Judge from "models/Judge";
import { authentication } from "../utils/auth";
import dayjs from "dayjs";
import { IReport, IReportComment } from "helpers/types/Report.type";

export default {
  Query: {
    getReportCount: async (
      _,
      __,
      { token }: { token: string }
    ): Promise<number> => {
      const user = await authentication(token);
      if (user.role !== "admin") {
        try {
          const count = await Report.countDocuments({ added_by: user.id });
          return count;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          const count = await Report.countDocuments();
          return count;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    getReports: async (
      _: never,
      { search, limit, skip }: { search: string; limit: number; skip: number }
    ): Promise<IReport[]> => {
      if (search) {
        try {
          let reports = await Report.find(
            { $text: { $search: search } },
            { score: { $meta: "textScore" } }
          )
            // .sort({ score: { $meta: "textScore" } })
            .populate("added_by", ["name id"]);

          reports = reports.splice(skip || 0, limit || 15);
          return reports;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          const reports = await Report.find(
            {},
            {
              judgement: 0,
              body: 0,
              appeal: 0,
              ratios: 0,
              cases_cited: 0,
              determination: 0,
              issues_of_law: 0,
            }
          )
            .limit(limit || 10)
            .skip(skip || 0)
            .sort({ createdAt: -1 })
            .populate("added_by");
          // reports = reports.splice(skip || 0, limit || 15);
          return reports;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    getLimitedReports: async (_, { skip, limit }): Promise<IReport[]> => {
      // await authentication(token);

      try {
        const reports = await Report.find()
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 })
          .populate("added_by");
        // .populate({
        //   path: "comments",
        //   populate: {
        //     path: "author",
        //     select: ["_id", "name"],
        //   },
        // })

        // reports = reports.map((report) => {
        //   const comments = RepComment.find({ report: report._id });
        //   return {
        //     ...report._doc,
        //     comments,
        //   };
        // });
        return reports;
      } catch (error) {
        throw new Error(error);
      }
    },
    getReport: async (_, { slug }): Promise<IReport> => {
      // await auth();
      const report = await Report.findOne({ slug });
      if (!report) throw Error("No record found");
      try {
        return report;
      } catch (error) {
        throw new Error(error);
      }
    },
    getRepCommentsByReport: async (
      _,
      { report }
    ): Promise<IReportComment[]> => {
      try {
        const comments = await RepComment.find({ report }).populate("author");
        return comments;
      } catch (error) {
        throw new Error(error);
      }
    },
    getRepComments: async (): Promise<IReportComment[]> => {
      try {
        const comments = await RepComment.find().populate("report author");
        return comments;
      } catch (error) {
        throw new Error(error);
      }
    },
    getMyReports: async (_, { skip, limit }, { token }): Promise<IReport[]> => {
      const user = await authentication(token);
      let reports: IReport[];
      try {
        if (user.role === "editor") {
          reports = await Report.find({ added_by: user._id })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate("added_by");
        } else {
          reports = await Report.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate("added_by");
        }
        return reports;
      } catch (error) {
        throw Error(error);
      }
    },
  },
  Mutation: {
    addReport: async (_, { input }, { token }): Promise<IReport> => {
      const user = await authentication(token);
      const { date, vol } = input;
      let volume = vol.split(" ");
      volume = Number(volume[1]);
      const year = dayjs(date).get("year");
      let count: any = await Report.countDocuments();
      count = (count + 1).toString();
      const SN = count.padStart(4, "1000");
      let caseRef = `HELA-${year}-vol-${volume}-${Number(SN)}`;
      const reports = await Report.findOne({ caseRef });
      if (reports) {
        caseRef = `HELA-${year}-vol-${volume}-${Number(SN) + 1}`;
      }

      try {
        const report = await Report.create({
          ...input,
          caseRef,
          added_by: user._id,
          year,
        });

        return report;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateReport: async (_, { input }, { token }): Promise<IReport> => {
      const user = await authentication(token);
      try {
        const report = await Report.findOneAndUpdate(
          { _id: input._id },
          { ...input, updated_by: user._id },

          {
            new: true,
          }
        );
        return report;
      } catch (error) {
        throw new Error(error);
      }
    },
    likeReport: async (_, { _id }): Promise<number> => {
      let report = await Report.findById(_id);
      if (!report) throw Error("No record found");
      // console.log(object);
      try {
        report = await Report.findOneAndUpdate(
          { _id },
          {
            $inc: { likes: 1 },
          },
          { new: true }
        );
        return report.likes;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteReport: async (_, { _id }, { token }): Promise<IReport> => {
      // await authentication(token);
      try {
        const report = await Report.findById(_id);
        if (!report) throw new Error("No record found");
        // await Judge.findOneAndUpdate(
        //   { reports: report._id },
        //   { $pull: { reports: report._id } },
        //   { new: true }
        // );
        report.remove();
        return report.id;
      } catch (error) {
        throw new Error(error);
      }
    },
    // RepComment
    addRepComment: async (
      _,
      { report, content },
      { token }
    ): Promise<IReportComment> => {
      const author = await authentication(token);

      try {
        let comment = await RepComment.create({
          author,
          report,
          content,
        });

        comment = await RepComment.findById(comment._id).populate("author");
        return comment;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteRepComment: async (_, { _id }, { token }): Promise<any> => {
      await authentication(token);
      try {
        const comment = await RepComment.findOne({ _id });
        if (!comment) throw new Error("No record found");
        await Report.findOneAndUpdate(
          { comments: comment._id },
          { $pull: { comments: comment._id } },
          { new: true }
        );
        comment.remove();
        return comment._id;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
