import Menu from "../model/menuModel.js";

// API for adding a new menu with items
const addMenu = async (req, res) => {
  try {
    const { menuName, items } = req.body;

    if (!menuName || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Menu name and at least one item are required." });
    }

    // Create the new menu with items
    const newMenu = new Menu({ menuName, items });
    await newMenu.save();

    res.status(201).json({
      success: true,
      message: "Menu and items added successfully",
      menu: newMenu,
    });
  } catch (error) {
    console.error("Error adding menu:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// API for getting all menus with their items
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json({
      success: true,
      menus,
    });
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// API for deleting a menu
const deleteMenu = async (req, res) => {
  try {
    const { menuId } = req.params;

    // Delete the menu
    const deletedMenu = await Menu.findByIdAndDelete(menuId);
    if (!deletedMenu) {
      return res.status(404).json({ success: false, message: "Menu not found" });
    }

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// API for adding a new menu item to a specific menu
const addMenuItem = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ success: false, message: "All fields (name, description, price) are required" });
    }

    // Find the menu and add the item
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ success: false, message: "Menu not found" });
    }

    // Create a new menu item
    const newItem = { name, description, price };

    // Add the new item to the menu's items array
    menu.items.push(newItem);
    await menu.save();

    res.status(201).json({
      success: true,
      message: "Item added to menu successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// API for deleting a menu item from a specific menu
const deleteMenuItem = async (req, res) => {
  try {
    const { menuId, itemId } = req.params;

    // Find the menu
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ success: false, message: "Menu not found" });
    }

    // Find the item index and remove it from the items array
    const itemIndex = menu.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    menu.items.splice(itemIndex, 1); 
    await menu.save();

    res.status(200).json({
      success: true,
      message: "Item deleted from menu successfully",
    });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export { addMenu, getMenus, deleteMenu, addMenuItem, deleteMenuItem };
