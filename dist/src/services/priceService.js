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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.checkDatabaseStatus = exports.fetchAndStoreCryptoPrices = void 0;
var axios_1 = __importDefault(require("axios"));
var cryptoModel_1 = require("../models/cryptoModel");
var mongoose_1 = __importDefault(require("mongoose"));
var fetchAndStoreCryptoPrices = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, bitcoin, ethereum, polygon, cryptos, _i, cryptos_1, crypto_1, newCrypto, savedCrypto, saveError_1, error_1, count;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("Starting fetchAndStoreCryptoPrices function...");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 9, 10, 12]);
                return [4 /*yield*/, axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
                        params: {
                            ids: "bitcoin,ethereum,matic-network",
                            vs_currencies: "usd",
                            include_market_cap: true,
                            include_24hr_change: true,
                        },
                    })];
            case 2:
                response = _b.sent();
                _a = response.data, bitcoin = _a.bitcoin, ethereum = _a.ethereum, polygon = _a["matic-network"];
                if (!bitcoin || !ethereum || !polygon) {
                    throw new Error("Data for one or more cryptocurrencies is undefined");
                }
                cryptos = [
                    {
                        name: "Bitcoin",
                        symbol: "BTC",
                        price_usd: bitcoin.usd,
                        market_cap_usd: bitcoin.usd_market_cap,
                        change_24h: bitcoin.usd_24h_change,
                    },
                    {
                        name: "Ethereum",
                        symbol: "ETH",
                        price_usd: ethereum.usd,
                        market_cap_usd: ethereum.usd_market_cap,
                        change_24h: ethereum.usd_24h_change,
                    },
                    {
                        name: "Polygon",
                        symbol: "MATIC",
                        price_usd: polygon.usd,
                        market_cap_usd: polygon.usd_market_cap,
                        change_24h: polygon.usd_24h_change,
                    },
                ];
                console.log("Prepared crypto data:", JSON.stringify(cryptos, null, 2));
                _i = 0, cryptos_1 = cryptos;
                _b.label = 3;
            case 3:
                if (!(_i < cryptos_1.length)) return [3 /*break*/, 8];
                crypto_1 = cryptos_1[_i];
                console.log("Attempting to save ".concat(crypto_1.name, " data..."));
                newCrypto = new cryptoModel_1.CryptoModel(crypto_1);
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, newCrypto.save()];
            case 5:
                savedCrypto = _b.sent();
                console.log("".concat(crypto_1.name, " data saved successfully:"), JSON.stringify(savedCrypto, null, 2));
                return [3 /*break*/, 7];
            case 6:
                saveError_1 = _b.sent();
                console.error("Error saving ".concat(crypto_1.name, " data:"), saveError_1);
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 3];
            case 8:
                console.log("fetchAndStoreCryptoPrices completed successfully.");
                return [3 /*break*/, 12];
            case 9:
                error_1 = _b.sent();
                console.error("Error in fetchAndStoreCryptoPrices:");
                return [3 /*break*/, 12];
            case 10:
                console.log("Fetching current document count...");
                return [4 /*yield*/, cryptoModel_1.CryptoModel.countDocuments()];
            case 11:
                count = _b.sent();
                console.log("Current number of documents in the Crypto collection: ".concat(count));
                return [7 /*endfinally*/];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.fetchAndStoreCryptoPrices = fetchAndStoreCryptoPrices;
// Helper function to check database status
var checkDatabaseStatus = function () { return __awaiter(void 0, void 0, void 0, function () {
    var state, count, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                state = mongoose_1.default.connection.readyState;
                console.log("MongoDB connection state:", state);
                if (!(state === 1)) return [3 /*break*/, 2];
                return [4 /*yield*/, cryptoModel_1.CryptoModel.countDocuments()];
            case 1:
                count = _a.sent();
                console.log("Number of documents in the Crypto collection: ".concat(count));
                return [3 /*break*/, 3];
            case 2:
                console.log("Database is not connected. Unable to count documents.");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error("Error checking database status:", error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.checkDatabaseStatus = checkDatabaseStatus;
