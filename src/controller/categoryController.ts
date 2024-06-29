import Category from "../Models/Category";
import City from "../Models/City";

export class categoryController {
  static async addCategory(req, res, next) {
    const name = req.body.name;
    try {
      let data: any = {
        name,
      };
      if (req.file) data = { ...data, photo: req.file.path };
      const categories = await new Category(data).save();
      res.send(categories);
    } catch (e) {
      next(e);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const categories = await Category.find({}, { __v: 0 });
      res.send(categories);
    } catch (e) {
      next(e);
    }
  }
}
