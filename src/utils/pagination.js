export default class Pagination {
  doPagination(payload, page, limit){
    page = parseInt(page) || 1;     
    limit = parseInt(limit) || 10;  

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return payload.slice(startIndex, endIndex);
  }
}