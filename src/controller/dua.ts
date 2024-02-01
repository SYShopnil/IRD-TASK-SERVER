import { NextFunction, Request, Response } from "express";
import { getConnection } from "typeorm";

type Body = (req: Request, res: Response, next: NextFunction) => Promise<void>; //body type

//get all available categories with sub and dua title
/**
 * Return data from each Category
 *  cat_name_en
 *  Total Subcategory
 *  All subcategory subcat_name_en
 *  All subcategory subcat_id
 *  All duas of each subCategory dua_name_en
 *  All duas of each subCategory dua_id
 *  cat_icon
 *  cat_id
 *
 */

const showAvailableCategoriesController: Body = async (req, res) => {
  try {
    const { searchInput } = req.body;
    const query = await getConnection().query(`
      SELECT
          CATEGORY.cat_name_en,
          CATEGORY.no_of_subcat,
          CATEGORY.cat_icon,
          CATEGORY.cat_id
      FROM
          CATEGORY
      WHERE 
          CATEGORY.cat_name_en LIKE "%${searchInput}%"
      ORDER BY
          CATEGORY.cat_id ASC
    `);

    //utils
    function addChildren(parents: any[], childName: string) {
      parents.forEach((parent) => {
        parent[childName] = [];
      });
    }
    if (query.length) {
      addChildren(query, "subCategories");

      //insert subCategories Data
      const findAndInsertSubCategoryIntoMainCategory = new Promise(
        async (resolve) => {
          for (const category of query) {
            const cat_id = category.cat_id;

            const findSubCategories = await getConnection().query(
              `
        SELECT
            SUB_CATEGORY.subcat_name_en,
            SUB_CATEGORY.subcat_id
        FROM
            SUB_CATEGORY
        WHERE
            SUB_CATEGORY.cat_id = ${cat_id}
        ORDER BY
            SUB_CATEGORY.subcat_id ASC;
      `
            );

            category.subCategories = findSubCategories;
          }

          resolve(query);
        }
      );
      await findAndInsertSubCategoryIntoMainCategory;

      //insert each subcategories duas as a child
      query.forEach((category: any) => {
        addChildren(category.subCategories, "duas");
      });

      const findAndInsertDuasOfRespectiveSubCategories = new Promise(
        async (resolve) => {
          for (const category of query) {
            for (const subCategory of category.subCategories) {
              const subcat_id = subCategory.subcat_id;

              const findDuas = await getConnection().query(
                `
              SELECT
                  DUA.dua_id,
                  DUA.dua_name_en
              FROM
                  DUA
              WHERE
                  DUA.subcat_id = ${subcat_id}
              ORDER BY
                  DUA.dua_id ASC;

            `
              );
              subCategory.duas = findDuas;
            }
          }

          resolve(query);
        }
      );
      await findAndInsertDuasOfRespectiveSubCategories;
      res.json({
        message: `${query.length} data has found!!`,
        categories: query,
        status: 202,
      });
    } else {
      res.json({
        message: `No data has found`,
        categories: query,
        status: 404,
      });
    }
  } catch (err) {
    res.json({
      message: err,
      categories: [],
      status: 406,
    });
  }
};

//get single categories all duas  (Query by category name)
/**
 *  Data needs =>>> --
 *  dua_name_en
 *  top_en
 *  refference_en
 *  dua_arabic
 *  transliteration_en
 *  translation_en
 *  audio
 *  dua_id
 *  subcat_id
 *  cat_id
 */
const getAllDuasByCategoryNameController: Body = async (req, res) => {
  try {
    const { cat_id } = req.params;
    if (cat_id) {
      const findDuas = await getConnection().query(`
        SELECT
            DUA.dua_name_en,
            DUA.top_en,
            DUA.refference_en,
            DUA.dua_arabic,
            DUA.transliteration_en,
            DUA.translation_en,
            DUA.audio,
            DUA.subcat_id,
            DUA.cat_id,
            DUA.dua_id
        FROM
            DUA
        INNER JOIN
            CATEGORY ON CATEGORY.cat_id = DUA.cat_id
        WHERE
            CATEGORY.cat_id = ${cat_id}
        ORDER BY
            DUA.dua_id ASC;

      `);
      if (findDuas.length) {
        res.json({
          message: `${findDuas.length} dua found!!`,
          duas: findDuas,
          status: 202,
        });
      } else {
        res.json({
          message: "No Dua found",
          duas: [],
          status: 404,
        });
      }
    } else {
      res.json({
        message: "Params Not found",
        duas: [],
        status: 404,
      });
    }
  } catch (err) {
    res.json({
      message: err,
      categories: [],
      status: 406,
    });
  }
};

export {
  showAvailableCategoriesController,
  getAllDuasByCategoryNameController,
};
