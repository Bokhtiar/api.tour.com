"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.paginateQueryParams = void 0;
const nextPage = (page, totalPage) => {
    if (page && page >= totalPage) {
        return null;
    }
    return page + 1;
};
const prevPage = (page) => {
    if (page && page === 1) {
        return null;
    }
    return page - 1;
};
const paginateQueryParams = (data) => {
    var _a, _b;
    let limit = (_a = data === null || data === void 0 ? void 0 : data.limit) !== null && _a !== void 0 ? _a : 10;
    let page = (_b = data === null || data === void 0 ? void 0 : data.page) !== null && _b !== void 0 ? _b : 1;
    console.log("limit", limit);
    console.log("page", page);
    if (data.page)
        page = data.page;
    if (data.page && data.page <= 0)
        page = data === null || data === void 0 ? void 0 : data.page;
    if (data.limit)
        limit = data.limit;
    if (data.limit && data.limit < (data === null || data === void 0 ? void 0 : data.limit))
        limit = data === null || data === void 0 ? void 0 : data.limit;
    return { limit, page };
};
exports.paginateQueryParams = paginateQueryParams;
const paginate = (data) => {
    console.log("paginate", data);
    const page = Number(data.page);
    const limit = Number(data.limit);
    const totalItems = Number(data.total_items);
    const pageTotal = Math.ceil(totalItems / limit);
    return {
        total_items: totalItems,
        limit: limit,
        current_page: page,
        total_page: pageTotal,
        prev_page: prevPage(page),
        next_page: nextPage(page, pageTotal),
    };
};
exports.paginate = paginate;
module.exports = {
    paginateQueryParams: exports.paginateQueryParams,
    paginate: exports.paginate,
};
