"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var nanoid_1 = require("nanoid");
// import nodeMailer from "nodemailer";
var config_1 = __importDefault(require("../utils/config"));
var auth_1 = require("../utils/auth");
var ReportModel_1 = require("../models/ReportModel");
var UserModel_1 = __importDefault(require("../models/UserModel"));
var mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
var BASE_URL = process.env.NODE_ENV === "production"
    ? "https://server.lawathenaeum.com"
    : "http://localhost:8000";
var randId = nanoid_1.nanoid(5);
/**
 * TODO:
 *
 * 1. [*] Forgot password
 * 2. [*] Change password
 * 3. [*] Email confirmation
 * 4. [] User role and permission
 * 5. [] Upload profile picture
 * 6. [] Change email service
 */
exports.default = {
    Query: {
        getUsers: function (_, __) { return __awaiter(void 0, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserModel_1.default.find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        getUser: function (_, _a) {
            var _id = _a._id;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, UserModel_1.default.findOne({ _id: _id })];
                        case 1:
                            user = _b.sent();
                            return [2 /*return*/, user];
                        case 2:
                            error_2 = _b.sent();
                            throw new Error(error_2);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        me: function (_, _a) {
            var token = _a.token;
            return __awaiter(void 0, void 0, void 0, function () {
                var user;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, auth_1.authentication(token)];
                        case 1:
                            user = _b.sent();
                            if (user)
                                return [2 /*return*/, user];
                            else
                                return [2 /*return*/, null];
                            return [2 /*return*/];
                    }
                });
            });
        },
        auth: function (_, args, _a) {
            var token = _a.token;
            return __awaiter(void 0, void 0, void 0, function () {
                var user;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, auth_1.authentication(token)];
                        case 1:
                            user = _b.sent();
                            if (user)
                                return [2 /*return*/, user];
                            else
                                return [2 /*return*/, null];
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
    Mutation: {
        validateUsername: function (_, _a) {
            var username = _a.username;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, UserModel_1.default.findOne({ username: username })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        validateEmail: function (_, _a) {
            var email = _a.email;
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        signup: function (_, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var name, email, password, username, user, info, error_3;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            name = input.name, email = input.email, password = input.password, username = input.username;
                            if (!email || !password)
                                throw new Error("Fill all input");
                            return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
                        case 1:
                            user = _c.sent();
                            return [4 /*yield*/, UserModel_1.default.findOne({ username: username })];
                        case 2:
                            user = _c.sent();
                            if (user)
                                throw new Error("User with same email or username already exist");
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 6, , 7]);
                            _b = {
                                username: username,
                                email: email,
                                name: name
                            };
                            return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                        case 4:
                            info = (_b.password = _c.sent(),
                                _b.token = nanoid_1.nanoid(4),
                                _b);
                            return [4 /*yield*/, UserModel_1.default.create(info)];
                        case 5:
                            // const mailOptions = {
                            //   from: "support@lawathenaeum.com",
                            //   to: info.email,
                            //   subject: "Please confirm your email",
                            //   html: `<h2 align="center">Thank you for registering</h2> <p>Please <a href="${BASE_URL}/verify/${info.token}">verify</a> your account to gain access to our platform</p> <p> or</> <p style="text-align:center;"> copy your verification code <b >${info.token}</b></p>`,
                            // };
                            // const data = await sgMail.send(mailOptions);
                            // if (data) {
                            //   user = await User.create(info);
                            // }
                            user = _c.sent();
                            return [2 /*return*/, user];
                        case 6:
                            error_3 = _c.sent();
                            throw new Error(error_3);
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        login: function (_, _a, _b) {
            var email = _a.email, password = _a.password;
            var res = _b.res;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, isMatch, payload, token, error_4;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!email || !password)
                                throw new Error("Fill the email and password");
                            return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
                        case 1:
                            user = _c.sent();
                            if (!user)
                                throw new Error("No record found");
                            return [4 /*yield*/, bcryptjs_1.default.compareSync(password, user.password)];
                        case 2:
                            isMatch = _c.sent();
                            if (!isMatch)
                                throw Error("Incorrect email or password");
                            payload = {
                                _id: user._id,
                            };
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, jsonwebtoken_1.default.sign(payload, config_1.default.SECRET, {
                                    expiresIn: "1d",
                                })];
                        case 4:
                            token = _c.sent();
                            res.cookie("token", token, {
                                expires: new Date(Date.now() + 8 * 360000),
                                httpOnly: process.env.NODE_ENV === " production ",
                                secure: process.env.NODE_ENV === " production ",
                            });
                            return [2 /*return*/, { user: user, token: token }];
                        case 5:
                            error_4 = _c.sent();
                            throw new Error(error_4);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
        verify: function (_, _a) {
            var token = _a.token;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, UserModel_1.default.findOne({ token: token })];
                        case 1:
                            user = _b.sent();
                            if (!user) {
                                throw new Error("Invalid token");
                            }
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, UserModel_1.default.findOneAndUpdate({ token: token }, { $set: { token: "" } }, { new: true })];
                        case 3:
                            user = _b.sent();
                            return [2 /*return*/, user];
                        case 4:
                            error_5 = _b.sent();
                            throw new Error(error_5);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        checkEmail: function (_, _a) {
            var email = _a.email;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw new Error("Unknown email");
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, UserModel_1.default.findOneAndUpdate({ _id: user._id }, { $set: { token: crypto_1.default.randomBytes(64).toString("hex") } }, { new: true })];
                        case 3:
                            user = _b.sent();
                            // const mailOptions = {
                            //   from: config.AUTH_USER,
                            //   to: user.email,
                            //   subject: "Password recovery mail",
                            //   html: `<div align="center"><h2 align="center">Password Recovery</h2> <p>Please <a href="${BASE_URL}/verify?token=${randId}&ref=${user.token}&type=changepass">follow the link to update your password</> </p></div>`,
                            // };
                            // await transport.sendMail(mailOptions);
                            return [2 /*return*/, user];
                        case 4:
                            error_6 = _b.sent();
                            throw new Error(error_6);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        forgotPassword: function (_, _a) {
            var token = _a.token, password = _a.password;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_7;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, UserModel_1.default.findOne({ token: token })];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                throw new Error("Invalid or expired token");
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, UserModel_1.default.findOneAndUpdate({ token: token }, {
                                    token: "",
                                    password: bcryptjs_1.default.hashSync(password, 10),
                                }, { new: true })];
                        case 3:
                            user = _b.sent();
                            return [2 /*return*/, user];
                        case 4:
                            error_7 = _b.sent();
                            throw new Error(error_7);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        changePassword: function (_, _a, _b) {
            var password = _a.password, oldPassword = _a.oldPassword;
            var token = _b.token;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, isMatch, error_8;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, auth_1.authentication(token)];
                        case 1:
                            user = _c.sent();
                            return [4 /*yield*/, UserModel_1.default.findOne({ _id: user._id })];
                        case 2:
                            user = _c.sent();
                            return [4 /*yield*/, bcryptjs_1.default.compareSync(oldPassword, user.password)];
                        case 3:
                            isMatch = _c.sent();
                            if (!isMatch)
                                throw Error("Incorrect password");
                            _c.label = 4;
                        case 4:
                            _c.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, UserModel_1.default.findOneAndUpdate({ _id: user._id }, {
                                    password: bcryptjs_1.default.hashSync(password, 10),
                                }, { new: true })];
                        case 5:
                            user = _c.sent();
                            return [2 /*return*/, user];
                        case 6:
                            error_8 = _c.sent();
                            throw new Error(error_8);
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        deleteUser: function (_, _a, _b) {
            var _id = _a._id;
            var token = _b.token;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, user_1, error_9;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, auth_1.authentication(token)];
                        case 1:
                            user = _c.sent();
                            if (user.role !== "admin")
                                throw Error("You are not authorized to delete a user");
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, UserModel_1.default.findOne({ _id: _id })];
                        case 3:
                            user_1 = _c.sent();
                            if (!user_1)
                                throw new Error("No record found");
                            return [4 /*yield*/, ReportModel_1.RepComment.deleteMany({ author: user_1._id })];
                        case 4:
                            _c.sent();
                            user_1.remove();
                            return [2 /*return*/, user_1];
                        case 5:
                            error_9 = _c.sent();
                            throw new Error(error_9);
                        case 6: return [2 /*return*/];
                    }
                });
            });
        },
        updateUser: function (_, _a, _b) {
            var input = _a.input;
            var token = _b.token;
            return __awaiter(void 0, void 0, void 0, function () {
                var user, error_10;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, auth_1.authentication(token)];
                        case 1:
                            _c.sent();
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, UserModel_1.default.findOneAndUpdate({ _id: input._id }, __assign({}, input), {
                                    new: true,
                                })];
                        case 3:
                            user = _c.sent();
                            return [2 /*return*/, user];
                        case 4:
                            error_10 = _c.sent();
                            throw new Error(error_10);
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
    },
};
