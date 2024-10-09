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
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var node_cron_1 = __importDefault(require("node-cron"));
var user_1 = require("./routes/user");
var cryptoModel_1 = require("./models/cryptoModel");
var priceService_1 = require("./services/priceService");
var priceService_2 = require("./services/priceService");
var axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use("/user", user_1.userRouter);
var initializeDatabase = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGO_URI)];
            case 1:
                _a.sent();
                console.log("Connected to MongoDB");
                return [4 /*yield*/, (0, priceService_2.checkDatabaseStatus)()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error("Error connecting to MongoDB", err_1);
                process.exit(1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
initializeDatabase().then(function () {
    var PORT = process.env.PORT || 3000;
    app.listen(PORT, function () {
        console.log("Server has started on port ".concat(PORT));
        node_cron_1.default.schedule("0 */2 * * *", function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Cron job started: Fetching cryptocurrency data...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, (0, priceService_2.checkDatabaseStatus)()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, priceService_1.fetchAndStoreCryptoPrices)()];
                    case 3:
                        _a.sent();
                        console.log("Cron job completed successfully.");
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error in cron job:", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    });
});
app.get("/stats", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var coin, response, coinData, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coin = req.query.coin;
                if (!coin || typeof coin !== "string") {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid coin parameter" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
                        params: {
                            ids: coin,
                            vs_currencies: "usd",
                            include_market_cap: "true",
                            include_24hr_change: "true",
                        },
                    })];
            case 2:
                response = _a.sent();
                coinData = response.data[coin];
                if (!coinData) {
                    return [2 /*return*/, res.status(404).json({ error: "Cryptocurrency not found" })];
                }
                result = {
                    price: coinData.usd,
                    marketCap: coinData.usd_market_cap,
                    "24hChange": coinData.usd_24h_change,
                };
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Error fetching data:", error_2.message);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var calculateStandardDeviation = function (values) {
    var mean = values.reduce(function (a, b) { return a + b; }, 0) / values.length;
    var squaredDiffs = values.map(function (value) { return Math.pow((value - mean), 2); });
    var variance = squaredDiffs.reduce(function (a, b) { return a + b; }, 0) / squaredDiffs.length;
    return Math.sqrt(variance);
};
app.get("/deviation", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var coin, records, prices, deviation, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coin = req.query.coin;
                if (!coin || typeof coin !== "string") {
                    return [2 /*return*/, res.status(400).json({ error: "Invalid coin parameter" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cryptoModel_1.CryptoModel.find({ symbol: coin.toUpperCase() })
                        .sort({ updated_at: -1 })
                        .limit(100)];
            case 2:
                records = _a.sent();
                if (records.length === 0) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ error: "No records found for the specified cryptocurrency" })];
                }
                prices = records.map(function (record) { return record.price_usd; });
                deviation = calculateStandardDeviation(prices);
                res.json({ deviation: deviation });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error("Error fetching data:", error_3.message);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// test-route
app.get("/test-fetch", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, priceService_2.checkDatabaseStatus)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, priceService_1.fetchAndStoreCryptoPrices)()];
            case 2:
                _a.sent();
                res.send("Fetch and store completed. Check logs for details.");
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).send("Error: " + error_4.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
