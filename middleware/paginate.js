const ErrorResponse = require("../utils/errorResponse");

// This function takes a mongoose model and returns an express middleware
const paginate =
  (model, approved = false, admin = false) =>
  async (req, res, next) => {
    // Getting page and limit from query, otherwise using default values
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 15, 15);

    // Getting start and end indices
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Making the results object along with some metadata
    const results = {};
    results.total = await model.countDocuments().exec();
    results.pages = Math.ceil(results.total / limit);

    // Metadata for next page
    if (endIndex < results.total) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    // Metadata for previous page
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // Adding results to the response and going next
    try {
      // Searching only relevent documents
      const query = model.find();
      if (approved) query.where("isApproved").equals(true);
      if (admin)
        query
          .select("+edits +lastEdit")
          .populate({
            path: "edits",
            populate: {
              path: "user",
            },
          })
          .populate({
            path: "lastEdit",
            populate: {
              path: "user",
            },
          });
      results.results = await query.limit(limit).skip(startIndex).exec();
      res.paginated = results;
      next();
    } catch (e) {
      next(new ErrorResponse("Server Error", 500));
    }
  };

module.exports = paginate;
