"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserPassword = exports.createUser = exports.getUser = exports.getUsers = exports.login = void 0;
var client_1 = require("@prisma/client");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var prisma = new client_1.PrismaClient();
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userEmail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userEmail = req.body.email;
                    return [4 /*yield*/, prisma.user.findFirst({
                            where: { email: userEmail }
                        }).then(function (user) {
                            if (user === null) {
                                return res.status(401).json({
                                    message: 'veuillez vérifier vos identifiants'
                                });
                            }
                            else {
                                bcrypt.compare(req.body.password, user.password, function (err, result) {
                                    if (result) {
                                        var token = jwt.sign({
                                            email: user.email,
                                            id: user.id
                                        }, process.env.JWT_SECRET, { expiresIn: '1h' });
                                        res.cookie('token', token, {
                                            httpOnly: true,
                                            maxAge: 1000 * 60 * 60 * 24 * 7,
                                        });
                                        res.status(200).json({
                                            message: "Connexion réussi!",
                                        });
                                    }
                                    else {
                                        res.status(401).json({
                                            message: "Mauvaise combinaison email et mot de passe!",
                                        });
                                    }
                                });
                            }
                        }).catch(function (err) {
                            res.status(500).json({
                                message: "Erreur serveur!",
                                error: err
                            });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findMany().then(function (result) {
                        if (result === null) {
                            return res.status(201).json({
                                message: 'aucun résultat'
                            });
                        }
                        return res.status(200).json(result);
                    }).catch(function (err) {
                        return res.status(404).json({
                            message: 'oups une erreur est survenue'
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUsers = getUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = Number(req.params.id);
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: { id: userId }
                        }).then(function (result) {
                            if (result === null) {
                                return res.status(201).json({
                                    message: 'aucun résultat'
                                });
                            }
                            return res.status(200).json(result);
                        }).catch(function (err) {
                            return res.status(404).json({
                                message: 'oups une erreur est survenue'
                            });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userExist, userData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            email: req.body.email
                        }
                    })];
                case 1:
                    userExist = _a.sent();
                    userData = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        roleId: req.body.roleId,
                        social_media: req.body.social_media
                    };
                    if (!!userExist) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma.user.create({
                            data: userData,
                        }).then(function (result) {
                            return res.status(200).json({
                                Message: 'Utilisateur crée avec succès',
                            });
                        }).catch(function (err) {
                            return res.status(404).json(err);
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/, res.status(200).json({
                        Message: "un utilisateur est déjà enregistré avec cet email"
                    })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userToUpdate, getTheUser, match, updateUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userToUpdate = {
                        email: req.body.email,
                        oldpassword: req.body.oldpassword,
                        password: req.body.password
                    };
                    return [4 /*yield*/, prisma.user.findFirst({
                            where: {
                                email: userToUpdate.email
                            }
                        })];
                case 1:
                    getTheUser = _a.sent();
                    if (!(getTheUser === null)) return [3 /*break*/, 2];
                    return [2 /*return*/, res.status(201).json({
                            message: 'email non reconnu'
                        })];
                case 2: return [4 /*yield*/, bcrypt.compare(req.body.oldpassword, getTheUser.password)];
                case 3:
                    match = _a.sent();
                    if (!match) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma.user
                            .update({
                            where: {
                                email: userToUpdate.email,
                            },
                            data: {
                                password: bcrypt.hashSync(userToUpdate.password, 10),
                            },
                        })
                            .then(function (result) {
                            return res.status(200).json({
                                message: "UserPassword updated",
                            });
                        })
                            .catch(function (err) {
                            return res.status(404).json(err);
                        })];
                case 4:
                    updateUser = _a.sent();
                    return [3 /*break*/, 6];
                case 5: return [2 /*return*/, res.status(201).json({
                        message: 'ancien MDP non correct'
                    })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserPassword = updateUserPassword;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, userExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = Number(req.params.id);
                    return [4 /*yield*/, prisma.user.findFirst({
                            where: {
                                id: userId
                            }
                        })];
                case 1:
                    userExist = _a.sent();
                    if (!userExist) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma.user.delete({
                            where: {
                                id: userId
                            }
                        }).then(function (result) {
                            return res.status(200).json({
                                message: 'User deleted'
                            });
                        }).catch(function (err) {
                            return res.status(404).json(err);
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/, res.status(200).json({
                        Message: "l'article n'existe pas"
                    })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteUser = deleteUser;
