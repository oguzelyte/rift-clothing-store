import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.types";

export const fetchCategoriesStart = () =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = (dispatch) => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categories = await getCategoriesAndDocuments();
      dispatch(fetchCategoriesSuccess(categories));
    } catch (error) {
      dispatch(fetchCategoriesFailed(error.message));
    }
  };
};
