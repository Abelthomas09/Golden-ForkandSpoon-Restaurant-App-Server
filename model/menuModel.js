import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true }
});

const menuSchema = new mongoose.Schema({
  menuName: { type: String, required: true },
  items: [menuItemSchema]
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
