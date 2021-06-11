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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const index_1 = __importDefault(require("./src/index"));
function testGetPrice() {
    const ph = new index_1.default(5);
    ph.putPrice('a', 1);
    ph.putPrice('a', 2);
    ph.putPrice('b', 3);
    assert_1.default.strict.equal(ph.getPrice('a'), 2);
    assert_1.default.strict.equal(ph.getPrice('b'), 3);
}
function testRollingAverage() {
    const ph = new index_1.default(4);
    ph.putPrice('a', 1);
    ph.putPrice('a', 2);
    ph.putPrice('a', 1);
    ph.putPrice('a', 2);
    assert_1.default.strict.equal(ph.getAverage('a'), 1.5);
}
function testWaitForNextPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        const ph = new index_1.default(3);
        setTimeout(() => {
            ph.putPrice('a', 42);
        }, 100);
        let value = yield ph.waitForNextPrice('a');
        assert_1.default.strict.equal(value, 42);
    });
}
function testSubscribe() {
    return __awaiter(this, void 0, void 0, function* () {
        const ph = new index_1.default(4);
        const values = [1, 2, 3];
        const putNext = () => {
            setTimeout(() => {
                const next = values.shift();
                if (next === undefined)
                    return;
                ph.putPrice('a', next);
                putNext();
            }, 100);
        };
        putNext();
        // TODO: Subscribe to price changes, add assertions, and unsubscribe when done.
    });
}
testGetPrice();
testRollingAverage();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testWaitForNextPrice();
}))();
