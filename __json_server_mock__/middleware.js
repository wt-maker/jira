module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    console.log(req.body);
    if (
      req.body &&
      req.body.username === "jack" &&
      req.body.password === "123456"
    ) {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "登陆失败" });
    }
  }
  next();
};
