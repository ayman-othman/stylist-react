import { checkAuth } from "../../utils/utilits";

const ReviewsTab = ({
  reviews,
  showReviewForm,
  onAddReviewClick,
  onCancelReview,
  formik,
  generateStarRating,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-5 pb-16">
      {checkAuth()?.type === "user" && (
        <>
          {!showReviewForm ? (
            <button
              onClick={onAddReviewClick}
              className="px-6 py-3 bg-black text-white rounded-md mb-8 hover:bg-gray-800 transition-colors"
            >
              Add Review
            </button>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
              <h3 className="text-lg font-medium mb-5">Write a Review</h3>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Rating *
                  </label>
                  <select
                    name="rating"
                    onChange={formik.handleChange}
                    value={formik.values.rating}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Star{num !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  {formik.errors.rating && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.rating}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Review *
                  </label>
                  <textarea
                    name="text"
                    rows="4"
                    onChange={formik.handleChange}
                    value={formik.values.text}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                  {formik.errors.text && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.text}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-full"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={onCancelReview}
                    className="px-4 py-2 border border-gray-300 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg text-gray-500 italic">
          No reviews yet
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review.review_ID}
              className="bg-white p-5 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                <div className="text-yellow-400">
                  {generateStarRating(review.rating)}
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(review.review_date).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
