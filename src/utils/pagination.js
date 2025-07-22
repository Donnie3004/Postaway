import dotenv from 'dotenv'
dotenv.config();

export default class Pagination {
  doPagination(payload, page, limit){
    page = parseInt(page) || process.env.DEFAULT_PAGE;     
    limit = parseInt(limit) || process.env.DEFAULT_LIMIT;  

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return payload.slice(startIndex, endIndex);
  }
}