import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log("TOKEN :", token);
      jwt.verify(token, "test", (err, user) => {
        if (err) {
          return res.status(403).send({ error: "HATA", message: err.message });
        }

        console.log("SystemUSER :", user);

        req.user = user;
        next();
      });
    } else {
      res.status(401).message({ message: "Invalid" });
    }
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed Token...",
    });
  }
};

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log("TOKEN :", token);
      jwt.verify(token, "test", (err, user) => {
        if (err) {
          return res.status(403).send({ error: "HATA", message: err.message });
        }

        console.log("USER :", user);

        req.user = user;
        next();
      });
    } else {
      res.status(401).message({ message: "Invalid" });
    }
  } catch (error) {
    return res.status(401).send({
      message: "Auth failed Token...",
    });
  }
};

