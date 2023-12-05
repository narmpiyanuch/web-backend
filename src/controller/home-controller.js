const prisma = require("../utils/prisma");

exports.profile = async (req, res, next) => {
  try {
    const profile = await prisma.member.findUnique({
      where: {
        id: req.user.id,
      },
    });
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { memberName, mobile } = req.body;
    const profile = await prisma.member.update({
      where: {
        id: req.user.id,
      },
      data: {
        memberName: memberName,
        mobile: mobile,
      },
    });
    res.status(201).json({ message: "updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getShop = async (req, res, next) => {
  try {
    const shops = await prisma.banner.findMany({});
    res.status(200).json({ shops });
  } catch (err) {
    next(err);
  }
};

exports.createBanner = async (req, rex, next) => {
  try {
    const { name, detail, price, sale, latitude, longitude } = req.body;
    const shop = await prisma.banner.create({
      data: {
        name,
        detail,
        price,
        sale,
        latitude,
        longitude,
      },
    });
    res.status(201).json({ message: "created successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteShop = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const cancel = await prisma.banner.delete({
      where: {
        id: +shopId,
      },
    });
    res.status(204).json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
